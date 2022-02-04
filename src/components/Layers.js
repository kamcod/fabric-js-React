import { Fragment } from "react";
import classes from './Layers.module.css';

const Layers = (props) => {
  return (
    <Fragment>
      {!props.data.length>0 && <h5>No Object Added Yet!</h5>}
      {props.data.length>0 && <h4><u>Object List</u></h4>}
      {props.data.map((obj) => (
        <div className={classes.content}>
          <p>
            <b>{obj.type}</b> <br/>
            <b>width:</b>{obj.width}
            <b>height:</b>{obj.height}
          </p>
        </div>
      ))}
    </Fragment>
  );
};

export default Layers;
