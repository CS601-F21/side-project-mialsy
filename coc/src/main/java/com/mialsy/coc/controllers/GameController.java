package com.mialsy.coc.controllers;

import com.mialsy.coc.db.GameRepository;
import com.mialsy.coc.models.Game;
import com.mialsy.coc.utils.ErrorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The Game controller.
 *
 * Rest controller for game CRUD
 *
 * @author Chuxi Wang
 */
@RestController
public class GameController {


    /**
     * The game repository.
     */
    @Autowired
    private GameRepository repository;

    /**
     * Create game.
     *
     * @param game the game request body
     * @return the saved game
     */
    @PostMapping("/game")
    Game createGame(@RequestBody Game game) {
        return repository.save(game);
    }

    /**
     * Gets game by id
     *
     * @param id the game id
     * @return the game infomation
     */
    @GetMapping("/game")
    Game getGame(@RequestParam(name = "id") Long id) {
        return repository.findById(id).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), id));
    }
}
