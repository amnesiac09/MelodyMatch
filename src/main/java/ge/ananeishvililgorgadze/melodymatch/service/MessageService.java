package ge.ananeishvililgorgadze.melodymatch.service;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;

import java.util.List;

public interface MessageService {
    void sendMessage(MessageEntity message);
    List<MessageEntity> getMessages(long id1, long id2);
    void updateMessage(long messageId, String content, boolean delete);
}
