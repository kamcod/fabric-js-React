import { Fragment, useState } from "react";
import classes from "./RightPanel.module.css";

const RightPanel = (props) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [radius, setRadius] = useState();
  const colorRed = () =>{
    props.colorRed();
  };
  const colorBlue = () =>{
    props.colorBlue();
  };
  const colorPink = () =>{
    props.colorPink();
  };
  const colorPurple = () =>{
    props.colorPurple();
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
      <h2>Properties</h2> <br/>
      <h3>Change Color:</h3>
      <div className={classes.colorsGrid}>
        <button onClick={colorRed}>red</button>
        <button onClick={colorBlue}>blue</button>
        <button onClick={colorPink}>pink</button>
        <button onClick={colorPurple}>purple</button>
      </div>
      <br/>
      <h3>Dimensions</h3>
      <form className={classes.dimensions} onSubmit={apply}>
        <b>width</b> <input type="number" value={width} onChange={changeWidth} /> <br /> <br/>
        <b>height</b> <input type="number" value={height} onChange={changeHeight} ></input> <br /> <br/>
        <b>radius</b> <input type="number" value={radius} onChange={changeRadius} ></input> <br /> <br/>
        <button type="submit">Apply</button>
      </form>
    </Fragment>
  );
};

export default RightPanel;
