
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
  const svgImages = [
    {name: 'instagram', url: 'http://localhost:3000/insta.svg'},
    {name: 'react', url: 'http://localhost:3000/react.svg'}
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
  const addText = () => {
    props.addText();
  };
  const addImg = (url) =>{
    props.addImg(url);
  };
  const addSvg = (url) =>{
    props.addSvg(url);
  };

  ///////
  
  
  
  return(
    <Fragment>
      <h2>Sidebar</h2>
      <h4><u>Add Shapes</u></h4>
      <button onClick={addRect}>Add Rectangle</button>
      <button onClick={addCircle}>Add Circle</button> 
      <button onClick={addTriangle}>Add Triangle</button>
      <button onClick={addImage}>Add Image</button>
      <br/><br/>
      <button onClick={addText} >Add Text</button>
      <h4><u>Add images from list</u></h4>
      <ul className={classes.imgList}>
      {images.map(item => {
        return (<li onClick={()=> addImg(item.url)}>{item.name}</li> );
      })}
      </ul>
      <h4><u>Add SVG images from list</u></h4>
      <ul className={classes.imgList}>
      {svgImages.map(item => {
        return (<li onClick={()=> addSvg(item.url)}>{item.name}</li> );
      })}
      </ul>
      <br/> <br/>
    </Fragment>
  );
};

export default LeftPanel;