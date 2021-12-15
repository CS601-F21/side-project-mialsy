import { Input, message } from "antd";
import Form from "antd/lib/form";
import axios from "axios";
import React from "react";
import FormPrototype from "./FormPrototype";

const InputGameInfoStep = (props) => {

    const content = (<Form.Item
        label="Game Name"
        name="gameName"
        rules={[
            {
                required: true,
                message: "Please input the game name!",
            },
        ]}
    >
        <Input />
    </Form.Item>);

    const onFinish = (value) => {
        const data = {
            name: value.gameName
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/game`, data)
            .then((res) => {
                sessionStorage.setItem("gameId", res.data.id);
                sessionStorage.setItem("gameName", res.data.name);
                props.next();
            }).catch((err) => {
                console.log(err);
                message.error("Cannot create game at this time, please try again later.");
            });
    }

    return (
        <FormPrototype next={props.next} content={content} onFinish={onFinish} />
    );
}

export default InputGameInfoStep;