package com.mialsy.coc.controllers;

import com.mialsy.coc.message.DiceMsg;
import com.mialsy.coc.message.SimpleMsg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DiceController {

    @MessageMapping("/dice")
    @SendTo("/topic/dice")
    public SimpleMsg rollDice(DiceMsg diceMsg) {
        return getMessage(diceMsg);
    }

    private SimpleMsg getMessage(DiceMsg diceMsg) {
        SimpleMsg msg = new SimpleMsg();
        msg.setBy(diceMsg.getBy());

        if (diceMsg.isPrivate()) {
             msg.setMsgBody("Rolled a dice in private.");
        } else {
            String text = "Rolled a dice: %s, points rolled: %s".formatted(diceMsg.getDiceType(), diceMsg.getRolledPts());
            msg.setMsgBody(text);
        }
        return msg;
    }

}

