package com.mialsy.coc.controllers;

import com.mialsy.coc.db.GameRepository;
import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.message.StatusMsg;
import com.mialsy.coc.models.Game;
import com.mialsy.coc.models.Player;
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

    @Autowired
    GameRepository gameRepository;

    @MessageMapping("/status/{gameId}")
    @SendTo("/topic/characters/{gameId}")
    public Iterable<Player> changeStatus(StatusMsg message, @DestinationVariable String gameId) {
        // update in db

        Player player = playerRepository.findById(message.getPlId())
                .orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Player.class.getName(), message.getPlId()));
        System.out.println(message);
        player.setHp(player.getHp() + message.getHpChange());
        player.setMp(player.getMp() + message.getMpChange());
        player.setLuck(player.getLuck() + message.getLuckChange());
        player.setSanity(player.getSanity() + message.getSanChange());
        playerRepository.save(player);

        Game game = gameRepository.findById(Long.parseLong(gameId))
                .orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), Long.parseLong(gameId)));
        return playerRepository.findAllByGame(game);
    }

}
