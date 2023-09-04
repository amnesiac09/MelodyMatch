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
        UserEntity user1 = userRepository.findByUsername(username1).orElseThrow();
        UserEntity user2 = userRepository.findByUsername(username2).orElseThrow();
        List<MessageEntity> firstMessages = messageRepository.findBySenderIdAndReceiverId(user1.getId(), user2.getId());
        List<MessageEntity> secondMessages = messageRepository.findBySenderIdAndReceiverId(user2.getId(), user1.getId());
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
}