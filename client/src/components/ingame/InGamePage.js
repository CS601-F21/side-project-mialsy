import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {Button, message, Row, Col, Card, Divider, Modal, Input } from 'antd';
import axios from "axios";
import { MoreOutlined } from '@ant-design/icons';
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';
import rollADie from 'roll-a-die';
import droll from 'droll';

const InGamePage = (props) => {
    const { state } = useLocation();
    const { plId, isKeeper } = state || {};
    const [ combinedMessages, setMessages ] = useState([]);
    const [ players, setPlayers ] = useState([]);
    const [ isDiceModalVisible, setDiceModalVisible ] = useState(false);
    const [ diceInput, setDiceInput ] = useState('');

    const [ playerUpdateModalVisible, setPlayerUpdateModalVisible ] = useState(false);

    const [ selectedPlayer, setSelectedPlayer ] = useState({});


    const [ hp, setHp ] = useState('');
    const [ sanity, setSanity ] = useState('');
    const [ mp, setMp ] = useState('');
    const [ luck, setLuck ] = useState('');

    
    const [stompClient, setClient] = useState(undefined);
    const disconnect = () => {
        if (stompClient) {
          stompClient.disconnect();
        }
        setClient(undefined);
        console.log("disconnected");
    }

    const connect = () => {
        const socket = new SockJS("http://localhost:8080/coc-websocket");
        const sc = Stomp.over(socket);
        setClient(sc);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/players?gameId=${23}`)
        .then((res) => {
            setPlayers(res.data);
        }).catch((err) => { 
            console.log(err);
        });
    }, [])

    useEffect(() => {
        const header = {
          "name": "mialsy" 
        }
        if (stompClient) {
          stompClient.connect(header, function (frame) {   
            stompClient.subscribe('/topic/characters/29', function (greeting) {
              const updatedPlayer = JSON.parse(greeting.body);
              const index = players.findIndex((player) => player['id'].toString() === updatedPlayer['id'].toString());
              setPlayers(players.slice(0, index).concat([updatedPlayer], players.slice(index + 1)));
            });

            stompClient.subscribe('/topic/message/29', function (greeting) {
              combinedMessages.push({
              "text": JSON.parse(greeting.body).msgBody,
              "id": combinedMessages.length === 0 ? "1" : (combinedMessages?.[combinedMessages.length - 1]['id'] + 1).toString(),
              "sender": {
                "name": "Ironman",
                "uid": "user1",
                "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
              },
            });
            setMessages([...combinedMessages])
          });
          });
    
    
        }
      }, [stompClient]);



      

    const toggleConnection = () => {
        if (stompClient) {
          disconnect();
        } else {
          connect();
        } 
    }

    const rollDice = () => {
      setDiceModalVisible(true);

    }

    const handleDiceRolling = () => {
      setDiceModalVisible(false);
      const total = droll.roll(diceInput).total;
      rollADie({element: document.getElementById('dice-roll'), numberOfDice:1, callback:() => {}});
      setDiceInput('');
    }

    const onUpdatePlayer = (plId) => {
      setPlayerUpdateModalVisible(false);
      const oldPlayer = players.find((player) => player['id'] === plId);
      stompClient.send("/app/status/29", {"name": "mialsy"}, JSON.stringify(
        {'plId' : plId, 'hpChange': hp === ''? oldPlayer['hp']: parseInt(hp), 'mpChange': mp === ''? oldPlayer['mp']: parseInt(mp), 'sanChange': sanity === ''? oldPlayer['sanity']: parseInt(sanity), 'luckChange': luck === ''? oldPlayer['luck']: parseInt(luck)}));     
      setMp('');
      setHp('');
      setSanity('');
      setLuck('');
      setSelectedPlayer({});
    }

    const openPlayerModal = (plId) => {
      setPlayerUpdateModalVisible(true);
      const selectedPlayer = players.find((player) => player['id'].toString() === plId.toString());
      setSelectedPlayer(selectedPlayer);
    }

    const handleDiceCancel = () => {
      setDiceModalVisible(false);
      setDiceInput('');
    }

    const onUpdatePlayerModalCancel = () => {
      setPlayerUpdateModalVisible(false);
      setSelectedPlayer({});
      setHp('');
      setSanity('');
      setLuck('');
      setMp('');
    }

    const onSubmit= (msg) => {        
      stompClient.send("/app/message/29", {"name": "mialsy"}, JSON.stringify({'msgBody' : msg, 'by': '122'}));         
    }

    return (
    <> 
      <Modal title="Player Update" visible={playerUpdateModalVisible} onOk={() => onUpdatePlayer(selectedPlayer["id"])} onCancel={onUpdatePlayerModalCancel} okText="update">
      <Card title={selectedPlayer?.["name"]} style={{ margin: 10 }}>
          <p>{`Sex: ${selectedPlayer?.["sex"]}`}</p>
          <p>{`Occupation: ${selectedPlayer?.["occupation"]}`}</p>
          <p>{`HP: ${selectedPlayer?.["hp"]}`}</p>
          <Input placeholder="Input a number" maxLength={5} onChange={event=>{setHp(event.target.value)}} value={hp}/>
          <p>{`MP: ${selectedPlayer?.["mp"]}`}</p>
          <Input placeholder="Input a number" maxLength={5} onChange={event=>{setMp(event.target.value)}} value={mp}/>
          <p>{`Luck: ${selectedPlayer?.["luck"]}`}</p>
          <Input placeholder="Input a number" maxLength={5} onChange={event=>{setLuck(event.target.value)}} value={luck}/>
          <p>{`Sanity: ${selectedPlayer?.["sanity"]}`}</p>
          <Input placeholder="Input a number" maxLength={5} onChange={event=>{setSanity(event.target.value)}} value={sanity}/>
      </Card>
      </Modal>
      <Modal title="Dice Modal" visible={isDiceModalVisible} onOk={handleDiceRolling} onCancel={handleDiceCancel}>
        <Input placeholder="Dice input here..." value={diceInput} onChange={(event) => {setDiceInput(event.target.value)}}/>
      </Modal>
        <Button type="primary" onClick={() => toggleConnection()}>{stompClient ? "Disconnect" : "Connect"}</Button>
        <Button type="primary" onClick={() => rollDice()}>Roll the Dice</Button>
        <>
        <Row type="flex">
      <Col span={6}>        
      {players.map((player) => {

return !player['isKeeper'] &&
(<>
<Card title={player["name"]} style={{ margin: 10 }} id={player['id']}>
  <p>{`Sex: ${player["sex"]}`}</p>
  <p>{`Occupation: ${player["occupation"]}`}</p>
  <p>{`HP: ${player["hp"]}`}</p>
  <p>{`MP: ${player["mp"]}`}</p>
  <p>{`Luck: ${player["luck"]}`}</p>
  <p>{`Sanity: ${player["sanity"]}`}</p>
  <p>{`Description: ${player["description"]}`} <Button type="text" ghost onClick={() => openPlayerModal(player['id'])} icon={<MoreOutlined  />}></Button></p>
</Card>
<Divider type="vertical" />
</>)
})}</Col>
      <Col span={18}>
        <ChatBox messages={combinedMessages} onSubmit={onSubmit} />
        <div id='dice-roll' z-index={289} width="100%" height="100%"></div>
        </Col>
    </Row>
    
        </>
    </>);
}

export default InGamePage;