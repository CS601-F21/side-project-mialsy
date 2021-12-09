package com.mialsy.coc.db;

import com.mialsy.coc.models.Game;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GameRepository extends CrudRepository<Game, Long> {
    List<Game> findAllByName();
}
