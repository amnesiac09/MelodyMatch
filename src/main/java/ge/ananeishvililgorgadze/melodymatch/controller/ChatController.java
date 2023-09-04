package ge.ananeishvililgorgadze.melodymatch.controller;

import ge.ananeishvililgorgadze.melodymatch.domain.dto.MessageDTO;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.UpdateMessageRequest;
import ge.ananeishvililgorgadze.melodymatch.mapper.MessageMapper;
import ge.ananeishvililgorgadze.melodymatch.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @SendTo("/topic")
    @Operation(summary = "Send message", responses = {
            @ApiResponse(responseCode = "200",
                    description = "Successfully sent message", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while sending message"),
    })
    public List<MessageDTO> sendMessage(@Payload MessageDTO chatMessage) {
        messageService.sendMessage(messageMapper.fromDTO(chatMessage));
        messageTemplate.convertAndSend("/topic", chatMessage);
        List<MessageDTO> messages = messageMapper.toDTOs(messageService.getMessages(chatMessage.getSenderUsername(), chatMessage.getReceiverUsername()));
        messagingTemplate.convertAndSend("/topic/public", messages);
        return messages;
    }

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @GetMapping("getMessages/{username1}&{username2}")
    @SendTo("/topic")
    @Operation(summary = "Get messages", responses = {
            @ApiResponse(responseCode = "200",
                    description = "Successfully retrieved messages", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while getting messages"),
    })
    public List<MessageDTO> getMessages(@PathVariable("username1") String username1, @PathVariable("username2") String username2) {
        List<MessageDTO> messages = messageMapper.toDTOs(messageService.getMessages(username1, username2));
        messagingTemplate.convertAndSend("/topic/public", messages);
        return messages;
    }

    @PutMapping("updateMessage")
    @SendTo("/topic")
    @Operation(summary = "Update message", responses = {
            @ApiResponse(responseCode = "200", description = "Message updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "404", description = "Message not found"),
            @ApiResponse(responseCode = "500", description = "Error occurred while updating message"),
    })    public  List<MessageDTO> updateMessage(@RequestBody UpdateMessageRequest request) {

        long messageId = request.getMessageId();
        String content = request.getContent();
        boolean delete = request.isDelete();
        messageService.updateMessage(messageId, content, delete);
        List<MessageDTO> messages = messageMapper.toDTOs(messageService.getMessages(request.getSenderNickname(), request.getReceiverNickname()));
        messagingTemplate.convertAndSend("/topic/public", messages);
        return messages;
    }
}
