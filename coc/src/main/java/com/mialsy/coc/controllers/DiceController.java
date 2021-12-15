package com.mialsy.coc.controllers;

import com.mialsy.coc.db.PlayerRepository;
import com.mialsy.coc.message.DiceMsg;
import com.mialsy.coc.message.SimpleMsg;
import com.mialsy.coc.models.Dice;
import com.mialsy.coc.models.Player;
import com.mialsy.coc.utils.DiceUtils;
import com.mialsy.coc.utils.PlayerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * The Dice controller.
 *
 * Socket Controller - generate dice roll message.
 *
 * @author Chuxi Wang
 */
@Controller
public class DiceController {
    /**
     * The Player repository.
     */
    @Autowired
    PlayerRepository playerRepository;

    /**
     * Roll a dice, send message to info dice rolled type, and rolled points.
     *
     * @param diceMsg the dice message
     * @param gameId  the game id
     * @return the simple message including dice rolled points and total points
     */
    @MessageMapping("/dice/{gameId}")
    @SendTo("/topic/message/{gameId}")
    public SimpleMsg rollDice(DiceMsg diceMsg, @DestinationVariable String gameId) {
        return getMessage(diceMsg);
    }

    /**
     * Generate messages to return to client
     *
     * @param diceMsg input dice message
     * @return the simple message including dice rolled points and total points
     */
    private SimpleMsg getMessage(DiceMsg diceMsg) {
        SimpleMsg msg = new SimpleMsg();
        Player byPlayer = PlayerUtils.getPlayer(playerRepository, diceMsg.getById());
        msg.setBy(byPlayer.getName());
        msg.setAvatar(byPlayer.getAvatar());
        Dice dice = DiceUtils.getMappedDice(diceMsg.getDiceType());
        String text = "Rolled a dice: %s, points rolled: %d".formatted(diceMsg.getDiceType(), DiceUtils.roll(dice));
        msg.setMsgBody(text);
        return msg;
    }


}

