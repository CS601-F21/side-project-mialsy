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

/**
 * The Message controller.
 *
 * Socket controller handling sending and receiving simple chat message
 *
 * @author Chuxi Wang
 */
@Controller
public class MessageController {
    /**
     * The Player repository.
     */
    @Autowired
    PlayerRepository playerRepository;

    /**
     * Send simple message.
     *
     * @param message the message
     * @param gameId  the game id
     * @return the simple message with player information
     */
    @MessageMapping("/message/{gameId}")
    @SendTo("/topic/message/{gameId}")
    public SimpleMsg sendMsg(SimpleMsg message, @DestinationVariable String gameId)  {
        // get by player
        Player byPlayer = PlayerUtils.getPlayer(playerRepository, message.getById());
        message.setBy(byPlayer.getName());
        message.setAvatar(byPlayer.getAvatar());
        return message;
    }

}
