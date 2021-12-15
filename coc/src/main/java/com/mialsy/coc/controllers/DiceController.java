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

@Controller
public class DiceController {
    @Autowired
    PlayerRepository playerRepository;

    @MessageMapping("/dice/{gameId}")
    @SendTo("/topic/message/{gameId}")
    public SimpleMsg rollDice(DiceMsg diceMsg, @DestinationVariable String gameId) {
        return getMessage(diceMsg);
    }

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

