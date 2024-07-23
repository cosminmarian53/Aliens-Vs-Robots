import React, { useEffect, useState } from "react";
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
}) => {
  const [isAttackTime, setIsAttackTime] = useState(false);
  const [isDefendTime, setIsDefendTime] = useState(false);
  const [canAct, setCanAct] = useState(true);
  const [timer, setTimer] = useState(3);
  const [defendedInTime, setDefendedInTime] = useState(false);
  const [attackCount, setAttackCount] = useState(0);
  const [penaltyDelay, setPenaltyDelay] = useState(500);
  const attack = new Audio(attackSound);
  const defend = new Audio(defendSound);

  useEffect(() => {
    const startCountdown = () => {
      setTimer(3);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0.1) {
            clearInterval(countdown);
            document.querySelector(".modal-content").style.backgroundColor =
              "red";
            setTimeout(() => {
              if (!defendedInTime) {
                // Player didn't defend in time, apply damage
                const damage = Math.ceil(Math.random() * enemyStrength);
                setPlayerHealth((prevHealth) =>
                  Math.max(prevHealth - damage, 0)
                );
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
  }, [enemyStrength, defendedInTime]);

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
        setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));
        attack.play();
        // Increase penalty delay if player keeps spamming
        setPenaltyDelay((prevDelay) => Math.min(prevDelay + 100, 1000));
      } else if (isAttackTime) {
        const damage = Math.ceil(Math.random() * playerStrength);
        setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));
        attack.play();
      } else {
        // Penalize player for attacking outside the attack window
        const damage = Math.ceil(Math.random() * enemyStrength);
        setPlayerHealth((prevHealth) => Math.max(prevHealth - damage, 0));
      }
    }
  };

  const handleParry = () => {
    if (isDefendTime) {
      setDefendedInTime(true);
      // Heal player by 1 HP
      setPlayerHealth((prevHealth) => prevHealth + 1);
      // Reflect 0.1% of enemy strength back to the enemy
      const reflectedDamage = Math.ceil(enemyStrength * 0.001);
      setEnemyHealth((prevHealth) => Math.max(prevHealth - reflectedDamage, 0));
      defend.play();
    } else {
      // Penalize player for defending outside the defend window
      const damage = Math.ceil(Math.random() * enemyStrength);
      setPlayerHealth((prevHealth) => Math.max(prevHealth - damage, 0));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>🏴‍☠️WAR HAS BEEN DECLARED ON THE ROBOTS🔫!</p>
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
                <div className="player-img"></div>
              </div>
              <p>
                {getHealthEmoji(playerHealth)} {playerHealth}
              </p>
            </div>
            <div className="enemy-status">
              <h3>Enemy</h3>
              <div className="enemy-img-wrapper">
                <div className="enemy-img"></div>
              </div>
              <p>
                {getHealthEmoji(enemyHealth)} {enemyHealth}
              </p>
            </div>
          </div>
        </div>
        <div className="timer">
          <p>Time Remaining: {timer} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
