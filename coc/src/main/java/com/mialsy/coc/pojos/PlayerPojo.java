package com.mialsy.coc.pojos;

import lombok.Builder;
import lombok.Data;

/**
 * The Player pojo.
 *
 * @author Chuxi Wang
 */
@Data
@Builder
public class PlayerPojo {
    /**
     * player id
     */
    private Long plId;
    /**
     * if the player is keeper or not
     */
    private Boolean isKeeper;
    /**
     * player name
     */
    private String name;
    /**
     * the associated game id
     */
    private Long gameId;
    /**
     * the character's age
     */
    private Integer age;
    /**
     * the character's sex
     */
    private String sex;
    /**
     * the character's occupation
     */
    private String occupation;
    /**
     * the character's hp
     */
    private Integer hp;
    /**
     * the character's mp
     */
    private Integer mp;
    /**
     * the character's sanity
     */
    private Integer sanity;
    /**
     * the character's luck
     */
    private Integer luck;
    /**
     * the character's description
     */
    private String description;
    /**
     * the character's occupied or not
     */
    private Boolean occupied;
    /**
     * the character's avatar
     */
    private String avatar;
}
