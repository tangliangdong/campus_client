import React from 'react'
import {
  message,
} from 'antd'

class Message extends React.Component{

  componentDidUpdate(){
    const msg = this.props.msg
    if(msg!=undefined&&msg!==''){
      message.info(this.props.msg)
    }
    console.log('message start');
  }

  render(){

    return null
  }
}

export default Message
