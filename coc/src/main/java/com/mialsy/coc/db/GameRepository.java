package com.mialsy.coc.db;

import com.mialsy.coc.models.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {
    Iterable<Game> findAllByName(String name);
}
