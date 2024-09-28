import React, { useState, useEffect } from "react";
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
import GameOver from "./components/GameOver";
import Quests from "./components/Quests";
import StarterScreen from "./components/StarterScreen";
import Web3 from "web3";
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
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [bossHealth, setBossHealth] = useState(200);
  const [bossStrength] = useState(20);
  const [hasEntered, setHasEntered] = useState(false);
  const [talkCounter, setTalkCounter] = useState(0);
  const [enemyDeathCounter, setEnemyDeathCounter] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(1);
  const isBoss = currentEnemy === 1 ? false : true;
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setHasEntered(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const [account, setAccount] = useState("");

useEffect(() => {
  // Connect to the blockchain
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadWeb3();

  // Cleanup function to remove the event listener
  return () => {
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener("accountsChanged", setAccount);
    }
  };
}, []);
  if (!hasEntered) {
    return (
      <>
        <Header account={account} /> <StarterScreen />
        <Footer isModalOpen={isModalOpen} playerHealth={playerHealth} />
      </>
    );
  }

  return (
    <Provider store={store}>
      <>
        <div className="App">
          {playerHealth > 0 && <Header account={account} />}
          {playerHealth > 0 ? (
            <main>
              <div className="game-container">
                <div className="game-left-side">
                  <PlayerStats
                    playerHealth={playerHealth}
                    playerStrength={playerStrength}
                  />
                  <Quests
                    bossHealth={bossHealth}
                    talkCounter={talkCounter}
                    enemyDeathCounter={enemyDeathCounter}
                  />
                </div>
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
                  setPlayerStrength={setPlayerStrength}
                  enemyStrength={enemyStrength}
                  setEnemyStrength={setEnemyStrength}
                  isDoorOpen={isDoorOpen}
                  setIsDoorOpen={setIsDoorOpen}
                  bossHealth={bossHealth}
                  setBossHealth={setBossHealth}
                  bossStrength={bossStrength}
                  isBoss={isBoss}
                  currentEnemy={currentEnemy}
                  setCurrentEnemy={setCurrentEnemy}
                  talkCounter={talkCounter}
                  setTalkCounter={setTalkCounter}
                  enemyDeathCounter={enemyDeathCounter}
                  setEnemyDeathCounter={setEnemyDeathCounter}
                />
                <NPCStats
                  enemyHealth={enemyHealth}
                  enemyStrength={enemyStrength}
                  isBoss={isBoss}
                  currentEnemy={currentEnemy}
                  setCurrentEnemy={setCurrentEnemy}
                  bossHealth={bossHealth}
                  bossStrength={bossStrength}
                />
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
              <NPCController
                isModalOpen={isModalOpen}
                bossHealth={bossHealth}
                isBoss={isBoss}
              />
            </main>
          ) : (
            <GameOver />
          )}
          <Footer isModalOpen={isModalOpen} playerHealth={playerHealth} />
        </div>
      </>
    </Provider>
  );
};

export default App;
