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

/**
 * The Character controller.
 *
 * Socket controller - used to update character status.
 *
 * @author Chuxi Wang
 */
@Controller
public class CharacterController {

    /**
     * The Player repository.
     */
    @Autowired
    PlayerRepository playerRepository;

    /**
     * The Game repository.
     */
    @Autowired
    GameRepository gameRepository;

    /**
     * Change status, return the updated player iterable.
     *
     * @param message the status message
     * @param gameId  the game id
     * @return the player iterable
     */
    @MessageMapping("/status/{gameId}")
    @SendTo("/topic/characters/{gameId}")
    public Iterable<Player> changeStatus(StatusMsg message, @DestinationVariable String gameId) {
        // update in db
        Player player = playerRepository.findById(message.getPlId())
                .orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Player.class.getName(), message.getPlId()));
        player.setHp(player.getHp() + message.getHpChange());
        player.setMp(player.getMp() + message.getMpChange());
        player.setLuck(player.getLuck() + message.getLuckChange());
        player.setSanity(player.getSanity() + message.getSanChange());
        playerRepository.save(player);

        // return updated player list
        Game game = gameRepository.findById(Long.parseLong(gameId))
                .orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), Long.parseLong(gameId)));
        return playerRepository.findAllByGame(game);
    }

}
