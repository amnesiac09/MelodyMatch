package ge.ananeishvililgorgadze.melodymatch.impl;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.MessageType;
import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import ge.ananeishvililgorgadze.melodymatch.repository.MessageRepository;
import ge.ananeishvililgorgadze.melodymatch.repository.UserRepository;
import ge.ananeishvililgorgadze.melodymatch.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void sendMessage(MessageEntity message) {
        message.setSentTime(LocalDateTime.now());
        messageRepository.save(message);
    }

    @Override
    public List<MessageEntity> getMessages(String username1, String username2) {
        List<MessageEntity> firstMessages = messageRepository.findBySenderUsernameAndReceiverUsername(username1, username2);
        List<MessageEntity> secondMessages = messageRepository.findBySenderUsernameAndReceiverUsername(username2, username1);
        firstMessages.addAll(secondMessages);
        try {
            firstMessages.sort(Comparator.comparing(MessageEntity::getSentTime));
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    @Override
    public MessageEntity getLastMessage(String username1, String username2) {
        MessageEntity message1 = messageRepository.findFirstBySenderUsernameAndReceiverUsernameOrderBySentTimeDesc(username1, username2);
        MessageEntity message2 = messageRepository.findFirstBySenderUsernameAndReceiverUsernameOrderBySentTimeDesc(username2, username1);
        if (message1.getSentTime().isAfter(message2.getSentTime())) {
            return message1;
        } else {
            return message2;
        }
    }
}