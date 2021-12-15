package com.mialsy.coc.message;

import lombok.Data;

/**
 * The Simple Chat Message.
 *
 * @author Chuxi Wang
 */
@Data
public class SimpleMsg {
    /**
     * By player's id
     */
    private Long byId;
    /**
     * By player's name
     */
    private String by;
    /**
     * By player's avatar
     */
    private String avatar;
    /**
     * Message body
     */
    private String msgBody;
}
