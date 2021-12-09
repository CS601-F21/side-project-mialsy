package com.mialsy.coc.utils;

import com.mialsy.coc.models.Dice;

import static com.mialsy.coc.models.Dice.*;

public class DiceUtils {
    public static Dice getMappedDice(String typeStr) {
        if (typeStr.equals(D4.getType())) {
            return D4;
        } else if (typeStr.equals(D6.getType())) {
            return D6;
        } else if (typeStr.equals(D8.getType())) {
            return D8;
        } else if (typeStr.equals(D10.getType())) {
            return D10;
        } else if (typeStr.equals(D12.getType())) {
            return D12;
        } else if (typeStr.equals(D20.getType())) {
            return D20;
        } else if (typeStr.equals(D100.getType())) {
            return D100;
        } else {
            throw new NoSuchFieldError("No Such Dice type");
        }
    }
}
