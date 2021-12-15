package com.mialsy.coc.message;

import lombok.Builder;
import lombok.Data;

/**
 * The Status Message - for keeper to update players status
 *
 * @author Chuxi Wang
 */
@Data
@Builder
public class StatusMsg {
    /**
     * The player Id for player to be updated
     */
    private Long plId;
    /**
     * Hp change
     */
    private Integer hpChange;
    /**
     * Mp change
     */
    private Integer mpChange;
    /**
     * Sanity change
     */
    private Integer sanChange;
    /**
     * Luck change
     */
    private Integer luckChange;
}
