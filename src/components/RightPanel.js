import { Fragment, useEffect, useState } from "react";
import classes from "./RightPanel.module.css";

const RightPanel = (props) => {
  const [text, setText] = useState(props.text);
  const [width, setWidth] = useState(props.dimensions.width);
  const [height, setHeight] = useState(props.dimensions.height);
  const [radius, setRadius] = useState(props.dimensions.radius);
  const [fillColor, setFillColor] = useState();
  const [strokeColor, setStrokeColor] = useState();
  const [strokeSize, setStrokeSize] = useState();
  useEffect(()=>{
    setText(props.text);
  },[props.text]);
  useEffect(()=>{
    setWidth(props.dimensions.width);
    setHeight(props.dimensions.height);
    setRadius(props.dimensions.radius);
  },[props.dimensions]);

  const changeFontFamily = (event) =>{
    const value= event.target.value;
    props.changeFontFamily( value);
  };
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
  const changeStrokeSize = (event) =>{
    const value = event.target.value;
    setStrokeSize(value);
    props.changeStrokeSize(value);
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

  return (
    <Fragment>
      <h3> Change Text</h3>
      <input type="text" value={props.objects.length >0 ? text: ''} onChange={changeText} />
      <br/><br/>
      <label htmlFor="family"><b>Font Family</b> </label>
      <select id="family" onChange={changeFontFamily} className={classes.dropWidth}>
        <option value="Times New Roman"> Times New Roman</option>
        <option value="sans-serif"> sans-serif</option>
        <option value="'Supermercado One', cursive"> 'Supermercado One', cursive</option>
        <option value="Quintessential"> Quintessential</option>
      </select>
      <br/><br/>
      <div className={classes.colorsGrid}>
        <label htmlFor="fill"><b>Fill:</b> </label>
        <input type="color" id="fill" value={fillColor} onChange={changeFill}></input> <br/> <br />
        <label htmlFor="stroke"><b>Stroke:</b> </label>
        <input type="color" id="stroke" value={strokeColor} onChange={changeStroke}></input>  <br/> <br />
        <label htmlFor="sSize"><b>Stroke Size:</b> </label>
        <input type="number" className={classes.stroke} id="sSize" value={strokeSize} onChange={changeStrokeSize}></input>

      </div>
      <br/>
      <hr width="90%"></hr>
      <h3>Dimensions</h3>
      <form className={classes.dimensions} onSubmit={apply}>
        <b>width</b> <input type="number" value={props.objects.length >0 ? width: ''} onChange={changeWidth} /> <br /> <br/>
        <b>height</b> <input type="number" value={props.objects.length >0 ? height: ''} onChange={changeHeight} ></input> <br /> <br/>
        <b>radius</b> <input type="number" value={props.objects.length >0 ? radius: ''} onChange={changeRadius} ></input> <br /> <br/>
        <button type="submit">Apply</button>
        
      </form>
    </Fragment>
  );
};

export default RightPanel;
