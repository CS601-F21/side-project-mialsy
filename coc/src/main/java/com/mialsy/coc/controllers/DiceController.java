package com.mialsy.coc.controllers;

import com.mialsy.coc.message.DiceMsg;
import com.mialsy.coc.message.SimpleMsg;
import com.mialsy.coc.models.Dice;
import com.mialsy.coc.utils.DiceUtils;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DiceController {

    @MessageMapping("/dice/{gameId}")
    @SendTo("/topic/message/{gameId}")
    public SimpleMsg rollDice(DiceMsg diceMsg, @DestinationVariable String gameId) {
        System.out.println(diceMsg);
        return getMessage(diceMsg);
    }

    private SimpleMsg getMessage(DiceMsg diceMsg) {
        SimpleMsg msg = new SimpleMsg();
        msg.setBy(diceMsg.getBy());
        Dice dice = DiceUtils.getMappedDice(diceMsg.getDiceType());
        String text = "Rolled a dice: %s, points rolled: %d".formatted(diceMsg.getDiceType(), DiceUtils.roll(dice));
        msg.setMsgBody(text);
        return msg;
    }


}

