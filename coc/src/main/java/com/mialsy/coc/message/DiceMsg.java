package com.mialsy.coc.message;

import lombok.Data;

@Data
public class DiceMsg {
    private String by;
    private int rolledPts;
    private String diceType;
    private boolean isPrivate;
}
