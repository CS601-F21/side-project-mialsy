import { Button, Input, Form, Divider, InputNumber, Radio, message } from "antd";
import FormPrototype from "./FormPrototype";
import axios from "axios";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const CreateCharacterStep = (props) => {

    const content = (
        <Form.List name="players">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <div>
                            <Form.Item
                                {...restField}
                                label="Name"
                                name={[name, 'name']}
                                fieldKey={[fieldKey, 'name']}
                                rules={[{ required: true, message: 'Please input character name' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Age"
                                name={[name, 'age']}
                                fieldKey={[fieldKey, 'age']}
                            >
                                <InputNumber min={0} />
                            </Form.Item>


                            <Form.Item
                                {...restField}
                                label="Sex"
                                name={[name, 'sex']}
                                fieldKey={[fieldKey, 'sex']}
                            >
                                <Radio.Group>
                                    <Radio.Button value="female">Female</Radio.Button> 
                                    <Radio.Button value="male">Male</Radio.Button> 
                                    <Radio.Button value="other">Other</Radio.Button> 
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Occupation"
                                name={[name, 'occupation']}
                                fieldKey={[fieldKey, 'occupation']}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Hit Point"
                                name={[name, 'hp']}
                                fieldKey={[fieldKey, 'hp']}
                                rules={[{ required: true, message: 'Please input hit point' }]}
                            >
                                <InputNumber min={0} max={100}/>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Magic Point"
                                name={[name, 'mp']}
                                fieldKey={[fieldKey, 'mp']}
                                rules={[{ required: true, message: 'Please input magic point' }]}
                            >
                                <InputNumber min={0} max={100}/>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Sanity"
                                name={[name, 'sanity']}
                                fieldKey={[fieldKey, 'sanity']}
                                rules={[{ required: true, message: 'Please input sanity' }]}
                            >
                                <InputNumber min={0} max={100}/>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Luck"
                                name={[name, 'luck']}
                                fieldKey={[fieldKey, 'luck']}
                                rules={[{ required: true, message: 'Please input luck' }]}
                            >
                                <InputNumber min={0} max={100}/>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                label="Description"
                                name={[name, 'description']}
                                fieldKey={[fieldKey, 'description']}
                            >
                                <Input />
                            </Form.Item>


                            <Button type="dashed" onClick={() => remove(name)} block icon={<MinusOutlined />}>
                                Remove
                            </Button>

                            <Divider />
                        </div>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                        </Button>
                    </Form.Item>
                </>
                )}
        </Form.List>
    );

    const onFinish = (values) => {
        const players = values['players']
        players.map((player) => {
            player["isKeeper"] = false
            player["occupied"] = false
        })
        const gameId = sessionStorage.getItem("gameId");
        axios.post(`${process.env.REACT_APP_BASE_URL}/players?gameId=${gameId}`, players)
        .then((res) => {
            props.next();
        }).catch((err) => { 
            console.log(err);
            message.error("Cannot create keeper at this time, please try again later.");
        });
    }

    return (
        <FormPrototype next={props.next} prev={props.prev} content={content} onFinish={onFinish}/>
    );
}

export default CreateCharacterStep;

