import { Button, Input } from "antd";
import Form from "antd/lib/form";
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
        console.log(value);
    }

    return (
        <FormPrototype next={props.next} content={content} onFinish={onFinish}/>
    );
}

export default CreateKeeperStep;