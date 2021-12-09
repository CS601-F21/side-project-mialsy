package com.mialsy.coc.message;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatusMsg {
    private int plId;
    private int hpChange;
    private int mpChange;
    private int sanChange;
    private int luckChange;
}
