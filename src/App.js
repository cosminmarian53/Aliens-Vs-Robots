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
import theme from "./sounds/main-theme.mp3";
import battle from "./sounds/battle_theme.mp3";

const App = () => {
  // Define all states
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100); // Assuming initial health is 100
  const [enemyHealth, setEnemyHealth] = useState(1); // Assuming initial health is 100
  const [playerStrength, setPlayerStrength] = useState(10); // Assuming initial strength is 10
  const [enemyStrength, setEnemyStrength] = useState(10); // Assuming initial strength is 10
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [bossHealth, setBossHealth] = useState(2);
  const [bossStrength] = useState(20);
  const [hasEntered, setHasEntered] = useState(false);
  const [talkCounter, setTalkCounter] = useState(0);
  const [enemyDeathCounter, setEnemyDeathCounter] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(1);
  const isBoss = currentEnemy === 1 ? false : true;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // Audio player state
  const [audio, setAudio] = useState(new Audio(theme));
  const [playing, setPlaying] = useState(() => {
    const saved = localStorage.getItem("playing");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("currentTheme");
    return saved !== null ? saved : "Main Theme";
  });

  const toggleAudio = () => setPlaying(!playing);

  useEffect(() => {
    localStorage.setItem("playing", JSON.stringify(playing));
    if (playing) {
      try {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          setPlaying(false);
        });
        audio.volume = 0.3;
      } catch (error) {
        console.error("Error playing audio:", error);
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.pause();
    const newAudio = new Audio(isModalOpen ? battle : theme);
    newAudio.volume = 0.3;
    newAudio.loop = true;
    setAudio(newAudio);
    setCurrentTheme(isModalOpen ? "Battle Theme" : "Main Theme");
    localStorage.setItem(
      "currentTheme",
      isModalOpen ? "Battle Theme" : "Main Theme"
    );
    if (playing) {
      try {
        newAudio.play().catch((error) => {
          console.error("Error playing audio:", error);
          setPlaying(false);
        });
      } catch (error) {
        console.error("Error playing audio:", error);
        setPlaying(false);
      }
    }
  }, [isModalOpen]);

  // Screen resizer for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem("wallet");
    return saved !== null ? saved : "";
  });
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(() => {
    const saved = localStorage.getItem("selectedAccount");
    return saved !== null ? saved : "";
  });
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved !== null ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    // ensure that there is an injected Ethereum provider
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(new Web3(window.ethereum));
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccounts(accounts);
        const walletAddress = accounts[0]; // Default to the first account
        setWallet(walletAddress);
        setSelectedAccount(walletAddress);

        // Get the balance in Wei and convert it to Ether
        const balanceWei = await web3.eth.getBalance(walletAddress);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setBalance(parseFloat(balanceEth).toFixed(4)); // Format balance to 4 decimal places

        console.log(`Wallet: ${walletAddress}`);
        console.log(`Balance: ${balanceEth} ETH`);

        // Save to localStorage
        localStorage.setItem("wallet", walletAddress);
        localStorage.setItem("selectedAccount", walletAddress);
        localStorage.setItem("balance", parseFloat(balanceEth).toFixed(4));

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts) => {
          setAccounts(accounts);
          setWallet(accounts[0]); // Default to the first account
          setSelectedAccount(accounts[0]);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  const disconnectWallet = () => {
    setWallet("");
    setSelectedAccount("");
    localStorage.removeItem("wallet");
    localStorage.removeItem("selectedAccount");
    localStorage.removeItem("balance");
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener("accountsChanged", setAccounts);
    }
  };

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

  if (!hasEntered) {
    return (
      <>
        <div className="player-starter-page">
          <Header
            wallet={wallet}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            balance={balance}
          />{" "}
          <StarterScreen
            hasEntered={hasEntered}
            setHasEntered={setHasEntered}
          />
          <Footer
            isModalOpen={isModalOpen}
            playing={playing}
            toggleAudio={toggleAudio}
            currentTheme={currentTheme}
          />
        </div>
      </>
    );
  }

  return (
    <Provider store={store}>
      <>
        <div className="App">
          {playerHealth > 0 && (
            <Header
              wallet={wallet}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
              balance={balance}
            />
          )}
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
                {isMobile && (
                  <div className="arena-and-npc-stats">
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
                )}

                {!isMobile && (
                  <>
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
                  </>
                )}
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
          <Footer
            isModalOpen={isModalOpen}
            playing={playing}
            toggleAudio={toggleAudio}
            currentTheme={currentTheme}
          />
        </div>
      </>
    </Provider>
  );
};

export default App;
