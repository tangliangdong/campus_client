import React from 'react'
import GoodsCard from '../../component/goodsCard/goodsCard'
import {
  Row,
  Col,
} from 'antd'
import iphoneXs from '../../img/iphone Xs.jpg'
import { connect } from 'react-redux'
import { getGoodsList } from '../../redux/goods.redux'
import './goodsPage.css'
@connect(
  state => state,
  {getGoodsList}
)
class GoodsPage extends React.Component{

  componentWillMount(){
    this.props.getGoodsList()

  }
  render(){
    const data = {
      name: "iphone Xs",
      former_price: 9999,
      now_price: 8888,
      desc: "九成新、外观完好",
      time: 1548997077,
      img: iphoneXs
    }
    console.log(this.props.goods)
    console.log(this.props.goods.goodsList[0])
    const list = this.props.goods.goodsList
    const content = list.map(item=>
      <GoodsCard data={item} />
    )
    return (
      <div className="goods-card-container">
        {content}


      </div>
    )
  }
}
export default GoodsPage
