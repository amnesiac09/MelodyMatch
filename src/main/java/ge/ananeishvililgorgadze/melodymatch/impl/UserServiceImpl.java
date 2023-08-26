package ge.ananeishvililgorgadze.melodymatch.impl;

import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import ge.ananeishvililgorgadze.melodymatch.repository.UserRepository;
import ge.ananeishvililgorgadze.melodymatch.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder encoder;

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
		if(firstUser.getMatchedUsers().contains(secondUserId) || firstUser.getLikedUsers().contains(secondUserId)){
			return false;
		}
		if(secondUsersLikedUsers.contains(firstUserId)){
			secondUsersLikedUsers.remove((firstUserId));
			secondUser.setLikedUsers(secondUsersLikedUsers);
			matchUsers(firstUser, secondUser);
			return true;
		}else{
			List<Long> firstUsersLikedUsers = firstUser.getLikedUsers();
			((List<Long>) firstUsersLikedUsers).add(secondUser.getId());
			firstUser.setLikedUsers(firstUsersLikedUsers);
			editUser(firstUser);
		}
		return false;
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
}
