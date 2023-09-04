package ge.ananeishvililgorgadze.melodymatch.service;

import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
	UserEntity getUser(long id);

	void deleteUser(long id);

	UserEntity addUser(UserEntity user);

	UserEntity editUser(UserEntity user);
	boolean likeUser(Long firstUserId, Long secondUserId);

	void uploadFile(MultipartFile file, int userId);

	String getFileUrl(String filename);

	void deleteFile(String filename, int userId);

	List<UserEntity> getMatchedUsers(String username);

}