import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {Button, message, Row, Col, Card, Divider} from 'antd';
import axios from "axios";
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';

const InGamePage = (props) => {
    const { state } = useLocation();
    const { plId, isKeeper } = state || {};
    const [ combinedMessages, setMessages ] = useState([]);
    const [ players, setPlayers ] = useState([]);

    
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

    const onSubmit= (msg) => {        
         stompClient.send("/app/message/29", {"name": "mialsy"}, JSON.stringify({'msgBody' : msg, 'by': '122'}));         
    }
    console.log(players);

    return (
    <> 
        <Button type="primary" onClick={() => toggleConnection()}>{stompClient ? "Disconnect" : "Connect"}</Button>
        
        <>
        <Row>
      <Col span={6}>        
      {players.map((player) => {

return !player['isKeeper'] &&
(<>
<Card title={player["name"]} style={{ margin: 10 }}>
  <p>{`Sex: ${player["sex"]}`}</p>
  <p>{`Occupation: ${player["occupation"]}`}</p>
  <p>{`HP: ${player["hp"]}`}</p>
  <p>{`MP: ${player["mp"]}`}</p>
  <p>{`Luck: ${player["luck"]}`}</p>
  <p>{`Sanity: ${player["sanity"]}`}</p>
  <p>{`Description: ${player["description"]}`}</p>
</Card>
<Divider type="vertical" />
</>)
})}</Col>
      <Col span={18}><ChatBox messages={combinedMessages} onSubmit={onSubmit} /></Col>
    </Row>
            
        </>
    </>);
}

export default InGamePage;