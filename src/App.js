import React from "react";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import NPCController from "./components/NPCController";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h1 className="main-header">
            <span>RED</span> CUBE GAME
          </h1>
          <p className="sub-header">Move the cube using the arrow keys!</p>
        </header>
        <main>
          <MapBase />
          <PlayerController />
          <NPCController />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
