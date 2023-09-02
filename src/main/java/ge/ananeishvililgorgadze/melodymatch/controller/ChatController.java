package ge.ananeishvililgorgadze.melodymatch.controller;

import ge.ananeishvililgorgadze.melodymatch.domain.MessageEntity;
import ge.ananeishvililgorgadze.melodymatch.domain.dto.MessageDTO;
import ge.ananeishvililgorgadze.melodymatch.mapper.MessageMapper;
import ge.ananeishvililgorgadze.melodymatch.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                    description = "Successfully liked user", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while sending message"),
    })
    @CrossOrigin
    public ResponseEntity<String> sendMessage(@Payload MessageEntity chatMessage) {
        messageService.sendMessage(chatMessage);
        messageTemplate.convertAndSend("/topic/public", chatMessage);
        return ResponseEntity.ok("Message sent successfully");
    }

    @GetMapping("/getMessages/{id1}&{id2}")
    @Operation(summary = "Get messages", responses = {
            @ApiResponse(responseCode = "200",
                    description = "Successfully liked user", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "400", description = "One of the query parameters has a bad value"),
            @ApiResponse(responseCode = "500", description = "Error occurred while getting messages"),
    })
    @CrossOrigin
    public List<MessageDTO> getMessages(@RequestParam("id1") long id1, @RequestParam("id2") long id2) {
        return messageMapper.toDTOs(messageService.getMessages(id1, id2));
    }
}
