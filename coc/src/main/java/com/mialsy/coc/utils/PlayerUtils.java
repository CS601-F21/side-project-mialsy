package com.mialsy.coc.utils;

import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.models.Player;

/**
 * The Player utils.
 *
 * @author Chuxi Wang
 */
public class PlayerUtils {
    /**
     * Gets player by id
     *
     * @param repository the repository
     * @param plId       the player id
     * @return the player
     */
    public static Player getPlayer(PlayerRepository repository, Long plId) {
        return repository.findById(plId).orElseThrow(() -> ErrorUtils.getObjectNotFoundException(Player.class.getName(), plId));
    }
}
