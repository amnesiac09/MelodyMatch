package ge.ananeishvililgorgadze.melodymatch.mapper;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.MessageDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    MessageDTO toDTO(MessageEntity entity);

    MessageEntity fromDTO(MessageDTO dto);

    List<MessageDTO> toDTOs(List<MessageEntity> entities);
}
