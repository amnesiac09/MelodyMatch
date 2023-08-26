package ge.ananeishvililgorgadze.melodymatch.controller;

import com.nimbusds.jose.util.Pair;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.UserDTO;
import ge.ananeishvililgorgadze.melodymatch.mapper.UserMapper;
import ge.ananeishvililgorgadze.melodymatch.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "User API")
public class UserRestController {
	private final UserMapper userMapper;

	private final UserService userService;

	public UserRestController(UserMapper userMapper, UserService userService) {
		this.userMapper = userMapper;
		this.userService = userService;
	}

	@GetMapping(value = "get/{id}", produces = "application/json")
	@Parameter(name = "id", schema = @Schema(implementation = Long.class), in = ParameterIn.PATH, description = "Id of user")
	@Operation(summary = "Get user by id", responses = {
			@ApiResponse(responseCode = "200",
					description = "Successfully retrieved user",
					content = @Content(schema = @Schema(implementation = UserDTO.class))),
			@ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
			@ApiResponse(responseCode = "500", description = "Error occurred while retrieving user"),
	})
	public UserDTO getUser(@PathVariable("id") long id) {
		return userMapper.toDTO(userService.getUser(id));
	}

	@PostMapping(value = "add", produces = "application/json")
	@Operation(summary = "Add new user", responses = {
			@ApiResponse(responseCode = "200",
					description = "Successfully added new user",
					content = @Content(schema = @Schema(implementation = UserDTO.class))),
			@ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
			@ApiResponse(responseCode = "500", description = "Error occurred while adding new user"),
	})
	public UserDTO addUser(@RequestBody UserDTO systemUserModel) {
		return userMapper.toDTO(userService.addUser(userMapper.fromDTO(systemUserModel)));
	}

	@PutMapping(value = "update", produces = "application/json")
	@Operation(summary = "Update user", responses = {
			@ApiResponse(responseCode = "200",
					description = "Successfully updated user",
					content = @Content(schema = @Schema(implementation = UserDTO.class))),
			@ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
			@ApiResponse(responseCode = "500", description = "Error occurred while updating user"),
	})
	public UserDTO updateUser(@RequestBody UserDTO systemUserModel) {
		return userMapper.toDTO(userService.editUser(userMapper.fromDTO(systemUserModel)));
	}
	@PutMapping(value = "likeUser", produces = "application/json")
	@Operation(summary = "Like user", responses = {
			@ApiResponse(responseCode = "200",
					description = "Successfully liked user", content = @Content(schema = @Schema(implementation = String.class))),
			@ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
			@ApiResponse(responseCode = "500", description = "Error occurred while updating user"),
	})
	public ResponseEntity<String> likeUser(@RequestParam Long firstId, @RequestParam Long secondId) {
		if(userService.likeUser(firstId, secondId)) {
			return ResponseEntity.ok("You are now friends")	;
		}else{
			return ResponseEntity.ok("System user liked successfully");
		}
	}

	@DeleteMapping(value = "delete/{id}", produces = "application/json")
	@Parameter(name = "id", schema = @Schema(implementation = Long.class), in = ParameterIn.PATH, description = "System user to delete")
	@Operation(summary = "Deletes user", responses = {
			@ApiResponse(responseCode = "200", description = "Successfully deleted user", content = @Content(schema = @Schema(implementation = String.class))),
			@ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
			@ApiResponse(responseCode = "500", description = "Error occurred while deleting user"),
	})
	public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
		userService.deleteUser(id);
		return ResponseEntity.ok("System user deleted successfully");
	}
}
