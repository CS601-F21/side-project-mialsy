package com.mialsy.coc.controllers;

import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.message.SimpleMsg;
import com.mialsy.coc.models.Player;
import com.mialsy.coc.utils.PlayerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @Autowired
    PlayerRepository playerRepository;

    @MessageMapping("/message/{gameId}")
    @SendTo("/topic/message/{gameId}")
    public SimpleMsg sendMsg(SimpleMsg message, @DestinationVariable String gameId) throws Exception {
        Player byPlayer = PlayerUtils.getPlayer(playerRepository, message.getById());
        message.setBy(byPlayer.getName());
        message.setAvatar(byPlayer.getAvatar());
        return message;
    }

}
