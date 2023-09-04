package ge.ananeishvililgorgadze.melodymatch.controller;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.MessageDTO;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.UpdateMessageRequest;
import ge.ananeishvililgorgadze.melodymatch.mapper.MessageMapper;
import ge.ananeishvililgorgadze.melodymatch.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/chat/")
@Tag(name = "Chat", description = "Chat API")
public class ChatController {

    private final SimpMessageSendingOperations messageTemplate;

    private final MessageService messageService;

    private final MessageMapper messageMapper;

    public ChatController(SimpMessageSendingOperations messageTemplate, MessageService messageService, MessageMapper messageMapper) {
        this.messageTemplate = messageTemplate;
        this.messageService = messageService;
        this.messageMapper = messageMapper;
    }

    @MessageMapping("sendMessage")
    @Operation(summary = "Send message", responses = {
            @ApiResponse(responseCode = "200",
                    description = "Successfully sent message", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while sending message"),
    })
    public ResponseEntity<String> sendMessage(@Payload MessageDTO chatMessage) {
        messageService.sendMessage(messageMapper.fromDTO(chatMessage));
        messageTemplate.convertAndSend("/topic/public", chatMessage);
        return ResponseEntity.ok("Message sent successfully");
    }

    @GetMapping("getMessages/{username1}&{username2}")
    @Operation(summary = "Get messages", responses = {
            @ApiResponse(responseCode = "200",
                    description = "Successfully retrieved messages", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while getting messages"),
    })
    public List<MessageDTO> getMessages(@PathVariable("username1") String username1, @PathVariable("username2") String username2) {
        return messageMapper.toDTOs(messageService.getMessages(username1, username2));
    }

    @PutMapping("updateMessage")
    @Operation(summary = "Update message", responses = {
            @ApiResponse(responseCode = "200", description = "Message updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "404", description = "Message not found"),
            @ApiResponse(responseCode = "500", description = "Error occurred while updating message"),
    })
    public ResponseEntity<String> updateMessage(@RequestBody UpdateMessageRequest request) {
        try {
            long messageId = request.getMessageId();
            String content = request.getContent();
            boolean delete = request.isDelete();

            messageService.updateMessage(messageId, content, delete);
            return ResponseEntity.ok("Message updated successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while updating message");
        }
    }

    @GetMapping("getLastMessage/{username1}&{username2}")
    @Operation(summary = "Get last message", responses = {
            @ApiResponse(responseCode = "200",
                    description = "Successfully retrieved last message", content = @Content(schema = @Schema(implementation = MessageDTO.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while getting last message"),
    })
    public MessageDTO getLastMessage(@PathVariable("username1") String username1, @PathVariable("username2") String username2) {
        return messageMapper.toDTO(messageService.getLastMessage(username1, username2));
    }
}