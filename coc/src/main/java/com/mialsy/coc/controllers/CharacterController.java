package com.mialsy.coc.controllers;

import com.mialsy.coc.message.StatusMsg;
import com.mialsy.coc.models.Player;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CharacterController {

    @MessageMapping("/status")
    @SendTo("/topic/characters")
    public Iterable<Player> changeStatus(StatusMsg message) throws Exception {
        // update in db
        return null;
    }

}
