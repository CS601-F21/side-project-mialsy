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

@RestController
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/player")
    PlayerPojo getPlayerById(@RequestParam(name = "plId")Long plId) {
        Player player = playerRepository.findById(plId).orElse(null);
        return player == null ? null : player.toPojo();
    }

    @PostMapping("/player")
    PlayerPojo createPlayer(@RequestParam(name = "gameId") Long gameId, @RequestBody Player player) {
        return upsertPlayer(gameId, player);
    }

    @PostMapping("/players")
    Iterable<PlayerPojo> createPlayers(@RequestParam(name = "gameId") Long gameId, @RequestBody Iterable<Player> players) {
        List<PlayerPojo> plPojos = new ArrayList<>();
        for (Player player : players) {
            plPojos.add(upsertPlayer(gameId, player));
        }
        return plPojos;
    }

    @GetMapping("/players")
    Iterable<Player> getAllPlayerByGame(@RequestParam(name = "gameId") Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), gameId));
        return playerRepository.findAllByGame(game);
    }

    private PlayerPojo upsertPlayer(Long gameId, Player player) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), gameId));
        player.setGame(game);
        playerRepository.save(player);
        return player.toPojo();
    }
}
