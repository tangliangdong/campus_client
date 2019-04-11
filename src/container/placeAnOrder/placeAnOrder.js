import React from 'react'
import { connect } from 'react-redux'
import { getUserOrder } from '../../redux/user.redux'
import {
  List,
  Button
} from 'antd';

@connect(
  state=>state.user,
  {getUserOrder}
)
class placeAnOrder extends React.Component{

  componentDidMount(){
    this.props.getUserOrder()
  }


  render(){
    const list = this.props.order
    return (
      <div>

      </div>
    )
  }
}

export default placeAnOrder
