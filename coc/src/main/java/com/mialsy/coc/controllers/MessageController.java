package com.mialsy.coc.controllers;

import com.mialsy.coc.message.SimpleMsg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/message")
    public SimpleMsg sendMsg(SimpleMsg message) throws Exception {
        Thread.sleep(1000); // simulated delay
        System.out.println("message: " + message);
        return message;
    }

}