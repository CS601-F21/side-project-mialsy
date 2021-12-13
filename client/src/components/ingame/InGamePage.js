import React from 'react'
import { useLocation } from 'react-router-dom';

const InGamePage = (props) => {
    const { state } = useLocation();
    const { plId, isKeeper } = state;
    
    

    return (<p>game on</p>);
}

export default InGamePage;