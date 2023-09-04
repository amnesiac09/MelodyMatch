package ge.ananeishvililgorgadze.melodymatch.mapper;

import ge.ananeishvililgorgadze.melodymatch.domain.UserEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
	@Mapping(target = "password", ignore = true)
	UserDTO toDTO(UserEntity entity);

	UserEntity fromDTO(UserDTO dto);

	List<UserDTO> toDTOs(List<UserEntity> entities);
}