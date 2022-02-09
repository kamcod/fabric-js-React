import classes from "./App.module.css";
// import json from './json.json';
import WebFont from "webfontloader";
import Canvas from "./components/Canvas";
import { fabric } from "fabric";

import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Layers from "./components/Layers";

function App() {
  const [canvas, setCanvas] = useState('');
  const [text, setText] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [objs, setObjs] = useState([]);
  const [objData, setObjData] = useState([]);
  const [layerPressed, setLayerPressed] = useState(true);
  const [propPressed, setPropPressed] = useState(false);
 
  // useEffect(()=>{
  //   WebFont.load({
  //     google: {
  //       families: ['Droid Sans', 'Chilanka', 'sans-serif', 'Supermercado One', 'Festive']
  //     }
  //   });
  // },[]);
  useEffect(() => {
    const tempCanvas = initCanvas('canvas');
    if(tempCanvas){
      
      
    //   console.log(json);
    //   tempCanvas.loadFromJSON(json, function() {
    //     tempCanvas.renderAll();
    //     setObjs([1,...objs]);
    //  },function(o, object){ 
       
    //    if(object.type ==='triangle' || object.type ==='rect' || object.type ==='circle'){
    //     object.set('fill', 'red');
    //    }
    //     }); 
    setCanvas(tempCanvas);
      tempCanvas.on('object:added', function(o) {
        console.log("new object added");
        o.target.setControlsVisibility({
          bl: true,
          br: true,
          mb: false,
          ml: false,
          mr: false,
          mt: false,
          tl: true,
          tr: true,
          mtr: true,
        });

        
        setObjs([o.target,...objs]);
        
      });
      /////// custom control
      var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

      var img = document.createElement('img');
      img.src = deleteIcon;
    console.log("control obj");
    console.log(fabric.Object.prototype.controls);
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = 'blue';
      fabric.Object.prototype.cornerStyle = 'circle';
            fabric.Object.prototype.controls.deleteControl = new fabric.Control({
              x: 0.5,
              y: -0.5,
              offsetY: 16,
              cursorStyle: 'pointer',
              mouseUpHandler: deleteObject,
              render: renderIcon,
              cornerSize: 24
            });
            // fabric.Object.prototype.controls.mtr = new fabric.Control({
            //   x: 0,
            //   y: -1,
            //   offsetY: 0,
            //   cursorStyle: 'pointer',
            //   // actionHandler: rotateObj,
            //   render: renderIcon1,
            //   cornerSize: 24
            // });
            // function rotateObj (evenData, transform, x, y){
            //   var target = transform.target;
            //   var canvas = target.canvas;
            //   canvas.rotate();
            // }
            function deleteObject(eventData, transform) {
              var target = transform.target;
              var canvas = target.canvas;
                  canvas.remove(target);
                  canvas.requestRenderAll();
            }
          
            function renderIcon(ctx, left, top, styleOverride, fabricObject) {
              var size = this.cornerSize;
              ctx.save();
              ctx.translate(left, top);
              ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
              ctx.drawImage(img, -size/2, -size/2, size, size);
              ctx.restore();
            }
            // function renderIcon1(ctx, left, top, styleOverride, fabricObject) {
            //   var size = this.cornerSize;
            //   ctx.save();
            //   ctx.translate(left, top);
            //   ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            //   ctx.drawImage(img, -size/2, -size/2, size, size);
            //   ctx.restore();
            // }
            ////////////////////////////////////////
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
const layerActive = () =>{
  setLayerPressed(true);
  setPropPressed(false);
};
const propActive = () =>{
  setPropPressed(true);
  setLayerPressed(false);
};
const toggleDraw = (value) =>{
  console.log('drawing mode' + value);
  console.log(typeof value)
  canvas.isDrawingMode = value;
    canvas.renderAll();
};
  const addRect = () => {
    console.log("add rect")
      const rect = new fabric.Rect({
        width: 100,
        height: 80,
        fill: 'green',
        id: Date().toString()
      });
      rect.on('selected', ()=>{
        rect.set('stroke', 'black');
        rect.set('strokeWidth', 2);
        const dim = {width: rect.width, height: rect.height, radius: ''};
      setDimensions(dim);
      });
      rect.on('deselected', ()=>{
        rect.set('stroke', '');
        setDimensions({width: '', height: '', radius: ''});
      });
      canvas.add(rect);

      console.log(canvas);
      const data = {
        id: rect.id,
        type: 'rectangle',
        width: rect.width,
        height: rect.height
      };
      setObjData([data, ...objData]);
      canvas.renderAll();
 
 
  };

  const addCircle = () => {
      const circle = new fabric.Circle({
        radius: 50,
        fill: 'yellow',
        left: 120,
         top: 120,
         padding: 10,
         id: Date().toString()
         //lockSkewingX: true
      });
      circle.on('selected', ()=>{
        circle.set('stroke', 'black');
        circle.set('strokeWidth', 2);
        const dim = {height: '', width: '', radius: circle.radius};
      setDimensions(dim);
      });
      circle.on('deselected', ()=>{
        circle.set('stroke', '');
        const dim = {height: '', width: '', radius: ''};
      setDimensions(dim);
      });
      
      canvas.add(circle);
      const data = {
        id: circle.id,
        type: 'circle',
        width: circle.width,
        height: circle.height
      };
//////////////////////////////// Bounding Rect //////////////
        var setCoords = circle.setCoords.bind(circle);
        circle.on({
          moving: setCoords,
          scaling: setCoords,
          rotating: setCoords
        });
        canvas.on('after:render', function() {
          canvas.contextContainer.strokeStyle = '#555';
      
          // canvas.forEachObject(function(obj) {
          
            var bound = circle.getBoundingRect();
      
            canvas.contextContainer.strokeRect(
              bound.left + 0.5,
              bound.top + 0.5,
              bound.width,
              bound.height
            );
          })
        //});
        /////////////////
      setObjData([data, ...objData]);
      canvas.renderAll();
  };
  const addTriangle = () => {
      const tri = new fabric.Triangle({
        width: 40,
        height: 55,
        fill: 'blue',
        left: 70, 
        top: 70,
        id: Date().toString()
      });
      tri.on('selected', ()=>{
        tri.set('stroke', 'black');
        tri.set('strokeWidth', 2);
        const dim = {width: tri.width, height: tri.height, radius: ''};
      setDimensions(dim);
      });
      tri.on('deselected', ()=>{
        tri.set('stroke', '');
        const dim = {width: '', height: '', radius: ''};
      setDimensions(dim);
      });
      canvas.add(tri);
      const data = {
        id: tri.id,
        type: 'triangle',
        width: tri.width,
        height: tri.height
      };
      setObjData([data, ...objData]);
      canvas.renderAll();
  };

  //////////////// Right Panel Controls //////////
const changeFontFamily = (font) =>{
  const aObj = canvas.getActiveObject();
  if(aObj.type === 'textbox' || aObj.type === 'text'){
    WebFont.load({
      google: {
        families: [font]
      }
    });
      aObj.set("fontFamily", font);
          canvas.requestRenderAll();
  }
};
const changeFill = (value) => {
  const aObj = canvas.getActiveObject();
  if(aObj.type === 'textbox'){
    console.log(aObj);
    // const a= aObj.selectionStart;
    // const b= aObj.selectionEnd;
    aObj.setSelectionStyles({fill: value});
    canvas.renderAll();
    return;
  }
  aObj.set('fill', value);
  canvas.renderAll();
};
const changeStroke = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(value);
  aObj.set('stroke', value);
  canvas.renderAll();
};
const changeStrokeSize = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(value);
  aObj.set('strokeWidth', parseFloat(value));
  canvas.renderAll();
};
const changeDimensions = (value) => {
  const aObj = canvas.getActiveObject();
  aObj.set('width', parseFloat(value.width).toFixed(2));
  if(value.height){aObj.set('height', parseFloat(value.height).toFixed(2));}
  if(value.radius){aObj.set('radius', parseFloat(value.radius).toFixed(2));}
  setDimensions(value);
  canvas.renderAll();
}
const addImage = () => {
   fabric.Image.fromURL('https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png', img => {
    img.scale(0.5).set('flipX', true);
    img.on('selected', ()=>{
      img.set('stroke', 'black');
      img.set('strokeWidth', 4);
      const dim = {width: img.width, height: img.height, radius: ''};
      setDimensions(dim);
    });
    img.on('deselected', ()=>{
      img.set('stroke', '');
      const dim = {width: '', height: '', radius: ''};
      setDimensions(dim);
    });
    img.set('id',Date().toString());
    canvas.add(img);
    const data = {
      id: img.id,
      type: 'image',
      width: img.width,
      height: img.height
    };
    setObjData([data, ...objData]);
  });
  canvas.renderAll();
};
const addImg = (url) => {
  fabric.Image.fromURL(url, function (img){
    img.scale(0.5).set('flipX', true);
    img.set('id',Date().toString());
    canvas.add(img);
    img.on('selected', ()=>{
      img.set('stroke', 'black');
      img.set('strokeWidth', 4);
      const dim = {width: img.width, height: img.height, radius: ''};
      setDimensions(dim);
    });
    img.on('deselected', ()=>{
      img.set('stroke', '');
      const dim = {width: '', height: '', radius: ''};
      setDimensions(dim);
    });
    canvas.setActiveObject(img);
    const data = {
      id: img.id,
      type: 'image',
      width: img.width,
      height: img.height
    };
    setObjData([data, ...objData]);
  });
  canvas.renderAll();
};

const addText = () => {
  const text = new fabric.Text('Hello World', {
    top: 150,
    left: 150
  });
  text.on('selected', ()=>{
    setText(text.text);
  });
  text.set('id',Date().toString());
  canvas.add(text);
  console.log(text);
  const data = {
    id: text.id,
    type: 'text',
    width: parseFloat(text.width).toFixed(2),
    height: parseFloat(text.height).toFixed(2)
  };
  setObjData([data, ...objData]);
  canvas.setActiveObject(text);
  setText(text);
  const dim = {width: text.width, height: text.height, radius: ''};
  setDimensions(dim);
  
  canvas.renderAll();
};
const addTextBox = () =>{
  const textBox = new fabric.Textbox('This is fabric object', {
    top: 150,
    left: 150,
    width: 250,
    height: 50,
    id: Date().toString()
  });
  
  canvas.add(textBox);
  console.log(textBox);
  const data = {
    id: textBox.id,
    type: 'text',
    width: parseFloat(textBox.width).toFixed(2),
    height: parseFloat(textBox.height).toFixed(2)
  };
  setObjData([data, ...objData]);
  canvas.setActiveObject(textBox);
  const dim = {width: textBox.width, height: textBox.height, radius: ''};
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
    obj.set('id',Date().toString());
   canvas.add(obj);
   const data = {
    id: obj.id,
    type: 'svg',
    width: obj.width,
    height: obj.height
  };
  setObjData([data, ...objData]);
   canvas.renderAll();

});
};

const clearCanvas =()=>{
  const objects = canvas.getObjects();
  objects.forEach(e => {
    canvas.remove(e);
  });
  setObjs([]);
  setObjData([]);
};

const download = () => {
const url = canvas.toDataURL();
console.log(url);
const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const updateContent = (result) =>{
  const items = Array.from(objData);
  //canvas.sendBackwards(canvas._objects.filter(i => i.id===objData[result.source.index]));
  const sourceId = objData[result.source.index].id;
const [reorderedItem] = items.splice(result.source.index, 1);
items.splice(result.destination.index, 0, reorderedItem);
setObjData(items);
const myObject = canvas._objects.filter(e => e.id === sourceId);
const num = result.destination.index - result.source.index;
if(num > 0){
  for(let i=0; i <num; i++){
    canvas.sendBackwards(myObject[0]);
  }
}
else if(num < 0){
  for(let i=num; i <0; i++){
    canvas.bringForward(myObject[0]);
  }
}
canvas.renderAll();


}


const test =() =>{
  console.log(objData);
};
  return (
    <div className={classes.App}>
      {/* <button onClick={test}>Check</button> */}
      <div className={classes.leftpanel}>
        <LeftPanel
        addRect={addRect}
        addCircle={addCircle}
        addTriangle={addTriangle}
        addImage={addImage}
        addImg={addImg}
        addText={addText}
        addTextBox={addTextBox}
        addSvg={addSvg}
        toggleDraw={toggleDraw}
        />
        
      </div>
      <div className={classes.canvasView}>
        <Canvas />
      </div>
      <div className={classes.rightpanel}>
      <br/>
      <button disabled={objs.length >0 ? false : true} className={classes.clearBtn} onClick={clearCanvas}>Clear Canvas</button> <br/>
      <br/> <br/>
      <div className={classes.tabs}>
        <button className={layerPressed ? classes.active : ''} onClick={layerActive}>Layer</button>
        <button className={propPressed ? classes.active : ''} onClick={propActive}>Properties</button>
      </div>
        {layerPressed && <Layers
        data = {objData}
        updateContent={updateContent}
        />}
        { propPressed && <RightPanel
        canvas={canvas}
        changeFontFamily={changeFontFamily}
        changeFill={changeFill}
        changeStroke={changeStroke}
        changeStrokeSize={changeStrokeSize}
        changeDimensions={changeDimensions}
        dimensions = {dimensions}
        text={text.text}
        changeText={changeText}
        objects={objs}
        download={download}
        />}
        <br/><br/>
        <button className={classes.downloadBtn} type="button" onClick={download}>Download Canvas</button>
      </div>
    </div>
  );
}

export default App;
