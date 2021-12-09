package com.mialsy.coc.models;

public enum Dice {
    D4(4, "D4"),
    D6(6, "D6"),
    D8(8, "D8"),
    D10(10, "D10"),
    D12(12, "D12"),
    D20(20, "D20"),
    D100(100, "D100");

    private final int totalPts;
    private final String type;

    Dice(int totalPts, String type) {
        this.totalPts = totalPts;
        this.type = type;
    }

    public int getTotalPts() {
        return totalPts;
    }

    public String getType() {
        return type;
    }
}
