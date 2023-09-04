package ge.ananeishvililgorgadze.melodymatch.service;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;

import java.util.List;

public interface MessageService {
    void sendMessage(MessageEntity message);
    List<MessageEntity> getMessages(String username1, String username2);
    void updateMessage(long messageId, String content, boolean delete);
}