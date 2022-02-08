import { Fragment} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classes from "./Layers.module.css";

const Layers = (props) => {
  const updateContent = (result) =>{
    props.updateContent(result);
  };
  return (
    <Fragment>
      {!props.data.length > 0 && <h5>No Object Added Yet!</h5>}
      {props.data.length > 0 && (
        <h4>
          <u>Object List</u>
        </h4>
      )}

      <DragDropContext onDragEnd={updateContent}>
        <Droppable droppableId="content">
          {(provided) => (
            <ul className={classes.content} {...provided.droppableProps} ref={provided.innerRef}>
              {props.data.map((obj, index) => (
                <Draggable key={obj.id} draggableId={obj.id} index={index}>
                  {(provided) =>(
                    <li className={classes.draggableItems} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <b>{obj.type}</b> <br />
                    <b>width:</b>
                    {obj.width} {""}
                    <b>height:</b>
                    {obj.height}
                  </li>
                  )}
                </Draggable>
                
                ))}
                {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

export default Layers;
