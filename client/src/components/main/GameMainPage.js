import { useLocation } from 'react-router-dom';
import { React, useEffect, useState } from "react";
import { message, Card, Divider, Button } from "antd";
import { useNavigate } from 'react-router-dom';



import axios from "axios";

const GameMainPage = (props) => {
    const [ players, setPlayers ] = useState([])

    const navigate = useNavigate();


    const { pathname } = useLocation();

    const encodedGameId = pathname.substr("/game/".length);

    const gameId = atob(encodedGameId).substr('cocgame:'.length);

    // const gameInfo = axios.get(`${process.env.REACT_APP_BASE_URL}/game?id=${gameId}`)
    // .then((res) => {
    //     setGame(res);
    // }).catch((err) => { 
    //     console.log(err);
    //     message.error("Cannot create keeper at this time, please try again later.");
    // });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/players?gameId=${gameId}`)
        .then((res) => {
            setPlayers(res.data);
        }).catch((err) => { 
            console.log(err);
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
                    navigate("/ingame", {state:{plId:event.target.parentElement.id,isKeeper: false}})
                    
                } else {
                    message("This role has been occupied, try another one please");
                    setPlayers(res.data);
                }
            }
        ))


    }





    return (
    <>
    <h1>You are joining game {gameId}</h1>
    {players.map((player) => {

        return !player['isKeeper'] && !player["occupied"] &&
        (<>
        <Card title={player["name"]} style={{ width: 300 }}>
          <p>{`Sex: ${player["sex"]}`}</p>
          <p>{`Occupation: ${player["occupation"]}`}</p>
          <p>{`HP: ${player["hp"]}`}</p>
          <p>{`MP: ${player["mp"]}`}</p>
          <p>{`Luck: ${player["luck"]}`}</p>
          <p>{`Sanity: ${player["sanity"]}`}</p>
          <p>{`Description: ${player["description"]}`}</p>
          <Button type="link" onClick={onClick} id={player['id']}>Start Game as this role</Button>
        </Card>
        <Divider type="vertical" />
        </>)
})}
    </>);
}

export default GameMainPage;