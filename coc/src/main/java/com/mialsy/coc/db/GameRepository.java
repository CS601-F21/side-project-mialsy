package com.mialsy.coc.db;

import com.mialsy.coc.models.Game;
import org.springframework.data.repository.CrudRepository;

/**
 * The interface Game repository - for accessing game
 *
 * @author Chuxi Wang
 */
public interface GameRepository extends CrudRepository<Game, Long> {
    /**
     * Find all game by name.
     *
     * @param name the name
     * @return the iterable games
     */
    Iterable<Game> findAllByName(String name);
}
