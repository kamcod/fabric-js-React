import { Fragment, useEffect, useState } from "react";
import classes from "./RightPanel.module.css";

const RightPanel = (props) => {
  const [text, setText] = useState(props.text);
  const [width, setWidth] = useState(props.dimensions.width);
  const [height, setHeight] = useState(props.dimensions.height);
  const [radius, setRadius] = useState(props.dimensions.radius);
  const [fillColor, setFillColor] = useState();
  const [strokeColor, setStrokeColor] = useState();
  useEffect(()=>{
    setText(props.text);
  },[props.text]);
  useEffect(()=>{
    setWidth(props.dimensions.width);
    setHeight(props.dimensions.height);
    setRadius(props.dimensions.radius);
  },[props.dimensions]);

  const changeText = (event) => {
    const value = event.target.value;
     setText(value);
    props.changeText( value);
  };
  const changeFill = (event) =>{
    const value = event.target.value;
    setFillColor(value);
    props.changeFill(value);
  };
  const changeStroke = (event) =>{
    const value = event.target.value;
    setStrokeColor(value);
    props.changeStroke(value);
  };

  const changeWidth = (event) =>{
    setWidth(event.target.value);
  };
  const changeHeight = (event) =>{
    setHeight(event.target.value);
  };
  const changeRadius = (event) =>{
    setRadius(event.target.value);
  };
  const apply = (event) => {
    
    event.preventDefault();
    const dim = {
      width: width,
      height: height,
      radius: radius
    };
    props.changeDimensions(dim);
  };

  const clearCanvas = () =>{
    props.clearCanvas();
  };

  const download = () =>{
    console.log("downloading...");
    props.download();
  };
  return (
    <Fragment>
      <br/><br/>
      <button disabled={props.objects.length >0 ? false : true} className={classes.clearBtn} onClick={clearCanvas}>Clear Canvas</button> <br/>
      <h2>Properties</h2> <br/>
      <h3> Change Text</h3>
      <input type="text" value={props.objects.length >0 ? text: ''} onChange={changeText} />
      <h3>Change Color:</h3>
      <div className={classes.colorsGrid}>
        <label htmlFor="fill">Fill:</label>
        <input type="color" id="fill" value={fillColor} onChange={changeFill}></input> <br/> <br />
        <label htmlFor="fill">Stroke:</label>
        <input type="color" id="fill" value={strokeColor} onChange={changeStroke}></input>
      </div>
      <br/>
      <hr width="90%"></hr>
      <h3>Dimensions</h3>
      <form className={classes.dimensions} onSubmit={apply}>
        <b>width</b> <input type="number" value={props.objects.length >0 ? width: ''} onChange={changeWidth} /> <br /> <br/>
        <b>height</b> <input type="number" value={props.objects.length >0 ? height: ''} onChange={changeHeight} ></input> <br /> <br/>
        <b>radius</b> <input type="number" value={props.objects.length >0 ? radius: ''} onChange={changeRadius} ></input> <br /> <br/>
        <button type="submit">Apply</button>
        <br/><br/>
        <button className={classes.downloadBtn} type="button" onClick={download}>Download Canvas</button>
      </form>
    </Fragment>
  );
};

export default RightPanel;
