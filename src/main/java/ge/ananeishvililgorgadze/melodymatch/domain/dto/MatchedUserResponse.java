package ge.ananeishvililgorgadze.melodymatch.domain.dto;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MatchedUserResponse {
    private UserEntity matchedUser;
    private MessageEntity lastMessage;
}