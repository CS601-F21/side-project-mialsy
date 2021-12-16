import { Button, Typography } from "antd";
import React from "react";
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

/**
 * Display a link that can be copied and shared to other people
 * 
 * @returns step content 
 */
const GameLinkStep = () => {

    const gameId = sessionStorage.getItem("gameId");

    const encodedGameId = btoa(`cocgame:${gameId}`);

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`../ingame/${encodedGameId}`,
            { state: { plName: sessionStorage.getItem("kpName"), plId: sessionStorage.getItem("kpId"), isKeeper: true } })
    }

    const sharedUrl = `localhost:3000/game/${encodedGameId}`;

    return (
        <div style={{color: "white"}}>
            <div>You can share the game with the link: <Paragraph copyable={{ text: sharedUrl }}>{sharedUrl}</Paragraph></div>
            <Button type="primary" onClick={onClick}>Join Game</Button>
        </div>
    );
}

export default GameLinkStep;