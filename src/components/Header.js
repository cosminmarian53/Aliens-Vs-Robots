import React from "react";

const Header = ({ account }) => {
  return (
    <header>
      <div className="wavy">
        <h1 className="main-header">
          <span className="main-header blink-span">
            <span style={{ "--i": 1 }}>A</span>
            <span style={{ "--i": 2 }}>L</span>
            <span style={{ "--i": 3 }}>I</span>
            <span style={{ "--i": 4 }}>E</span>
            <span style={{ "--i": 5 }}>N</span>
            <span style={{ "--i": 6 }}>S</span>
          </span>
          <span className="main-header blink">
            <span style={{ "--i": 7 }}> </span>
            <span style={{ "--i": 8 }}> vs. </span>
            <span style={{ "--i": 9 }}> </span>
          </span>
          <span className="main-header blink-span2">
            <span style={{ "--i": 10 }}>R</span>
            <span style={{ "--i": 11 }}>O</span>
            <span style={{ "--i": 12 }}>B </span>
            <span style={{ "--i": 13 }}>O</span>
            <span style={{ "--i": 14 }}>T</span>
            <span style={{ "--i": 15 }}>S</span>
          </span>
        </h1>
      </div>
      <p className="sub-header">
        👾Your account's address:<br></br>
        {account}
      </p>
      <p className="sub-header">Start the game by using the arrow keys!</p>
    </header>
  );
};

export default Header;
