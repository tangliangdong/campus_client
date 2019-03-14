import React from 'react'
import { Message } from 'antd'
import GoodsDetail from '../../container/goodsDetail/goodsDetail'
import { Link,Redirect,withRouter } from 'react-router-dom'

class AlertList extends React.Component{

  componentDidMount(){
    Message.info(this.props.msg)
  }
  render(){

    return ""
  }
}

export default AlertList
