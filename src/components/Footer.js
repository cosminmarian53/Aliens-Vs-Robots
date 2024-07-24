import React, { useState, useEffect } from "react";
import theme from "../sounds/main-theme.mp3";
import battle from "../sounds/battle_theme.mp3";
import "../index.css";

const Footer = ({ isModalOpen }) => {
  const [audio, setAudio] = useState(new Audio(theme));
  const [playing, setPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Main Theme");

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
      audio.volume = 0.3;
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.pause();
    const newAudio = new Audio(isModalOpen ? battle : theme);
    newAudio.volume = 0.3;
    newAudio.loop = true; // Add this line to enable audio looping
    setAudio(newAudio);
    setCurrentTheme(isModalOpen ? "Battle Theme" : "Main Theme");
    if (playing) {
      newAudio.play();
    }
  }, [isModalOpen]);

  return (
    <footer>
      <div>
        <p>
          {" "}
          {playing ? `🔊Now playing: ${currentTheme}` : "🔇Music is paused"}
        </p>
        <button type="submit" className="sound-btn" onClick={toggle}>
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
