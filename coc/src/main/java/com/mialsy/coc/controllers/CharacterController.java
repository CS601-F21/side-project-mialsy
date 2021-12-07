package com.mialsy.coc.controllers;

import com.mialsy.coc.models.SocketMsg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CharacterController {

    @MessageMapping("/stats")
    @SendTo("/topic/character")
    public SocketMsg greeting(SocketMsg message) throws Exception {
        Thread.sleep(1000); // simulated delay
        System.out.println("message: " + message);
        return message;
    }

}
