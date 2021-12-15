import React, {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {Button, Row, Col, Card, Divider, Modal, InputNumber, Avatar } from 'antd';
import axios from "axios";
import { MoreOutlined } from '@ant-design/icons';
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';
import DiceButtons from './DiceButtons';
import Meta from 'antd/lib/card/Meta';
import gameoverImg from '../../static/gameover.png';

const InGamePage = (props) => {
    const { state } = useLocation();
    const { plName, plId, isKeeper } = state || {};

    let encodedGameId = useParams().id;
    const gameId = atob(encodedGameId).substr('cocgame:'.length);

    const [ combinedMessages, setMessages ] = useState([]);
    const [ players, setPlayers ] = useState([]);
    const [ playerUpdateModalVisible, setPlayerUpdateModalVisible ] = useState(false);

    const [ selectedPlayer, setSelectedPlayer ] = useState({});

    const [ hp, setHp ] = useState(0);
    const [ sanity, setSanity ] = useState(0);
    const [ mp, setMp ] = useState(0);
    const [ luck, setLuck ] = useState(0);

    
    const [stompClient, setClient] = useState(undefined);

    const connect = () => {
        const socket = new SockJS("http://localhost:8080/coc-websocket");
        const sc = Stomp.over(socket);
        setClient(sc);
    }

    useEffect(() => {
        connect();
        axios.get(`${process.env.REACT_APP_BASE_URL}/players?gameId=${gameId}`)
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
            stompClient.subscribe(`/topic/characters/${gameId}`, function (greeting) {
              const updatedPlayer = JSON.parse(greeting.body);
              const index = players.findIndex((player) => player['id'].toString() === updatedPlayer['id'].toString());
              console.log(players);
              setPlayers(players.slice(0, index).concat([updatedPlayer], players.slice(index + 1)));
            });

            stompClient.subscribe(`/topic/message/${gameId}`, function (greeting) {
              combinedMessages.push({
              "text": JSON.parse(greeting.body).msgBody,
              "id": combinedMessages.length === 0 ? "1" : (combinedMessages?.[combinedMessages.length - 1]['id'] + 1).toString(),
              "sender": {
                "name": JSON.parse(greeting.body).by,
                "avatar": JSON.parse(greeting.body).avatar,
              },
            });
            setMessages([...combinedMessages])
          });
          });
    
    
        }
      }, [stompClient]);


    const onUpdatePlayer = (plId) => {
      setPlayerUpdateModalVisible(false);
      stompClient.send(`/app/status/${gameId}`, {}, JSON.stringify(
        {'plId' : plId, 'hpChange': hp, 'mpChange': mp, 'sanChange': sanity, 'luckChange': luck}));     
      setMp(0);
      setHp(0);
      setSanity(0);
      setLuck(0);
      setSelectedPlayer({});
    }

    const openPlayerModal = (plId) => {
      setPlayerUpdateModalVisible(true);
      const selectedPlayer = players.find((player) => player['id'].toString() === plId.toString());
      setSelectedPlayer(selectedPlayer);
    }

    const onUpdatePlayerModalCancel = () => {
      setPlayerUpdateModalVisible(false);
      setSelectedPlayer({});
      setHp(0);
      setSanity(0);
      setLuck(0);
      setMp(0);
    }

    const onSubmit= (msg) => {        
      stompClient.send(`/app/message/${gameId}`, {}, JSON.stringify({'msgBody' : msg, 'byId': plId}));         
    }

    const checkGameOver = (player) => player["hp"] === 0;

    return (
    <> 
      <Modal destroyOnClose title="Player Update" visible={playerUpdateModalVisible} onOk={() => onUpdatePlayer(selectedPlayer["id"])} onCancel={onUpdatePlayerModalCancel} okText="update">
      <Card title={selectedPlayer?.["name"]} style={{ margin: 10 }}>
          <p>{`HP: ${selectedPlayer?.["hp"]}`}</p>
          <InputNumber min={-selectedPlayer?.["hp"]} onChange={val=>{setHp(val)}} />
          <p>{`MP: ${selectedPlayer?.["mp"]}`}</p>
          <InputNumber min={-selectedPlayer?.["mp"]} onChange={val=>{setMp(val)}} />
          <p>{`Luck: ${selectedPlayer?.["luck"]}`}</p>
          <InputNumber min={-selectedPlayer?.["luck"]} onChange={val=>{setLuck(val)}} />
          <p>{`Sanity: ${selectedPlayer?.["sanity"]}`}</p>
          <InputNumber min={-selectedPlayer?.["sanity"]} onChange={val=>{setSanity(val)}} />
      </Card>
      </Modal>
      <DiceButtons stompClient={stompClient} plId={plId} gameId={gameId}/>
        <>
        <Row type="flex">
      <Col span={6}>        
      {players.map((player) => {

return !player['isKeeper'] &&
(<>
<Card title={player["id"] === plId && <p>Your Character</p>} 
style={{ margin: 10, backgroundImage: checkGameOver(player) ? "url('https://fontmeme.com/permalink/211215/b735034a712f3d6019c2c5e2d328614f.png')" : ""}}
id={player['id']}
    extra={isKeeper && 
      <Button type="text" ghost onClick={() => openPlayerModal(player['id'])} icon={<MoreOutlined />}></Button>}
  >
    <Meta
    title={player["name"]}
    avatar={<Avatar src={player["avatar"]} />}
      />
    <div>
    <p>{`Sex: ${player["sex"]}`}</p>
    <p>{`Occupation: ${player["occupation"]}`}</p>
    <p>{`HP: ${player["hp"]}`}</p>
    <p>{`MP: ${player["mp"]}`}</p>
    <p>{`Luck: ${player["luck"]}`}</p>
    <p>{`Sanity: ${player["sanity"]}`}</p>
    <p>{`Description: ${player["description"]}`} </p>
    </div>
  </Card>
<Divider type="vertical" />
</>)
})}</Col>
      <Col span={18}>
        <ChatBox messages={combinedMessages} users={players} onSubmit={onSubmit} />
        <div id='dice-roll' z-index={289} width="100%" height="100%"></div>
        </Col>
    </Row>
    
        </>
    </>);
}

export default InGamePage;