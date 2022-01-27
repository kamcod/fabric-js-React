import { Fragment } from "react";

const SideBar = (props) => {
  const addRect = () => {
    props.addRect();
  };
  const addCircle = () => {
    props.addCircle();
  };
  return(
    <Fragment>
      <h2>Sidebar</h2>
      <button onClick={addRect}>Add Rectangle</button> <br/> <br/>
      <button onClick={addCircle}>Add Circle</button>
    </Fragment>
  );
};

export default SideBar;