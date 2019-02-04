import React from 'react'
import {
  Carousel,

} from 'antd'
import './slideImg.css'


class SlideImg extends React.Component{

  onChange(a, b, c) {
    console.log(a, b, c);
  }

  render(){
    const imgs = this.props.imgs
    const listItems = imgs.map((img) =>
      <div key={img.toString()}><img width="100%" src={img.toString()} /></div>
    );
    return (<Carousel
      afterChange={this.onChange}
      autoplay="true">
      {listItems}
    </Carousel>)

  }
}

export default SlideImg
