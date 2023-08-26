package ge.ananeishvililgorgadze.melodymatch.service;

import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import org.apache.catalina.User;

public interface UserService {
	UserEntity getUser(long id);

	void deleteUser(long id);

	UserEntity addUser(UserEntity user);

	UserEntity editUser(UserEntity user);
	boolean likeUser(Long firstUserId, Long secondUserId);

}
