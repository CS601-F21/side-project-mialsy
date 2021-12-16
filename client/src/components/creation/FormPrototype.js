import { Button } from "antd";
import Form from "antd/lib/form";
import React from "react";

/**
 * From Prototype, protype used for rendering different forms on creation step
 * 
 * @param {*} props props from parent 
 * @returns 
 */
const FormPrototype = (props) => {
    const onFinish = (values) => {
        props.onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    return (
        <div style={{marginTop: 50}}>
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
                    </div>
                </Form.Item>

            </Form>
        </div>
    );
}

export default FormPrototype;