import React, { useEffect, useState, useCallback } from "react";
import attackSound from "../sounds/attack-sound.mp3";
import defendSound from "../sounds/defend.mp3";

const Modal = ({
  closeModal,
  playerStrength,
  enemyStrength,
  playerHealth,
  enemyHealth,
  setPlayerHealth,
  setEnemyHealth,
  setPlayerStrength,
  setEnemyStrength,
  respawnEnemy,
}) => {
  const [isAttackTime, setIsAttackTime] = useState(false);
  const [isDefendTime, setIsDefendTime] = useState(false);
  const [canAct, setCanAct] = useState(true);
  const [timer, setTimer] = useState(3);
  const [defendedInTime, setDefendedInTime] = useState(false);
  const [attackCount, setAttackCount] = useState(0);
  const [penaltyDelay, setPenaltyDelay] = useState(500);
  const [playerDamaged, setPlayerDamaged] = useState(false);
  const [enemyDamaged, setEnemyDamaged] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const applyDamageEffects = (target) => {
    if (target === "player") {
      setPlayerDamaged(true);
      setTimeout(() => setPlayerDamaged(false), 500); // Duration of the animations
    } else if (target === "enemy") {
      setEnemyDamaged(true);
      setTimeout(() => setEnemyDamaged(false), 500); // Duration of the animations
    }
  };

  const attack = new Audio(attackSound);
  const defend = new Audio(defendSound);

  // Update the updatePlayerHealth and updateEnemyHealth functions to use applyDamageEffects
  const updatePlayerHealth = useCallback(
    (health) => {
      setPlayerHealth(Math.min(health, 100));
      applyDamageEffects("player");
    },
    [setPlayerHealth]
  );
  const updateEnemyHealth = (health) => {
    setEnemyHealth(Math.min(health, 100));
    applyDamageEffects("enemy");
  };

  useEffect(() => {
    const startCountdown = () => {
      setIsTimerActive(true); // Activate the timer
      setTimer(3);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0.1) {
            clearInterval(countdown);
            setIsTimerActive(false); // Deactivate the timer
            document.querySelector(".modal-content").style.backgroundColor =
              "red";
            setTimeout(() => {
              if (!defendedInTime) {
                // Player didn't defend in time, apply damage
                const damage = Math.ceil(Math.random() * enemyStrength);
                updatePlayerHealth(playerHealth - damage);
              }
              setIsDefendTime(false);
              document.querySelector(".modal-content").style.backgroundColor =
                "white";
            }, 250);
          }
          return Math.max(prev - 0.1, 0).toFixed(1);
        });
      }, 100);
    };

    const defendInterval = setInterval(() => {
      setIsDefendTime(true);
      setDefendedInTime(false);
      setAttackCount(0);
      document.querySelector(".modal-content").style.backgroundColor = "orange";
      startCountdown();
    }, Math.random() * 6000 + 4000); // 4 to 10 seconds interval

    const attackInterval = setInterval(() => {
      if (!defendedInTime) {
        setIsAttackTime(true);
        document.querySelector(".modal-content").style.backgroundColor =
          "lightgreen";
        startCountdown();
      }
    }, Math.random() * 6000 + 4000); // 4 to 10 seconds interval

    return () => {
      clearInterval(defendInterval);
      clearInterval(attackInterval);
    };
  }, [enemyStrength, defendedInTime, updatePlayerHealth, playerHealth]);

  useEffect(() => {
    if (enemyHealth <= 0) {
      respawnEnemy();
      setPlayerStrength((prevStrength) => prevStrength + 1);
      setEnemyStrength((prevStrength) => prevStrength + 1);
    }
  }, [enemyHealth, respawnEnemy, setEnemyStrength, setPlayerStrength]);

  const handleAction = (action) => {
    if (!canAct) return;

    setCanAct(false);
    action();
    setTimeout(() => setCanAct(true), penaltyDelay); // Delay between actions
  };

  const getHealthEmoji = (health) => {
    if (health > 75) {
      return "❤️"; // Healthy
    } else if (health > 50) {
      return "💛"; // Slightly injured
    } else if (health > 25) {
      return "💔"; // Injured
    } else {
      return "🖤"; // Critically injured
    }
  };

  const handleAttack = () => {
    if (timer > 0) {
      if (isDefendTime && attackCount < 3) {
        setAttackCount((prevCount) => prevCount + 1);
        const damage = Math.ceil(Math.random() * playerStrength);
        updateEnemyHealth(enemyHealth - damage);
        attack.play();
        // Increase penalty delay if player keeps spamming
        setPenaltyDelay((prevDelay) => Math.min(prevDelay + 100, 1000));
      } else if (isAttackTime) {
        const damage = Math.ceil(Math.random() * playerStrength);
        updateEnemyHealth(enemyHealth - damage);
        attack.play();
      } else {
        // Penalize player for attacking outside the attack window
        const damage = Math.ceil(Math.random() * enemyStrength);
        updatePlayerHealth(playerHealth - damage);
      }
    }
  };

  const handleParry = () => {
    if (isDefendTime) {
      setDefendedInTime(true);
      // Heal player by 1 HP
      updatePlayerHealth(playerHealth + 1);
      // Reflect 0.1% of enemy strength back to the enemy
      const reflectedDamage = Math.ceil(enemyStrength * 0.001);
      updateEnemyHealth(enemyHealth - reflectedDamage);
      defend.play();
    } else {
      // Penalize player for defending outside the defend window
      const damage = Math.ceil(Math.random() * enemyStrength);
      updatePlayerHealth(playerHealth - damage);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>🤖Enemy spotted! Prepare to fight❗❗</p>

        <div className="button-wrapper">
          <button
            onClick={() => handleAction(handleAttack)}
            className="attack-modal-btn"
            disabled={!canAct}
          >
            ⚔️Attack
          </button>
          <button
            onClick={() => handleAction(handleParry)}
            className="defend-modal-btn"
            disabled={!canAct}
          >
            🛡️Parry
          </button>
          <button className="close-modal-btn" onClick={closeModal}>
            🏃Run
          </button>
        </div>
        <div className="health-status">
          <div className="status-wrapper">
            <div className="player-status">
              <h3>Player</h3>
              <div className="player-img-wrapper">
                <div
                  className={`player-img ${
                    playerDamaged ? "shake flashRed" : ""
                  }`}
                ></div>
              </div>
              <p>
                {getHealthEmoji(playerHealth)} {playerHealth}
              </p>
              <p>🔫Strength: {playerStrength}</p>
            </div>
            <div className="enemy-status">
              <h3>Enemy</h3>
              <div className="enemy-img-wrapper">
                <div
                  className={`enemy-img ${enemyDamaged ? "shake" : ""}`}
                ></div>{" "}
              </div>
              <p>
                {getHealthEmoji(enemyHealth)} {enemyHealth}
              </p>
              <p>🔫Strength: {enemyStrength} </p>
            </div>
          </div>
        </div>
        <div className="timer">
          <p style={{ textAlign: "center" }}>
            {isTimerActive
              ? `⏲️Time Remaining: ${timer} seconds`
              : "Wait for timer to start..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
