package com.mialsy.coc.db;

import com.mialsy.coc.models.Game;
import com.mialsy.coc.models.Player;
import org.springframework.data.repository.CrudRepository;

/**
 * The interface Player repository - for accessing player in db
 *
 * @author Chuxi Wang
 */
public interface PlayerRepository extends CrudRepository<Player, Long> {
    /**
     * Find all players by game .
     *
     * @param game the game
     * @return the iterable players
     */
    Iterable<Player> findAllByGame(Game game);
}
