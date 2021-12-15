package com.mialsy.coc.models;

import lombok.Data;

import javax.persistence.*;

/**
 * The Game model.
 *
 * @author Chuxi Wang
 */
@Data
@Entity
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id; /* game id */

    @Column(name = "name", nullable = false)
    private String name; /* game name */

}
