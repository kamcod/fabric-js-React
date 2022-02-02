import "./App.css";
import Canvas from "./components/Canvas";
import { fabric } from "fabric";

import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const [canvas, setCanvas] = useState('');
  const [text, setText] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [objs, setObjs] = useState([]);
 
  useEffect(() => {
    const tempCanvas = initCanvas('canvas');
    if(tempCanvas){
      setCanvas(tempCanvas);
      // tempCanvas.on('selection:created', function(event) {
      //   console.log("selection created");
      //   event.target.set('fill', 'red');
      //   tempCanvas.renderAll();
      // });
      tempCanvas.on('object:added', function() {
        console.log("new object added");
        // objs.push(1);
        setObjs([1,...objs]);
        console.log(objs.length);
        console.log("push happened");
      });
    }
    
  }, []);

  const initCanvas = (id) => { 
    return new fabric.Canvas(id, {
    height: 500,
    width: 800,
    backgroundColor: '#897ebd'
  });
}

////////// left panel controls ///////////////
  const addRect = () => {
    console.log(objs);
    console.log("add rect")
      const rect = new fabric.Rect({
        width: 100,
        height: 80,
        fill: 'green'
      });
      rect.on('selected', ()=>{
        rect.set('stroke', 'black');
        rect.set('strokeWidth', 2);
      });
      rect.on('deselected', ()=>{
        rect.set('stroke', '');
      });
      const dim = {width: rect.width, height: rect.height, radius: ''};
      setDimensions(dim);
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
      circle.on('selected', ()=>{
        circle.set('stroke', 'black');
        circle.set('strokeWidth', 2);
      });
      circle.on('deselected', ()=>{
        circle.set('stroke', '');
      });
      const dim = {height: '', width: '', radius: circle.radius};
      setDimensions(dim);
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
      tri.on('selected', ()=>{
        tri.set('stroke', 'black');
        tri.set('strokeWidth', 2);
      });
      tri.on('deselected', ()=>{
        tri.set('stroke', '');
      });
      const dim = {width: tri.width, height: tri.height, radius: ''};
      setDimensions(dim);
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
  setDimensions(value);
  canvas.renderAll();
}
const addImage = () => {
   fabric.Image.fromURL('https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png', img => {
    img.scale(0.5).set('flipX', true);
    img.on('selected', ()=>{
      img.set('stroke', 'black');
      img.set('strokeWidth', 4);
    });
    img.on('deselected', ()=>{
      img.set('stroke', '');
    });
    canvas.add(img);
  });
  canvas.renderAll();
};
const addImg = (url) => {
  fabric.Image.fromURL(url, img => {
    img.scale(0.5).set('flipX', true);
    canvas.add(img);
    img.on('selected', ()=>{
      img.set('stroke', 'black');
      img.set('strokeWidth', 4);
    });
    img.on('deselected', ()=>{
      img.set('stroke', '');
    });
    canvas.setActiveObject(img);
  });
  canvas.renderAll();
};

const addText = () => {
  const text = new fabric.Text('Hello World', {top: 150, left: 150});
  text.on('selected', ()=>{
    setText(text.text);
  })
  canvas.add(text);
  canvas.setActiveObject(text);
  setText(text);
  const dim = {width: text.width, height: text.height, radius: ''};
  setDimensions(dim);
  
  canvas.renderAll();
};
const changeText = (value) => {
  const activeText = canvas.getActiveObject();
  activeText.text = value;
  setText(text);
canvas.renderAll();
};

const addSvg = (url) => {
  fabric.loadSVGFromURL(url, (objects, option) => {
    const obj = fabric.util.groupSVGElements(objects, option);
    obj.scale(0.5);
   canvas.add(obj);
   canvas.renderAll();

});
};

const clearCanvas =()=>{
  const objects = canvas.getObjects();
  objects.forEach(e => {
    canvas.remove(e);
  });
  setObjs([]);
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
        addText={addText}
        addSvg={addSvg}
        />
        
      </div>
      <div className="canvas-view">
        <Canvas />
      </div>
      <div className="rightpanel">
        <RightPanel
        canvas={canvas}
        changeColor={changeColor}
        changeDimensions={changeDimensions}
        dimensions = {dimensions}
        text={text.text}
        changeText={changeText}
        clearCanvas={clearCanvas}
        objects={objs}
        />
      </div>
    </div>
  );
}

export default App;
