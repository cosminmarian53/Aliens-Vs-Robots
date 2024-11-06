import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Web3 from "web3";
import "./MapBase.css";
import Typewriter from "./Typewritter";
import {
  bitBlopContract,
  bloodforgeBotContract,
  cyberAlienContract,
  generalXenoContract,
} from "../constants";

const SafeArea = ({
  player,
  isUp,
  isDown,
  isLeft,
  isRight,
  isModalOpen,
  talkCounter,
  setTalkCounter,
  questsCompleted,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [account, setAccount] = useState("");
  const [hasMintedBitBlop, setHasMintedBitBlop] = useState(false);
  const [hasMintedBloodforgeBot, setHasMintedBloodforgeBot] = useState(false);
  const [hasMintedGeneralXeno, setHasMintedGeneralXeno] = useState(false);
  const [hasMintedCyberAlien, setHasMintedCyberAlien] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mintedNftLink, setMintedNftLink] = useState("");

  const dialogues = [
    "Welcome to the safe area, soldier! Thank you for saving me! I was able to run and hide from the robot invaders. This is my sanctuary, you can rest here and prepare for your next mission. Remember, the fate of the galaxy is in your hands!",
    "You can rest here and prepare for your next mission. Remember, the fate of the galaxy is in your hands!",
    "Also, don't forget to finish your quests in order to get rewards!",
    "You have completed all the quests! You are now ready to mint your NFT!",
    "Minting your NFT, please wait...",
    "Congratulations on minting BitBlop!",
    "Congratulations on minting BloodforgeBot!",
    "Congratulations on minting General XENO!",
    "Congratulations on minting CyberAlien! The darkness is now upon us...",
  ];

  const size = 10;
  const createMapMatrix = () => {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      // First and last column
      matrix[i][0] = 1;
      matrix[i][size - 1] = 9;
    }
    for (let j = 0; j < size; j++) {
      // First and last row
      matrix[0][j] = 8;
      matrix[size - 1][j] = 7;
    }
    // define corners of border
    matrix[0][0] = 11;
    matrix[0][size - 1] = 12;
    matrix[size - 1][0] = 10;
    matrix[size - 1][size - 1] = 6;
    // Player
    matrix[player.y][player.x] = 2;
    // solid blocks-safe area-npc and tower
    matrix[1][3] = 4;
    matrix[2][3] = 13;
    matrix[2][6] = 13;
    matrix[1][6] = 4;
    matrix[1][4] = 14;
    matrix[1][5] = 15;
    matrix[6][6] = 13;
    matrix[5][6] = 4;
    matrix[6][3] = 13;
    matrix[5][3] = 4;
    // water decoration-first column
    matrix[1][1] = 16;
    matrix[2][1] = 16;
    matrix[3][1] = 16;
    matrix[4][1] = 16;
    matrix[5][1] = 16;
    matrix[6][1] = 16;
    matrix[7][1] = 16;
    matrix[8][1] = 16;
    // water decoration-last column
    matrix[1][8] = 16;
    matrix[2][8] = 16;
    matrix[3][8] = 16;
    matrix[4][8] = 16;
    matrix[5][8] = 16;
    matrix[6][8] = 16;
    matrix[7][8] = 16;
    matrix[8][8] = 16;
    // water decoration-last row
    matrix[8][2] = 16;
    matrix[8][3] = 16;
    matrix[8][4] = 16;
    matrix[8][5] = 16;
    matrix[8][6] = 16;
    matrix[8][7] = 16;
    matrix[8][8] = 16;
    return matrix;
  };

  const matrix = createMapMatrix();

  const renderTable = (matrix) => {
    return matrix.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => {
          let className = "";

          if (cell === 1) {
            className = "safe-zone-border-pipeline";
          } else if (cell === 2) {
            className = `${
              (isUp ? "player-up" : "") ||
              (isDown ? "player-down" : "") ||
              (isLeft ? "player-left" : "") ||
              (isRight ? "player-right" : "") ||
              "player"
            }`;
          } else if (cell === 11) {
            className = "safe-zone-border-pipeline-left-up";
          } else if (cell === 7) {
            className = "safe-zone-border-pipeline-bottom";
          } else if (cell === 8) {
            className = "safe-zone-border-pipeline-top";
          } else if (cell === 9) {
            className = "safe-zone-border-pipeline-right";
          } else if (cell === 12) {
            className = "safe-zone-border-pipeline-right-up";
          } else if (cell === 10) {
            className = "safe-zone-border-pipeline-left-bottom";
          } else if (cell === 6) {
            className = "safe-zone-border-pipeline-right-bottom";
          } else if (cell === 4) {
            className = "tower-upper";
          } else if (cell === 13) {
            className = "tower-lower";
          } else if (cell === 14) {
            className = "xeno-npc";
          } else if (cell === 15) {
            className = "egg-decoration";
          } else if (cell === 16) {
            className = "water-decoration";
          }

          return (
            <div
              key={colIndex}
              className={`cell safe-zone-tile ${className}`}
            ></div>
          );
        })}
      </div>
    ));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && player.x === 4 && player.y === 2) {
        setModalOpen(true);
        setTalkCounter((prevCounter) => prevCounter + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];

        setAccount(currentAccount);

        // Check if the account has already minted the NFTs
        const hasMintedBitBlop = await bitBlopContract.methods
          .hasMinted(currentAccount)
          .call();
        const hasMintedBloodforgeBot = await bloodforgeBotContract.methods
          .hasMinted(currentAccount)
          .call();
        const hasMintedGeneralXeno = await generalXenoContract.methods
          .hasMinted(currentAccount)
          .call();
        const hasMintedCyberAlien = await cyberAlienContract.methods
          .hasMinted(currentAccount)
          .call();

        setHasMintedBitBlop(hasMintedBitBlop);
        setHasMintedBloodforgeBot(hasMintedBloodforgeBot);
        setHasMintedGeneralXeno(hasMintedGeneralXeno);
        setHasMintedCyberAlien(hasMintedCyberAlien);

        // Listen for account changes
        window.ethereum.on("accountsChanged", async (accounts) => {
          const newAccount = accounts[0];
          setAccount(newAccount);

          // Check if the new account has already minted the NFTs
          const hasMintedBitBlop = await bitBlopContract.methods
            .hasMinted(newAccount)
            .call();
          const hasMintedBloodforgeBot = await bloodforgeBotContract.methods
            .hasMinted(newAccount)
            .call();
          const hasMintedGeneralXeno = await generalXenoContract.methods
            .hasMinted(newAccount)
            .call();
          const hasMintedCyberAlien = await cyberAlienContract.methods
            .hasMinted(newAccount)
            .call();

          setHasMintedBitBlop(hasMintedBitBlop);
          setHasMintedBloodforgeBot(hasMintedBloodforgeBot);
          setHasMintedGeneralXeno(hasMintedGeneralXeno);
          setHasMintedCyberAlien(hasMintedCyberAlien);
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

  const mintNft = async (contract, setMintedState) => {
    setLoading(true);
    try {
      const receipt = await contract.methods.mintNft().send({ from: account });
      const tokenId = receipt.events.Transfer.returnValues.tokenId;
      const etherscanLink = `https://etherscan.io/token/${contract.options.address}?a=${tokenId}`;
      setMintedNftLink(etherscanLink);
      setMintedState(true);
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = () => {
    if (!hasMintedBitBlop) {
      mintNft(bitBlopContract, setHasMintedBitBlop);
    } else if (!hasMintedBloodforgeBot) {
      mintNft(bloodforgeBotContract, setHasMintedBloodforgeBot);
    } else if (!hasMintedGeneralXeno) {
      mintNft(generalXenoContract, setHasMintedGeneralXeno);
    } else if (!hasMintedCyberAlien) {
      mintNft(cyberAlienContract, setHasMintedCyberAlien);
    }
  };

  return (
    <div className="map-base-container">
      <div className="map-base-table">{renderTable(matrix)}</div>
      {modalOpen && (
        <div className="modal-safe-area">
          <div className="modal-content-safe-area">
            <div className="alien-npc-box">
              <div className="alien-npc-wrapper">
                <h2 className="alien-npc-name">Alien General X.E.N.O</h2>
                <div className="alien-npc-image"></div>
                <div className="alien-npc-dialogue">
                  <Typewriter
                    text={
                      loading
                        ? dialogues[4]
                        : hasMintedCyberAlien
                        ? dialogues[8]
                        : hasMintedGeneralXeno
                        ? dialogues[7]
                        : hasMintedBloodforgeBot
                        ? dialogues[6]
                        : hasMintedBitBlop
                        ? dialogues[5]
                        : talkCounter > 3
                        ? dialogues[3]
                        : talkCounter === 3
                        ? dialogues[2]
                        : talkCounter >= 2
                        ? dialogues[1]
                        : dialogues[0]
                    }
                    speed={50}
                    wordsPerLine={20}
                  />
                </div>
                {mintedNftLink && (
                  <p>
                    Minted NFT:{" "}
                    <a
                      href={mintedNftLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Etherscan
                    </a>
                  </p>
                )}
              </div>
              <button
                className="close-modal-btn"
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                Close
              </button>
              {talkCounter > 3 && (
                <button
                  className="mint-nft-btn"
                  onClick={handleMint}
                  disabled={loading}
                >
                  {loading ? "Minting..." : "Mint NFT"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.player.player,
  safeAreaBlocks: state.player.safeAreaBlocks,
  isSafeArea: state.player.isSafeArea,
  questsCompleted: state.player.questsCompleted,
});

export default connect(mapStateToProps)(SafeArea);
