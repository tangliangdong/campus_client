import React from 'react'
import {
  Row,
  Col,
  Carousel,
  List,
  Button,
  Message,
} from 'antd'
import './goodsDetail.css'
import { connect } from 'react-redux'
import { transformTime } from '../../utils.js'
import { findOneGoods,addChat } from '../../redux/goods.redux'
import SlideImg from '../../component/slideImg/slideImg'
import AlertList from '../../component/alertList/alertList'


@connect(
  state=>state,
  {findOneGoods,addChat}
)
class GoodsDetail extends React.Component{

  componentDidMount(){
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

    // const img_div = (data==null?:"")
    // console.log(img_div);
    console.log(URL);
    console.log(`${URL}/img/${data.img}`);
    console.log(data);
    // <img src={`${URL}/img/${data.img}`} width="100%"/>
    return (
      <div>
        {this.props.goods.cart_msg?<AlertList msg={this.props.goods.cart_msg}></AlertList>:null}

        <div>
          <Row>
            <Col span={6}>
              <SlideImg imgs={data.imgs}/>
            </Col>
            <Col span={18}>
              <List className="detail-list">
                <List.Item>{data.name}</List.Item>
                <List.Item><s>原价：{data.former_price}￥</s></List.Item>
                <List.Item>现价：{data.now_price}￥</List.Item>
                <List.Item>上架日期：{transformTime(data.time)}</List.Item>
                <List.Item>商品简介：{data.desc}</List.Item>
                <List.Item>
                  <Row>
                    <Button onClick={(e)=>this.handleAddChat(data._id,e)} shape="round" icon="shopping-cart" size="large" type="primary">加入购物车</Button>
                  </Row>

                </List.Item>
              </List>
            </Col>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{
             __html: "<p><span style='color: rgb(255, 0, 0);'><em><strong>1111</strong></em><em><strong><img src='http://localhost:9093/img/iphone Xs.jpg' title='xxxx.jpg' alt='1.jpg'/></strong></em></span></p>"
             }}/>
          </Row>
        </div>
      </div>
    )
  }

  handleAddChat(id, e){
    const user_id = this.props.user._id;
    this.props.addChat(id,user_id)
  }
}

export default GoodsDetail
