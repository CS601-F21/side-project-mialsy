import './App.less';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateGamePage from './components/creation/CreateGamePage';
import GameMainPage from './components/main/GameMainPage';
import InGamePage from './components/ingame/InGamePage';


function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/game/:id" element={<GameMainPage />} />
            <Route path="/newgame" element={<CreateGamePage />} />
            <Route path="/" element={<Home />} />
            <Route path="/ingame/:id" element={<InGamePage />} />
            {/* <Route path = "*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
