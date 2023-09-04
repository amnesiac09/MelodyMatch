package ge.ananeishvililgorgadze.melodymatch.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMessageRequest {
    private long messageId;
    private String content;
    private boolean delete;
    private String senderNickname;
    private String receiverNickname;
}