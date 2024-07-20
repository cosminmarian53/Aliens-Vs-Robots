import React, { useState } from "react";
import theme from "../sounds/main-theme.mp3";
import "../index.css";
const Footer = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audio = new Audio(theme);
  return (
    <footer>
      <p>
        Made with 💖
        <span>by Team Bytes</span>
      </p>
      <button
        onClick={() => {
          if (isSoundOn) {
            audio.pause();
            audio.currentTime = 0;
          } else {
            audio.volume = 0.2;
            audio.play();
          }
          setIsSoundOn(!isSoundOn);
        }}
        className="sound-btn"
      >
        {isSoundOn ? "🔊 Sound On" : "🔇 Sound Off"}
      </button>
    </footer>
  );
};

export default Footer;
