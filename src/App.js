import React, { useState } from "react";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import NPCController from "./components/NPCController";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import Header from "./components/Header";
import PlayerStats from "./components/PlayerStats";
import NPCStats from "./components/NPCStats";
const App = () => {
  // Define all states
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100); // Assuming initial health is 100
  const [enemyHealth, setEnemyHealth] = useState(100); // Assuming initial health is 100
  const [playerStrength, setPlayerStrength] = useState(10); // Assuming initial strength is 10
  const [enemyStrength, setEnemyStrength] = useState(10); // Assuming initial strength is 10
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main>
          <div className="game-container">
            <PlayerStats
              playerHealth={playerHealth}
              playerStrength={playerStrength}
            />
            <MapBase
              isDown={isDown}
              isUp={isUp}
              isLeft={isLeft}
              isRight={isRight}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              enemyHealth={enemyHealth}
              setEnemyHealth={setEnemyHealth}
              playerHealth={playerHealth}
              setPlayerHealth={setPlayerHealth}
              playerStrength={playerStrength}
              enemyStrength={enemyStrength}
            />
            <NPCStats enemyHealth={enemyHealth} enemyStrength={enemyStrength} />
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
            isModalOpen={isModalOpen}
          />
          <NPCController isModalOpen={isModalOpen} />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
