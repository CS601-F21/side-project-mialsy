import './App.less';
import * as SockJS from 'sockjs-client';
import { Button, Input } from "antd";
import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';

function App() {
  const [stompClient, setClient] = useState(undefined);
  const [inputVal, setInputVal] = useState('');
  const [inputVal2, setInputVal2] = useState('');


  const connect = () => {
    const socket = new SockJS("http://localhost:8080/coc-websocket");
    const sc = Stomp.over(socket);
    setClient(sc);
  }

  useEffect(() => {
    const header = {
      "name": "mialsy"
    }
    if (stompClient) {
      console.log("I am here")
      stompClient.connect(header, function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/message', function (greeting) {
          console.log("message: " + JSON.parse(greeting.body).msgBody);
        });


        stompClient.subscribe('/topic/character', function (greeting) {
          console.log("character: " + JSON.parse(greeting.body).msgBody);
        });
      });


    }
  }, [stompClient]);

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
    setClient(undefined);
    console.log("disconnected");
  }

  const toggleConnection = () => {
    if (stompClient) {
      disconnect();
    } else {
      connect();
    } 
  }

  const onSubmit = () => {
    console.log(stompClient);
    stompClient.send("/app/hello", {}, JSON.stringify({'msgBody': inputVal}));
  }

  const onCharacterChange = () => {
    console.log(inputVal2)
    stompClient.send("/app/stats", {}, JSON.stringify({'msgBody' : inputVal2, 'by': '122'}));
  }

  return (
    <div className="App">
      <Button type="primary" onClick={() => toggleConnection()}>{stompClient ? "Disconnect" : "Connect"}</Button>
      <Input.Group compact>
        <Input allowClear style={{ width: 'calc(100% - 200px)' }} onChange={(e) => setInputVal(e.target.value)} />
        <Button type="primary"  onClick={() => onSubmit()}>Submit</Button>
      </Input.Group>

      <Input.Group compact>
        <Input allowClear style={{ width: 'calc(100% - 200px)' }} onChange={(e) => setInputVal2(e.target.value)} />
        <Button type="primary"  onClick={() => onCharacterChange()}>Character Change</Button>
      </Input.Group>
    </div>
  );
}

export default App;
