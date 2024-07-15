import React from "react";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import NPCController from "./components/NPCController";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import Stats from "./components/Stats";
import Header from "./components/Header";

const App = () => {
  const [isUp, setIsUp] = React.useState(false);
  const [isDown, setIsDown] = React.useState(false);
  const [isLeft, setIsLeft] = React.useState(false);
  const [isRight, setIsRight] = React.useState(false);
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main>
          <div className="game-container">
            <MapBase
              setIsDown={setIsDown}
              isDown={isDown}
              isUp={isUp}
              setIsUp={setIsUp}
              isLeft={isLeft}
              setIsLeft={setIsLeft}
              isRight={isRight}
              setIsRight={setIsRight}
            />
            <Stats />
          </div>
          <PlayerController
            setIsDown={setIsDown}
            isDown={isDown}
            isUp={isUp}
            setIsUp={setIsUp}
            isLeft={isLeft}
            setIsLeft={setIsLeft}
            isRight={isRight}
            setIsRight={setIsRight}
          />
          <NPCController />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
