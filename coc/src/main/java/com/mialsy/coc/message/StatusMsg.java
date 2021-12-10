package com.mialsy.coc.message;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatusMsg {
    private Long plId;
    private Integer hpChange;
    private Integer mpChange;
    private Integer sanChange;
    private Integer luckChange;
}
