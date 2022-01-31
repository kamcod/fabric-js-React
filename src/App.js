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

const changeColor = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(value);
  aObj.set('fill', value);
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
const addImage = () => {
   fabric.Image.fromURL('https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png', img => {
    img.scale(0.5).set('flipX', true);
    canvas.add(img);
  });
  canvas.renderAll();
};
const addImg = (url) => {
  console.log(url);
  fabric.Image.fromURL(url, img => {
    img.scale(0.5).set('flipX', true);
    canvas.add(img);
  });
  canvas.renderAll();
};

const clearCanvas =()=>{
  const objs = canvas.getObjects();
  objs.forEach(e => {
    canvas.remove(e);
  });
};
  return (
    <div className="App">
      <div className="leftpanel">
        <LeftPanel
        addRect={addRect}
        addCircle={addCircle}
        addTriangle={addTriangle}
        addImage={addImage}
        addImg={addImg}
        clearCanvas={clearCanvas}
        />
        
      </div>
      <div className="canvas-view">
        <Canvas />
      </div>
      <div className="rightpanel">
        <RightPanel
        changeColor={changeColor}
        changeDimensions={changeDimensions}
        />
      </div>
    </div>
  );
}

export default App;
