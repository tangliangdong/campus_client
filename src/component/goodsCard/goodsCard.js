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
    const data = this.props.data
    return data?(
      <div>
        <Card key={data._id}
          hoverable
          style={{ width: 240 }}
          cover={<img alt={data.name} src={require(`../../img/${data.img}`)} />}
          onClick={()=>{
            console.log(this.props);
            const data1 = JSON.stringify(data);
            console.log(`/index/detail/${data._id}`)
            this.props.history.push(`/index/detail/${data._id}`);
            // return this.props.router.push({
            // 	pathname: '/index/detail',
            // 	state: this.state
            // })
          }}
        >
          <Meta
            title={`商品名称${data.name} 商品价格${data.now_price}`}
            description={data.desc}
          />
        </Card>
      </div>
    ): <h2>无商品</h2>
  }
}

export default withRouter(GoodsCard);
