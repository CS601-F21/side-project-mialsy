package com.mialsy.coc.controllers;

import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.message.StatusMsg;
import com.mialsy.coc.models.Player;
import com.mialsy.coc.pojos.PlayerPojo;
import com.mialsy.coc.utils.ErrorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CharacterController {

    @Autowired
    PlayerRepository playerRepository;

    @MessageMapping("/status/{gameId}")
    @SendTo("/topic/characters/{gameId}")
    public Player changeStatus(StatusMsg message, @DestinationVariable String gameId) {
        // update in db

        Player player = playerRepository.findById(message.getPlId())
                .orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Player.class.getName(), message.getPlId()));
        player.setHp(message.getHpChange());
        player.setMp(message.getMpChange());
        player.setLuck(message.getLuckChange());
        player.setSanity(message.getSanChange());
        return playerRepository.save(player);
    }

}
