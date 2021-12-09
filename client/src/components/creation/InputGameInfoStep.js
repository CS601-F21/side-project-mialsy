import { Button, Input } from "antd";
import Form from "antd/lib/form";
import React from "react";

const InputGameInfoStep = () => {
    return (
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item 
                    label="Game Room Name"
                    name="name"
                    rules={[
                        {
                          required: true,
                          message: "Please input the game room name!",
                        },
                      ]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Next
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default InputGameInfoStep;