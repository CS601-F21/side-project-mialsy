package com.mialsy.coc.controllers;

import com.mialsy.coc.message.SimpleMsg;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/message/{gameId}")
    @SendTo("/topic/message/{gameId}")
    public SimpleMsg sendMsg(SimpleMsg message, @DestinationVariable String gameId) throws Exception {
        return message;
    }

}
