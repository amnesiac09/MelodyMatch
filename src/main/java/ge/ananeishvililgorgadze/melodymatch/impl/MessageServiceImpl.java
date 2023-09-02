package ge.ananeishvililgorgadze.melodymatch.impl;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.MessageType;
import ge.ananeishvililgorgadze.melodymatch.repository.MessageRepository;
import ge.ananeishvililgorgadze.melodymatch.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public void sendMessage(MessageEntity message) {
        messageRepository.save(message);
    }

    @Override
    public List<MessageEntity> getMessages(long id1, long id2) {
        List<MessageEntity> firstMessages = messageRepository.findBySenderIdAndReceiverId(id1, id2);
        List<MessageEntity> secondMessages = messageRepository.findBySenderIdAndReceiverId(id2, id1);
        firstMessages.addAll(secondMessages);
        firstMessages.sort(Comparator.comparing(MessageEntity::getSentTime));
        return firstMessages;
    }

    @Override
    public void updateMessage(long messageId, String content, boolean delete) {
        MessageEntity message = messageRepository.findById(messageId).orElseThrow();
        if (delete) {
            message.setMessageContent("This message has been deleted.");
            message.setMessageType(MessageType.DELETED);
        } else {
            message.setMessageContent(content);
            message.setMessageType(MessageType.EDITED);
        }
        messageRepository.save(message);
    }
}
