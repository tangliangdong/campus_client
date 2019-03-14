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

  componentDidMount(){
    this.props.getGoodsList()
  }

  componentWillReceiveProps(){

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
    const list = this.props.goods.goodsList
    let content = "";
    if(list){
      content = list.map(item=>
        <GoodsCard data={item} />
      )
    }

    return (
      <div className="goods-card-container">
        {content}

      </div>
    )
  }
}
export default GoodsPage
