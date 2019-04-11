import React from 'react'
import { Card } from 'antd'
import GoodsDetail from '../../container/goodsDetail/goodsDetail'
import { Link,Redirect,withRouter } from 'react-router-dom'
import './goodsCard.css';
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
          style={{ high: 240 }}
          cover={<img alt={data.name} src={URL+"/img/"+data.img} />}
          onClick={()=>{
            const data1 = JSON.stringify(data);
            this.props.history.push(`/index/detail/${data._id}`);
            // return this.props.router.push({
            // 	pathname: '/index/detail',
            // 	state: this.state
            // })
          }}
        >
          <Meta
            title={`${data.name} ${data.now_price}￥`}
            description={data.desc}
          />
        </Card>
      </div>
    ): ""
  }
}

export default withRouter(GoodsCard);
