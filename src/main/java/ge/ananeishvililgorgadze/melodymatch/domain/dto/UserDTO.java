package ge.ananeishvililgorgadze.melodymatch.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserDTO {
	private long id;

	private String username;

	private String password;

	private String name;

	private String email;

	private List<Long> likedUsers;

	private List<Long> matchedUsers;
}
