package ge.ananeishvililgorgadze.melodymatch.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import ge.ananeishvililgorgadze.melodymatch.repository.UserRepository;
import ge.ananeishvililgorgadze.melodymatch.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder encoder;

	@Value("${s3.bucketName}")
	private String bucketName;

	@Value("${s3.maxFileSizeInMB}")
	private long maxFileSizeInMB;

	@Autowired
	private AmazonS3 s3Client;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder) {
		this.userRepository = userRepository;
		this.encoder = encoder;
	}


	@Override
	public UserEntity getUser(long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
	}

	@Override
	public void deleteUser(long id) {
		Optional<UserEntity> oldUser = userRepository.findById(id);
		if (oldUser.isPresent()) {
			userRepository.deleteById(id);
		} else {
			throw new RuntimeException("User with ID " + id + " not found");
		}
	}

	private UserEntity saveSystemUser(UserEntity systemUser, Optional<String> oldPassword) {
		try {
			if (oldPassword.isPresent()) {
				systemUser.setPassword(oldPassword.get());
			} else {
				String encodedPassword = encoder.encode(systemUser.getPassword());
				systemUser.setPassword(encodedPassword);
			}
			return userRepository.save(systemUser);
		} catch (Exception ex) {
			throw new RuntimeException(ex.getCause());
		}
	}

	@Override
	public UserEntity addUser(UserEntity user) {
		if (user.getId() != 0) {
			throw new RuntimeException("User id is not 0");
		}
		return saveSystemUser(user, Optional.empty());
	}

	@Override
	public UserEntity editUser(UserEntity user) {
		Long id = user.getId();
		Optional<UserEntity> oldUser = userRepository.findById(id);
		if (oldUser.isPresent()) {
			return user.getPassword() == null || user.getPassword().isEmpty() ?
					saveSystemUser(user, Optional.of(oldUser.get().getPassword())) :
					saveSystemUser(user, Optional.empty());
		} else {
			throw new RuntimeException("User with ID " + id + " not found");
		}
	}
	public boolean likeUser(Long firstUserId, Long secondUserId){
		UserEntity firstUser = userRepository.findById(firstUserId).orElseThrow(() -> new RuntimeException("User with ID " + firstUserId + " not found"));
		UserEntity secondUser = userRepository.findById(secondUserId).orElseThrow(() -> new RuntimeException("User with ID " + secondUserId + " not found"));
		List<Long> secondUsersLikedUsers = secondUser.getLikedUsers();
		if (firstUser.getMatchedUsers().contains(secondUserId) || firstUser.getLikedUsers().contains(secondUserId)) {
			return false;
		}
		if (secondUsersLikedUsers.contains(firstUserId)) {
			secondUsersLikedUsers.remove((firstUserId));
			secondUser.setLikedUsers(secondUsersLikedUsers);
			matchUsers(firstUser, secondUser);
			return true;
		} else {
			List<Long> firstUsersLikedUsers = firstUser.getLikedUsers();
			((List<Long>) firstUsersLikedUsers).add(secondUser.getId());
			firstUser.setLikedUsers(firstUsersLikedUsers);
			editUser(firstUser);
		}
		return false;
	}

	@Override
	public void uploadFile(MultipartFile file, int userId) {
		if (file.getSize() > maxFileSizeInMB * 1024 * 1024) {
			log.error("File size is too large");
		} else {
			File fileObj = convertMultiPartFileToFile(file);
			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
			fileObj.delete();
			UserEntity user = getUser(userId);
			List<String> currentMedia = user.getMediaFilenames();
			currentMedia.add(fileName);
			user.setMediaFilenames(currentMedia);
			editUser(user);
		}
	}

	@Override
	public String getFileUrl(String filename) {
		try {
			String encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8);
			return "https://" + bucketName + ".s3.amazonaws.com/" + encodedFilename;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@Override
	public void deleteFile(String filename, int userId) {
		s3Client.deleteObject(bucketName, filename);
		UserEntity user = getUser(userId);
		List<String> currentMedia = user.getMediaFilenames();
		currentMedia.remove(filename);
		user.setMediaFilenames(currentMedia);
		editUser(user);
	}

	private void matchUsers(UserEntity firstUser, UserEntity secondUser){
		List<Long> firstUserMatchedUsers = firstUser.getMatchedUsers();
		firstUserMatchedUsers.add((secondUser.getId()));
		List<Long> secondUserMatchedUsers = secondUser.getMatchedUsers();
		secondUserMatchedUsers.add(firstUser.getId());
		firstUser.setMatchedUsers(firstUserMatchedUsers);
		secondUser.setMatchedUsers(secondUserMatchedUsers);
		editUser(firstUser);
		editUser(secondUser);
	}

	private File convertMultiPartFileToFile(MultipartFile file) {
		File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
		try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
			fos.write(file.getBytes());
		} catch (IOException e) {
			log.error("Error converting multipartFile to file", e);
		}
		return convertedFile;
	}
}