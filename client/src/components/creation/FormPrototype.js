import { Button } from "antd";
import Form from "antd/lib/form";
import React from "react";

const FormPrototype = (props) => {
    console.log(props)
    const onFinish = (values) => {
        props.onFinish(values);
    }

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
                onFinish={onFinish}
            >
                {
                    props.content
                }
                <Form.Item
                    wrapperCol={{
                    offset: 4,
                    span: 16,
                    }}
                >
                    <div>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                    {
                        props.prev &&
                        <Button style={{marginLeft: 20}} onClick={() => props.prev()}>Prev</Button>
                    }
                    </div>
                </Form.Item>
                
            </Form>
        </div>
    );
}

export default FormPrototype;