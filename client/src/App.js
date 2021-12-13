import './App.less';
import { CookiesProvider, useCookies } from 'react-cookie';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import CreateGamePage from './components/creation/CreateGamePage';
import GameMainPage from './components/main/GameMainPage';
import PreviewGame from './components/preview/PreviewGame';
import CreateCharacterStep from './components/creation/CreateCharacterStep';
import InGamePage from './components/ingame/InGamePage';


function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <div>
          <Routes>
          <Route path = "/preview/:id" element={<PreviewGame />} />
            <Route path = "/game/:id" element={<GameMainPage />} />
            <Route path = "/newgame" element={<CreateGamePage />} />
            <Route path = "/" element={<Home /> } />
            <Route path = "/test" element={<CreateCharacterStep prev={() => console.log("prev")} next={() => console.log("next")}/>} />
            <Route path = "/ingame" element={<InGamePage />} />
            {/* <Route path = "*" element={<NotFoundPage />} /> */}
          </Routes> 
        </div>
      </BrowserRouter>
    </CookiesProvider>
      
  );
}

export default App;
