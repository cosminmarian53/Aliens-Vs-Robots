import React, { useState, useEffect } from "react";
import theme from "../sounds/main-theme.mp3";
import "../index.css";
const Footer = () => {
  const song = theme;
  const [audio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
      audio.volume = 0.3;
    } else {
      audio.pause();
    }
  }, [playing]);
  return (
    <footer>
      <div>
        <p> {playing ? "🔊Now playing : Main Theme" : "🔇Music is paused"}</p>
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
