import { Fragment } from "react";
import classes from './LeftPanel.module.css';

const LeftPanel = (props) => {
  const images = [
    {name: 'iphone', url: 'https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png'},
    {name: 'Laptop', url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07951388.png'},
    {name: 'Ferrari', url: 'https://s.abcnews.com/images/Technology/Ferrari_SF90_Stradale-ht-ps-1910621_hpMain_2_16x9_992.jpg'},
    {name: 'Yahama', url: 'https://global.yamaha-motor.com/business/img/pic_001.jpg'},
    {name: 'BMW X5', url: 'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/X5ModelImage.jpg&w=730&h=484&q=75&c=1'}
  ];
  const addRect = () => {
    props.addRect();
  };
  const addCircle = () => {
    props.addCircle();
  };
  const addTriangle = () => {
    props.addTriangle();
  };
  const addImage = () => {
    props.addImage();
  };
  const clearCanvas = () => {
    props.clearCanvas();
  };
  const addImg = (url) =>{
    console.log(url);
    props.addImg(url);
  };
  
  return(
    <Fragment>
      <h2>Sidebar</h2>
      <button onClick={addRect}>Add Rectangle</button> <br/> <br/>
      <button onClick={addCircle}>Add Circle</button> <br/> <br/>
      <button onClick={addTriangle}>Add Triangle</button> <br/> <br/>
      <button onClick={addImage}>Add Image</button> <br/> <br/>
      <h4>Add Images</h4>
      <ul className={classes.imgList}>
      {images.map(item => {
        return (<li onClick={()=> addImg(item.url)}>{item.name}</li> );
      })}
      </ul>


      <br/> <br/><br/> <br/>
      <button className={classes.clearBtn} onClick={clearCanvas}>Clear Canvas</button> <br/> <br/>
    </Fragment>
  );
};

export default LeftPanel;