import { Input, message } from "antd";
import Form from "antd/lib/form";
import axios from "axios";
import React from "react";
import FormPrototype from "./FormPrototype";

const CreateKeeperStep = (props) => {
    const content = (<Form.Item
        label="Your Name"
        name="plname"
        rules={[
            {
                required: true,
                message: "Please input your name!",
            },
        ]}
    >
        <Input />
    </Form.Item>);

    const onFinish = (value) => {
        const data = {
            name: value.plname,
            isKeeper: true,
            occupied: true,
            avatar: "https://fontmeme.com/permalink/211215/723034e1e7385707ff6c9334dbf58d04.png"
        };

        const gameId = sessionStorage.getItem("gameId");

        axios.post(`${process.env.REACT_APP_BASE_URL}/player?gameId=${gameId}`, data)
            .then((res) => {
                sessionStorage.setItem("kpId", res.data.plId);
                sessionStorage.setItem("kpName", res.data.name);
                props.next();
            }).catch((err) => {
                console.log(err);
                message.error("Cannot create keeper at this time, please try again later.");
            });
    }

    return (
        <FormPrototype next={props.next} prev={props.prev} content={content} onFinish={onFinish} />
    );
}

export default CreateKeeperStep;