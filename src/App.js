import "./App.css";
import Canvas from "./components/Canvas";
import SideBar from "./components/SideBar";

import { useState } from "react";

function App() {
  const [rect, setRect] = useState(false);
  const [circle, setCircle] = useState(false);
  const addRect = () => {
    console.log("setting true");
    setRect(true);
  };
  const addCircle = () => {
    console.log("setting true");
    setCircle(true);
  };
  return (
    <div className="App">
      <div className="sidebar">
        <SideBar addRect={addRect} addCircle={addCircle} />
      </div>
      <div className="canvas-view">
        <Canvas rect={rect} circle={circle} />
      </div>
    </div>
  );
}

export default App;
