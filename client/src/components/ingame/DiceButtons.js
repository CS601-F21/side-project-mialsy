import { Affix, Button } from 'antd';
import React from 'react';
import rollADie from 'roll-a-die';

const dices = ["D4", "D6", "D10", "D12", "D20", "D100"];

/**
 * Dice Buttons
 * Redner D4 to D100 different types of dice buttons
 * 
 * @param {*} props props from parent componennt
 * @returns dice buttons component
 */
const DiceButtons = (props) => {
    const stompClient = props.stompClient;
    const plId = props.plId;
    const gameId = props.gameId;

    const handleDiceRolling = (diceType) => {
        rollADie({ element: document.getElementById('dice-roll'), numberOfDice: 1, callback: () => { } });
        stompClient.send(`/app/dice/${gameId}`, {}, JSON.stringify({ 'diceType': diceType, 'byId': plId }));
    }

    return (
        <Affix style={{margin: 10}}>
            <h4 style={{ color: "white" }}>Roll dice here</h4>
            {dices.map(dice => <Button style={{ marginLeft: 2 }} type="primary" onClick={() => handleDiceRolling(dice)}>{dice}</Button>)}
        </Affix>

    )
}

export default DiceButtons;