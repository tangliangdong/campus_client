import React from 'react'
import {
  Carousel,

} from 'antd'
import './slideImg.css'


class SlideImg extends React.Component{

  onChange(a, b, c) {

  }

  render(){
    const imgs = this.props.imgs
    let listItems = "";
    if(imgs){
      listItems = imgs.map((img) =>
        <div key={img.toString()}><img width="100%" src={`${URL}/img/${img.address}`} /></div>
      );
    }

    return (<Carousel
      afterChange={this.onChange}
      autoplay="true">
      {listItems}
    </Carousel>)

  }
}

export default SlideImg
