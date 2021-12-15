package com.mialsy.coc.models;

/**
 * The enum Dice.
 *
 * @author Chuxi Wang
 */
public enum Dice {
    /**
     * D 4 dice.
     */
    D4(4, "D4"),
    /**
     * D 6 dice.
     */
    D6(6, "D6"),
    /**
     * D 8 dice.
     */
    D8(8, "D8"),
    /**
     * D 10 dice.
     */
    D10(10, "D10"),
    /**
     * D 12 dice.
     */
    D12(12, "D12"),
    /**
     * D 20 dice.
     */
    D20(20, "D20"),
    /**
     * D 100 dice.
     */
    D100(100, "D100");

    /**
     * Dice total points
     */
    private final int totalPts;
    /**
     * Dice type in string
     */
    private final String type;

    /**
     * Dice constructor
     * @param totalPts total points
     * @param type dice string
     */
    Dice(int totalPts, String type) {
        this.totalPts = totalPts;
        this.type = type;
    }

    /**
     * Gets total points.
     *
     * @return the total pts
     */
    public int getTotalPts() {
        return totalPts;
    }

    /**
     * Gets dice type.
     *
     * @return the type
     */
    public String getType() {
        return type;
    }
}
