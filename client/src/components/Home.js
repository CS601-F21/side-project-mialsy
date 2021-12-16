import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Home page
 * 
 * @returns Home page component
 */
const Home = () => {
    return (
        <div style={{ margin: 30, color: "white"}}>
            <h4>Welcome to CoC Game Helper App!</h4>
            <div>
                <Button type="primary">
                    <Link to="/newgame"> Create a game </Link>
                </Button>
            </div>
            or
            <div>
                Enter a existing game - You will need a link from your friend.
            </div>
        </div>
    );
}

export default Home;