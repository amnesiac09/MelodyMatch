package ge.ananeishvililgorgadze.melodymatch.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "MESSAGE")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String senderUsername;
    private String receiverUsername;
    private String messageContent;
    @CreatedDate
    private LocalDateTime sentTime;
    private boolean seen;
    @Enumerated(EnumType.STRING)
    private MessageType messageType;
    @OrderBy("sentTime ASC") // or "DESC" for descending order
    public LocalDateTime getSentTime() {
        return sentTime;
    }
}