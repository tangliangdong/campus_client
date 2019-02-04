import React from 'react'
import {
  Row,
  Col,
  Carousel,
  List,
  Button,
} from 'antd'
import './goodsDetail.css'
import { connect } from 'react-redux'
import { transformTime } from '../../utils.js'
import { findOneGoods } from '../../redux/goods.redux'
import SlideImg from '../../component/slideImg/slideImg'
import img1 from '../../img/iphone Xs.jpg'
import img2 from '../../img/iphone Xs1.jpg'
import img3 from '../../img/iphone Xs2.jpg'
import img4 from '../../img/iphone Xs3.jpg'
import img5 from '../../img/iphone Xs4.jpg'

@connect(
  state=>state,
  {findOneGoods}
)
class GoodsDetail extends React.Component{

  componentWillMount(){
    const id = this.props.match.params.id
    this.props.findOneGoods(id)
  }

  render(){
    const data = this.props.goods
    // const data = {
    //   id: 201902021548997077,
    //   name: 'Apple/苹果 iPhone Xs Max',
    //   former_price: 10999,
    //   now_price: 9999,
    //   time: transformTime(1548997077000),
    //   desc: '256G 移动联通电信全网通4G手机 双卡双待苹果Xsmax',
    //   num: 1,
    //   img: [img1,img2,img3,img4,img5],
    // }
// <SlideImg imgs={data.img}/>
    return (
      <div>
        <div>
          <Row>
            <Col span={6}>

            </Col>
            <Col span={18} >
              <List className="detail-list">
                <List.Item>{data.name}</List.Item>
                <List.Item><s>原价：{data.former_price}￥</s></List.Item>
                <List.Item>现价：{data.now_price}￥</List.Item>
                <List.Item>上架日期：{transformTime(data.time)}</List.Item>
                <List.Item>商品简介：{data.desc}</List.Item>
                <List.Item>
                  <Row>
                    <Button shape="round" icon="shopping-cart" size="large" type="primary">加入购物车</Button>
                  </Row>

                </List.Item>
              </List>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default GoodsDetail
