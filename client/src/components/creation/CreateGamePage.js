import { Steps } from "antd";
import React, { useState } from "react";
import CreateCharacterStep from "./CreateCharacterStep";
import CreateKeeperStep from "./CreateKeeperStep";
import InputGameInfoStep from "./InputGameInfoStep";
import GameLinkStep from "./GameLinkStep";

const { Step } = Steps;

/**
 * Create Game Page - including 4 steps
 *  
 * @returns Create Game Page Component 
 */
const CreateGamePage = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    }

    const steps = [
        {
            title: 'Input Game Infomation',
            content: <InputGameInfoStep next={next} />,
        }, {
            title: 'Input Your Infomation',
            content: <CreateKeeperStep next={next} />,
        }, {
            title: 'Create Characters',
            content: <CreateCharacterStep next={next} />,
        }, {
            title: 'Success!',
            content: <GameLinkStep />
        }
    ];

    return (
        <div style={{margin: 50}}>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>

            <div>{steps[current].content}</div>
        </div>
    );
}

export default CreateGamePage;