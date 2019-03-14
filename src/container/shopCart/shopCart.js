import React from 'react'
import {
  Row,
  Col,
  List,
  Button,
  Icon,
  Table,
  message,
} from 'antd'
import iphoneXs from '../../img/iphone Xs.jpg'
import {cartList} from '../../redux/goods.redux'
import { connect } from 'react-redux'

@connect(
  state=>state,
  {cartList}
)
class ShopCart extends React.Component{

  componentWillReceiveProps(){
    console.log(this.props);

  }
  componentDidMount(){
    this.props.cartList(this.props.user._id)
  }
  handleClick(){
    console.log(this);
    const hide = message.loading('正在结算...', 0);
  // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  }

  render(){

    const dataSource = [{
      key: '2',
      name: 'iphoneXs',
      price: 9999,
      num: 1,
      money: '9999'
    }];

    const columns = [{
      title: '商品信息',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },{
      title: '金额',
      dataIndex: 'money',
      key: 'money',
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div>
        <Row>
          <h1>购物车</h1>
        </Row>

        <List>
          <List.Item>
              <Col span={4}>
                <img src={iphoneXs} alt="" width="100px" height="100px"/>
              </Col>
              <Col span={20}>
                <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
              </Col>

          </List.Item>
          <List.Item></List.Item>
        </List>
        <Row>
          <Button onClick={()=>this.handleClick()} shape="round" type="danger" size="large">结算</Button>
        </Row>

      </div>
    )
  }
}

export default ShopCart
