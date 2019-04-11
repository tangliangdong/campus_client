import React from 'react'


class OrderInfo extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    const data = this.props.data
    console.log(data);
    return (
      <div>
        <p>订单号：</p>
        <p>价格：</p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    )
  }
}

export default OrderInfo
