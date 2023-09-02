package ge.ananeishvililgorgadze.melodymatch.domain.dto;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageType;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = false)
public class MessageDTO {
    private long id;
    private long senderId;
    private long receiverId;
    private String messageContent;
    private LocalDateTime sentTime;
    private boolean seen;
    private MessageType messageType;
}
