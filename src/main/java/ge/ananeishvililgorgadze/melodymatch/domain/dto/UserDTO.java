package ge.ananeishvililgorgadze.melodymatch.domain.dto;

import ge.ananeishvililgorgadze.melodymatch.domain.Gender;
import ge.ananeishvililgorgadze.melodymatch.domain.MusicalGenre;
import ge.ananeishvililgorgadze.melodymatch.domain.MusicalInstrument;
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

	private Gender gender;

	private String location;

	private String email;

	private String bio;

	private List<Long> likedUsers;

	private List<Long> matchedUsers;

	private List<String> mediaFilenames;

	private List<MusicalInstrument> musicalInstruments;

	private List<MusicalGenre> musicalGenres;

	private int newMatchedUsersCount;
}