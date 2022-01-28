import "./App.css";
import Canvas from "./components/Canvas";
import { fabric } from "fabric";

import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas('canvas'));
  }, []);
  const initCanvas = (id) => { 
    return new fabric.Canvas(id, {
    height: 500,
    width: 500,
    backgroundColor: '#897ebd'
  });
}
////////// left panel controls ///////////////
  const addRect = () => {

    console.log("add rect")
      const rect = new fabric.Rect({
        width: 100,
        height: 80,
        fill: 'green'
      });
      canvas.add(rect);
      canvas.renderAll();
 
 
  };

  const addCircle = () => {
      const circle = new fabric.Circle({
        radius: 50,
        fill: 'yellow',
        left: 120,
         top: 120
      });
      canvas.add(circle);
      canvas.renderAll();
  };
  const addTriangle = () => {
      const tri = new fabric.Triangle({
        width: 40,
        height: 55,
        fill: 'blue',
        left: 70, 
        top: 70
      });
      canvas.add(tri);
      canvas.renderAll();
  };

  //////////////// Right Panel Controls //////////

const colorRed = () => {
  const aObj = canvas.getActiveObject();
  aObj.set('fill', 'red');
  canvas.renderAll();
};
const colorBlue = () => {
  const aObj = canvas.getActiveObject();
  aObj.set('fill', 'blue');
  canvas.renderAll();
};
const colorPink = () => {
  const aObj = canvas.getActiveObject();
  aObj.set('fill', 'pink');
  canvas.renderAll();
};
const colorPurple = () => {
  const aObj = canvas.getActiveObject();
  console.log(aObj);
  aObj.set('fill', 'purple');
  canvas.renderAll();
};
const changeDimensions = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(typeof value);
  console.log(value.width);
  aObj.set('width', parseFloat(value.width));
  if(value.height){aObj.set('height', parseFloat(value.height));}
  if(value.radius){aObj.set('radius', parseFloat(value.radius));}
  canvas.renderAll();
}
  return (
    <div className="App">
      <div className="leftpanel">
        <LeftPanel addRect={addRect} addCircle={addCircle} addTriangle={addTriangle}/>
        
      </div>
      <div className="canvas-view">
        <Canvas />
      </div>
      <div className="rightpanel">
        <RightPanel 
        colorRed={colorRed}
        colorBlue={colorBlue}
        colorPink={colorPink}
        colorPurple={colorPurple}
        changeDimensions={changeDimensions}
        />
      </div>
    </div>
  );
}

export default App;
