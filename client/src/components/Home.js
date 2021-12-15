import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{ margin: 30 }}>
            <h4>Welcome to CoC Game Helper App!</h4>
            <div>
                <Button>
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