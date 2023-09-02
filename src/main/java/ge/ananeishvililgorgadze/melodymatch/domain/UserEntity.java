package ge.ananeishvililgorgadze.melodymatch.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
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

	@Column(nullable = false)
	@ElementCollection
	private List<String> mediaFilenames;

	@Column(nullable = false)
	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<MusicalInstrument> musicalInstruments;
}
