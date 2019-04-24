import React from 'react'
import {
  Row,
  Col,
  List,
  Button,
  Icon,
  Table,
  message,
  InputNumber,
  Modal,
  Form,
} from 'antd'


class OrderForm extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    const data = this.props.data
    console.log(data);
    const columns = [{
      title: '商品信息',
      dataIndex: 'goods_id.name',
      key: 'name',
      render: (text, record, index) => {
        let content = "javascript:;";
        if(record.goods_id){
          content = `/index/detail/${record.goods_id._id}`;
        }
       return (
           <a href={content}>{text}</a>
      )}
    }, {
      title: '单价',
      dataIndex: 'goods_id.now_price',
      key: 'price',
    }, {
      title: '数量',
      dataIndex: 'sum',
      key: 'sum',
    },{
      title: '金额',
      dataIndex: 'money',
      key: 'money',
    }];

    return (
      <div>
        <Table dataSource={data} columns={columns} pagination={false}/>
      </div>
    )
  }
}

export default OrderForm
