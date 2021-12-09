package com.mialsy.coc.controllers;

import com.mialsy.coc.db.GameRepository;
import com.mialsy.coc.models.Game;
import com.mialsy.coc.utils.ErrorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class GameController {

    @Autowired
    private GameRepository repository;

    @PostMapping("/game")
    Game createGame(@RequestBody Game game) {
        return repository.save(game);
    }

    @GetMapping("/game")
    Game getGame(@RequestParam(name = "id") Long id) {
        return repository.findById(id).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Game.class.getName(), id));
    }
}
