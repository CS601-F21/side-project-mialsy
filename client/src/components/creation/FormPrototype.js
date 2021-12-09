import { Button } from "antd";
import Form from "antd/lib/form";
import React from "react";

const FormPrototype = (props) => {
    const onFinish = (values) => {
        props.onFinish(values);
        props.next();
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
                    <Button type="primary" htmlType="submit">
                    Next
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormPrototype;