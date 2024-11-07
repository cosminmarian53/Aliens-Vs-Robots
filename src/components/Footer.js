import React, { useEffect } from "react";
import "../index.css";
import theme from "../sounds/main-theme.mp3";
import battle from "../sounds/battle_theme.mp3";
const Footer = ({
  isModalOpen,
  playing,
  toggleAudio,
  currentTheme,
  battle,
  theme,
}) => {
  useEffect(() => {
    const newAudio = new Audio(isModalOpen ? battle : theme);
    newAudio.volume = 0.3;
    newAudio.loop = true;
    if (playing) {
      try {
        newAudio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  }, [isModalOpen, playing]);

  return (
    <footer>
      <div>
        <p>
          {playing ? `🔊Now playing: ${currentTheme}` : "🔇Music is paused"}
        </p>
        <button type="submit" className="sound-btn" onClick={toggleAudio}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <p>
        Made with 💖
        <span>by Team Bytes</span>
      </p>
    </footer>
  );
};

export default Footer;
