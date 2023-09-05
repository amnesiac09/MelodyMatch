package ge.ananeishvililgorgadze.melodymatch.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserFilter {
	private String nickname;
	private List<MusicalGenre> musicalGenres;
	private List<MusicalInstrument> musicalInstruments;
}
