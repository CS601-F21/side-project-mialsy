package com.mialsy.coc.models;

import com.mialsy.coc.pojos.PlayerPojo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * The Player model
 *
 * @author Chuxi Wang
 */
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "player")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id; /* the player id */

    @Column(name = "is_keeper", nullable = false)
    private Boolean isKeeper; /* the player is keeper or not */

    @Column(name = "name", nullable = false)
    private String name; /* player name */

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game; /* the associated game */

    @Column(name = "age")
    private Integer age; /* the character's age */

    @Column(name = "sex")
    private String sex; /* the character's sex */

    @Column(name = "occupation")
    private String occupation; /* the character's occupation */

    @Column(name = "hit_points")
    private Integer hp; /* the character's hp */

    @Column(name = "magic")
    private Integer mp; /* the character's mp */

    @Column(name = "sanity")
    private Integer sanity; /* the character's sanity */

    @Column(name = "luck")
    private Integer luck; /* the character's luck */

    @Column(name = "description")
    private String description; /* the character's description */

    @Column(name = "occupied")
    private Boolean occupied; /* the character has been occupied or not */

    @Column(name = "avatar")
    private String avatar; /* the character's avatar */

    /**
     * To player pojo.
     *
     * @return the player pojo
     */
    public PlayerPojo toPojo() {
        return PlayerPojo.builder()
                .plId(this.id)
                .name(this.name)
                .isKeeper(this.isKeeper)
                .gameId(this.game.getId())
                .age(this.age)
                .sex(this.sex)
                .hp(this.hp)
                .mp(this.mp)
                .sanity(this.sanity)
                .luck(this.luck)
                .description(this.description)
                .occupation(this.occupation)
                .occupied(this.occupied)
                .avatar(this.avatar)
                .build();
    }
}
