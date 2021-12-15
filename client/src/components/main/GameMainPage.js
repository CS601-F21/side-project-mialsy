import { useLocation } from 'react-router-dom';
import { React, useEffect, useState } from "react";
import { message, Card, Divider, Button, Avatar } from "antd";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import Meta from 'antd/lib/card/Meta';

const GameMainPage = (props) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState(``);

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const encodedGameId = pathname.substr("/game/".length);

    const gameId = atob(encodedGameId).substr('cocgame:'.length);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/players?gameId=${gameId}`)
            .then((res) => {
                setPlayers(res.data);
            }).catch((err) => {
                console.log(err);
                message.error("Cannot retrive players at this time, please try again later");
            });
        axios.get(`${process.env.REACT_APP_BASE_URL}/game?id=${gameId}`)
            .then(res => {
                setGameName(res.data.name);
            }).catch((err) => {
                console.log(err);
                message.error("Cannot retrive game name at this time, please try again later");
            });
    }, [])

    const onClick = (event) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/players?gameId=${gameId}`)
            .then((
                (res) => {
                    const player = res.data.find(ele => ele['id'].toString() === event.target.parentElement.id.toString());
                    if (player?.['occupied'] === false) {
                        player['occupied'] = true;
                        axios.post(`${process.env.REACT_APP_BASE_URL}/player?gameId=${gameId}`, player)
                            .then((res) => {
                                console.log(res);
                            });
                        navigate(`/ingame/${encodedGameId}`, { state: { plId: event.target.parentElement.id, isKeeper: false } })

                    } else {
                        message.error("This role has been occupied, try another one please");
                        setPlayers(res.data);
                    }
                }
            ))
    }


    return (
        <div style={{ margin: 50, color: "white" }}>
            <h1>You are joining game {gameName}</h1>
            <div>Choose from below characters</div>
            {players.map((player) => {
                return !player['isKeeper'] && !player["occupied"] &&
                    (<>
                        <Card style={{ width: 300 }}>
                            <Meta
                                title={player["name"]}
                                avatar={<Avatar src={player["avatar"]} />}
                            />
                            <div>
                                <p>{`Sex: ${player["sex"] ? player["sex"] : "NA"}`}</p>
                                <p>{`Occupation: ${player["occupation"] ? player["occupation"] : "NA"}`}</p>
                                <p>{`HP: ${player["hp"]}`}</p>
                                <p>{`MP: ${player["mp"]}`}</p>
                                <p>{`Luck: ${player["luck"]}`}</p>
                                <p>{`Sanity: ${player["sanity"]}`}</p>
                                <p>{`Description: ${player["description"] ? player["description"] : "NA"}`}</p>
                            </div>
                            <Button type="link" onClick={onClick} id={player['id']}>Start Game as this role</Button>
                        </Card>
                        <Divider type="vertical" />
                    </>)
            })}
        </div>);
}

export default GameMainPage;