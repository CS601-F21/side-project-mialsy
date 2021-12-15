package com.mialsy.coc.controllers;

import com.mialsy.coc.db.GameRepository;
import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.models.Game;
import com.mialsy.coc.models.Player;
import com.mialsy.coc.pojos.PlayerPojo;
import com.mialsy.coc.utils.ErrorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The Player controller.
 *
 * Rest controller for player CRUD
 *
 * @author Chuxi Wang
 */
@RestController
public class PlayerController {

    /**
     * Player repository
     */
    @Autowired
    private PlayerRepository playerRepository;

    /**
     * Game repository
     */
    @Autowired
    private GameRepository gameRepository;

    /**
     * Gets player by id.
     *
     * @param plId the player id
     * @return the player matching id
     */
    @GetMapping("/player")
    PlayerPojo getPlayerById(@RequestParam(name = "plId")Long plId) {
        Player player = playerRepository.findById(plId).orElse(null);
        return player == null ? null : player.toPojo();
    }

    /**
     * Create player.
     *
     * @param gameId the game id
     * @param player the player info
     * @return the saved player pojo
     */
    @PostMapping("/player")
    PlayerPojo createPlayer(@RequestParam(name = "gameId") Long gameId, @RequestBody Player player) {
        return upsertPlayer(gameId, player);
    }

    /**
     * Create players.
     *
     * @param gameId  the game id
     * @param players the players
     * @return the saved iterable players
     */
    @PostMapping("/players")
    Iterable<PlayerPojo> createPlayers(@RequestParam(name = "gameId") Long gameId, @RequestBody Iterable<Player> players) {
        List<PlayerPojo> plPojos = new ArrayList<>();
        for (Player player : players) {
            plPojos.add(upsertPlayer(gameId, player));
        }
        return plPojos;
    }

    /**
     * Gets all player by game.
     *
     * @param gameId the game id
     * @return all player by game
     */
    @GetMapping("/players")
    Iterable<Player> getAllPlayerByGame(@RequestParam(name = "gameId") Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), gameId));
        return playerRepository.findAllByGame(game);
    }

    /**
     * Helper method for upsert players
     *
     * @param gameId game id
     * @param player player
     * @return saved player pojo
     */
    private PlayerPojo upsertPlayer(Long gameId, Player player) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), gameId));
        player.setGame(game);
        playerRepository.save(player);
        return player.toPojo();
    }
}
