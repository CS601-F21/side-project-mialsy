package com.mialsy.coc.db;

import com.mialsy.coc.models.Game;
import com.mialsy.coc.models.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    Iterable<Player> findAllByGame(Game game);
}
