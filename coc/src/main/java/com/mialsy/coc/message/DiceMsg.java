package com.mialsy.coc.message;

import lombok.Data;

/**
 * The Dice message for rolling dice.
 *
 * @author Chuxi Wang
 */
@Data
public class DiceMsg {
    /**
     * By Player's Id
     */
    private Long byId;
    /**
     * Dice type matching Dice enum
     */
    private String diceType;
}
