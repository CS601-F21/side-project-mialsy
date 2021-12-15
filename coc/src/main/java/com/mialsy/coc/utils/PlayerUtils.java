package com.mialsy.coc.utils;

import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.models.Player;

public class PlayerUtils {
    public static Player getPlayer(PlayerRepository repository, Long plId) {
        return repository.findById(plId).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Player.class.getName(), plId));
    }
}
