package com.mialsy.coc.pojos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlayerPojo {
    private Long plId;
    private Boolean isKeeper;
    private String name;
    private Long gameId;
    private Integer age;
    private String sex;
    private String occupation;
    private Integer hp;
    private Integer mp;
    private Integer sanity;
    private Integer luck;
    private String description;
    private Boolean occupied;
}
