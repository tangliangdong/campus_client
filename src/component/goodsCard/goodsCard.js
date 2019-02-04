import React from 'react'
import { Card } from 'antd'
import GoodsDetail from '../../container/goodsDetail/goodsDetail'
import { Link,Redirect,withRouter } from 'react-router-dom'
// 现价、原价、名称、描述

class GoodsCard extends React.Component{

  constructor(props){
    super(props)

  }
  render(){
    const { Meta } = Card;
    let data = this.props.data
    let content = []
    for(let i in data){
      console.log(data[i]);
      content.push(<Card key={data[i]._id}
        hoverable
        style={{ width: 240 }}
        cover={<img alt={data[i].name} src={`${data[i].img}`} />}
        onClick={()=>{
          console.log(this.props);
          this.props.history.push("/index/detail");
          // return this.props.router.push({
          // 	pathname: '/index/detail',
          // 	state: this.state
          // })
        }}
      >
        <Meta
          title={`商品名称${data[i].name} 商品价格${data[i].now_price}`}
          description={data[i].desc}
        />
      </Card>)
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default withRouter(GoodsCard);
