import { Fragment } from "react";

const LeftPanel = (props) => {
  const addRect = () => {
    props.addRect();
  };
  const addCircle = () => {
    props.addCircle();
  };
  const addTriangle = () => {
    props.addTriangle();
  };
  
  return(
    <Fragment>
      <h2>Sidebar</h2>
      <button onClick={addRect}>Add Rectangle</button> <br/> <br/>
      <button onClick={addCircle}>Add Circle</button> <br/> <br/>
      <button onClick={addTriangle}>Add Triangle</button> <br/> <br/>
    </Fragment>
  );
};

export default LeftPanel;