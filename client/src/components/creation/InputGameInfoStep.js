import { Input } from "antd";
import Form from "antd/lib/form";
import React from "react";
import FormPrototype from "./FormPrototype";

const InputGameInfoStep = (props) => {
    const storedValue = localStorage.getItem("gameName");
    console.log(storedValue);

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
        <Input defaultValue={storedValue} />
    </Form.Item>);

    const onFinish = (value) => {
        localStorage.setItem("gameName", value.gameName);
        console.log(value);
    }

    return (
        <FormPrototype next={props.next} content={content} onFinish={onFinish}/>
    );
}

export default InputGameInfoStep;