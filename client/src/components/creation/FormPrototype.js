import { Button } from "antd";
import Form from "antd/lib/form";
import React from "react";

const FormPrototype = (props) => {
    const onFinish = (values) => {
        props.onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    return (
        <div>
            <Form
                {...formItemLayout}
                layout="horizontal"
                onFinish={onFinish}
            >
                {
                    props.content
                }
                <Form.Item
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