package ge.ananeishvililgorgadze.melodymatch.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SYSTEM_USER")
public class UserEntity implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(nullable = false)
	private String location;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(unique = true, nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private int newMatchedUsersCount;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String bio;

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

	@Column(nullable = false)
	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<MusicalGenre> musicalGenres;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}