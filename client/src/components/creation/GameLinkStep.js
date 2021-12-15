import { Button } from "antd";
import React from "react";
import { useNavigate } from 'react-router-dom';

const GameLinkStep = () => {

    const gameId = sessionStorage.getItem("gameId");

    const encodedGameId = btoa(`cocgame:${gameId}`);

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`../ingame/${encodedGameId}`, 
        {state: { plName: sessionStorage.getItem("kpName"),plId: sessionStorage.getItem("kpId"), isKeeper: true}})
    }

    return (
        <div>
            <h2>You can share the game with the link: {`localhost:3000/game/${encodedGameId}`} </h2>
            <Button type="primary" onClick={onClick}>Join Game</Button>
        </div>
    );
}

export default GameLinkStep;