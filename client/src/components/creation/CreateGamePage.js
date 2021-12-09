import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import CreateCharacterStep from "./CreateCharacterStep";
import CreateKeeperStep from "./CreateKeeperStep";
import InputGameInfoStep from "./InputGameInfoStep";

const { Step } = Steps;

const CreateGamePage = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }

    const steps = [
        {
            title: 'Input Your Infomation',
            content: <CreateKeeperStep next={next} />,
        },
        {
            title: 'Input Game Infomation',
            content: <InputGameInfoStep next={next} />,
        },
        {
            title: 'Create Characters',
            content: <CreateCharacterStep next={next} />,
        }, {
            title: 'Success!',
            content: <div>Start game now!</div>
        }
    ];

    return (
        <div>
            <Steps current={current}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>

            <div>{steps[current].content}</div>
            {/* <div>
                {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Start!
                </Button>
                )}
                {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
                )}
            </div> */}
        </div>
    );
}

export default CreateGamePage;