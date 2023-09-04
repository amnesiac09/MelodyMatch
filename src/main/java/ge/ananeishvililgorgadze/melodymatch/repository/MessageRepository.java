package ge.ananeishvililgorgadze.melodymatch.repository;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long>, JpaSpecificationExecutor<MessageEntity> {

    List<MessageEntity> findBySenderUsernameAndReceiverUsername(String senderUsername, String receiverUsername);
    MessageEntity findFirstBySenderUsernameAndReceiverUsernameOrderBySentTimeDesc(String senderUsername, String receiverUsername);
}