package ge.ananeishvililgorgadze.melodymatch.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SYSTEM_USER")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(unique = true, nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String name;

	@Column(unique = true, nullable = false)
	private String email;

	@Column(nullable = false)
	@ElementCollection
	private List<Long> likedUsers;

	@Column(nullable = false)
	@ElementCollection
	private List<Long> matchedUsers;
}
