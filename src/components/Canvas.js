import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const Canvas = (props) => {
  const [canvas, setCanvas] = useState('');
 
  useEffect(() => {
    setCanvas(initCanvas('canvas'));
  }, []);
  // useEffect(() => {
  //   setRect(props.rect);
  //   setCircle(props.circle);
  // }, [props.rect, props.circle]);

  useEffect(() => {
    if(props.rect === true){
      const addRect = (canvas) =>{
        const rect = new fabric.Rect({
          width: 100,
          height: 80,
          fill: 'green'
        });
        canvas.add(rect);
        canvas.renderAll();
        
      };
      addRect(canvas);
    }

    
    if(props.circle === true){
      const addCircle = (canvas) =>{
        const circle = new fabric.Circle({
          radius: 50,
          fill: 'yellow'
        });
        canvas.add(circle);
        canvas.renderAll();
        ;
      };
      addCircle(canvas);
      
    }
    
  }, [canvas, props.rect, props.circle]);

  const initCanvas = (id) => (
    new fabric.Canvas(id, {
      height: 500,
      width: 500,
      backgroundColor: '#897ebd'
    })
  );
  

  return(
    <div>
      <h1>Drawing Canvas</h1>
      {/* <button onClick={()=> addRect(canvas)}>Rectangle</button>
      <button onClick={()=> addCircle(canvas)}>Circle</button> */}
      <canvas id="canvas" />
    </div>
  );
}

export default Canvas;