package com.mialsy.coc.models;

import com.mialsy.coc.pojos.PlayerPojo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Long id;

    @Column(name = "is_keeper", nullable = false)
    private Boolean isKeeper;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "age")
    private Integer age;

    @Column(name = "sex")
    private String sex;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "hit_points")
    private Integer hp;

    @Column(name = "magic")
    private Integer mp;

    @Column(name = "sanity")
    private Integer sanity;

    @Column(name = "luck")
    private Integer luck;

    @Column(name = "description")
    private String description;

    @Column(name = "occupied")
    private Boolean occupied;

    @Column(name = "avatar")
    private String avatar;

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
