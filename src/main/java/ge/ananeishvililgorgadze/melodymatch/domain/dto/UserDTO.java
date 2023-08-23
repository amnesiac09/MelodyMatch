package ge.ananeishvililgorgadze.melodymatch.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserDTO {
	private long id;

	private String username;

	private String password;

	private String name;

	private String email;
}
