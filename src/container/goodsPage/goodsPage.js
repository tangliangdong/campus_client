import React from 'react'
import GoodsCard from '../../component/goodsCard/goodsCard'

import iphoneXs from '../../img/iphone Xs.jpg'
import { connect } from 'react-redux'
import { getGoodsList } from '../../redux/goods.redux'

@connect(
  state => state,
  {getGoodsList}
)
class GoodsPage extends React.Component{

  componentWillMount(){
    this.props.getGoodsList()

  }
  render(){
    console.log(this.props)
    const data = {
      name: "iphone Xs",
      former_price: 9999,
      now_price: 8888,
      desc: "九成新、外观完好",
      time: 1548997077,
      img: iphoneXs
    }

    return (
      <div>
        <GoodsCard data={this.props.goods} />
      </div>
    )
  }
}
export default GoodsPage
