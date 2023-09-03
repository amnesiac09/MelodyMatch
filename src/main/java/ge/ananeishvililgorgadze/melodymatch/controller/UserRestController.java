package ge.ananeishvililgorgadze.melodymatch.controller;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

	@PostMapping(value = "uploadFile", produces = "application/json")
	@Operation(summary = "Upload file", responses = {
			@ApiResponse(responseCode = "200", description = "File uploaded successfully", content = @Content(schema = @Schema(implementation = String.class))),
			@ApiResponse(responseCode = "400", description = "Bad request or file size too large"),
			@ApiResponse(responseCode = "500", description = "Error occurred while uploading file"),
	})
	public ResponseEntity<String> uploadFile(
			@RequestParam("file") MultipartFile file,
			@RequestParam("userId") int userId) {
		userService.uploadFile(file, userId);
		return ResponseEntity.ok("File uploaded successfully");
	}

	@GetMapping(value = "getFileUrl/{filename}")
	@Operation(summary = "Download file", responses = {
			@ApiResponse(responseCode = "200", description = "File URL retrieved successfully"),
			@ApiResponse(responseCode = "404", description = "File not found"),
			@ApiResponse(responseCode = "500", description = "Internal server error"),
	})
	public ResponseEntity<?> downloadFile(@PathVariable String filename) {
		try {
			String fileUrl = userService.getFileUrl(filename);
			if (fileUrl != null && !fileUrl.isEmpty()) {
				return ResponseEntity.ok(fileUrl);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DeleteMapping(value = "deleteFile/{filename}", produces = "application/json")
	@Operation(summary = "Delete file", responses = {
			@ApiResponse(responseCode = "200", description = "File deleted successfully"),
			@ApiResponse(responseCode = "404", description = "File not found or user not found"),
			@ApiResponse(responseCode = "500", description = "Error occurred while deleting file"),
	})
	public ResponseEntity<String> deleteFile(
			@PathVariable String filename,
			@RequestParam("userId") int userId) {
		userService.deleteFile(filename, userId);
		return ResponseEntity.ok("File deleted successfully");
	}
}