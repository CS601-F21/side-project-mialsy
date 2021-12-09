import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div>Welcome to CoC Game Helper App!</div>
            <Button>
                <Link to="/newgame"> Create a game </Link>
            </Button>
            or 
            <Button>
                Enter a existing game
            </Button>
        </div>
    );
}

export default Home;