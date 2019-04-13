import React from 'react'
import {
  Row,
  Col,
  List,
  Button,
  Icon,
  Table,
  message,
  InputNumber
} from 'antd'
import { cartList, deleteCart, changeSum } from '../../redux/cart.redux'
import { connect } from 'react-redux'

@connect(
  state=>state,
  {cartList, deleteCart, changeSum}
)
class ShopCart extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedGoods: []
    }
  }
  componentWillReceiveProps(){

  }

  componentDidMount(){
    this.props.cartList()

  }
  // 结算按钮
  handleClick(){
    // const hide = message.loading('正在结算...', 0);
    if(this.state.selectedGoods!=undefined && this.state.selectedGoods.length > 0){

      this.props.history.push('/index/order')
    }else{
      message.warning('未选择商品')
    }


    // setTimeout(hide, 2500);
  }

  // 删除商品按钮
  handleDelete(){
    if(this.state.selectedGoods.length > 0){
      this.props.deleteCart(this.state.selectedGoods)
    }else{
      message.info('请选中购物车商品')
    }
  }

  // 购物车商品数量修改
  inputChange(id, e){
    console.log(id,e);
    this.props.changeSum(id, e)
    if(e===0){
      message.info("宝贝不能再减少了。。。")
    }

  }

  render(){
    const data = this.props.cart.cartList;
    let dataSource = [{
      key: '2',
      name: 'iphoneXs',
      price: 9999,
      num: 1,
      money: '9999'
    }];
    if(data!=undefined&&data!=null){
      dataSource = data;
    }
    for(let i = 0; i<dataSource.length; i++){
      if(dataSource[i].goods_id){
        dataSource[i].money = dataSource[i].sum*dataSource[i].goods_id.now_price;
      }
    }
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
      render: (text, record, index) => {
       return (
           <InputNumber defaultValue={record.sum} precision={0} step={1} min={1} onChange={(e)=>this.inputChange(record._id, e)} style={{width: 60}} />
      )}
    },{
      title: '金额',
      dataIndex: 'money',
      key: 'money',
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          selectedGoods: selectedRows
        })
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
              <img src={URL+"/img/iphone Xs.jpg"} alt="" width="100px" height="100px"/>
            </Col>
            <Col span={20}>
              <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
            </Col>

          </List.Item>
        </List>
        <Row>
          <Button onClick={()=>this.handleClick()} shape="round" type="primary" size="large">结算</Button>
          <Button onClick={()=>this.handleDelete()} shape="round" type="danger" size="large">删除</Button>
        </Row>

      </div>
    )
  }
}

export default ShopCart
