package com.mialsy.coc.message;

import lombok.Data;

@Data
public class SimpleMsg {
    private Long byId;
    private String by;
    private String avatar;
    private String msgBody;
}
