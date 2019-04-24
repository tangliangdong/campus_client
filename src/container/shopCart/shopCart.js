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
  Select,
} from 'antd'
import { cartList, deleteCart, changeSum, placeOrder } from '../../redux/cart.redux'
import { addressList } from '../../redux/user.redux'
import { connect } from 'react-redux'
import OrderForm from '../../component/orderForm/orderForm'

const Option = Select.Option;

@connect(
  state=>state,
  {cartList, deleteCart, changeSum, placeOrder, addressList}
)
class ShopCart extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedGoods: [],
      visible: false,
      sum_price: 0,
    }
  }
  componentWillReceiveProps(){

  }

  componentDidMount(){
    this.props.cartList()
    this.props.addressList()
  }

  showModal(){
    this.setState({
      visible: true,
    });
  }

  handleOk(){
    if(this.state.selectedAddr===undefined || this.state.selectedAddr === ''){
      message.warning("请选择地址")
      return;
    }
    this.props.placeOrder(this.state.selectedGoods, this.state.sum_price, this.state.selectedAddr)
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  // 结算按钮
  handleClick(){
    // const hide = message.loading('正在结算...', 0);
    if(this.state.selectedGoods!=undefined && this.state.selectedGoods.length > 0){
      this.showModal()
      // this.props.history.push('/index/order')
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
    let selectedRows = this.state.selectedGoods
    for(let i = 0; i< selectedRows.length; i++){
      if(selectedRows[i]._id === id){
        selectedRows[i].money = selectedRows[i].sum*selectedRows[i].goods_id.now_price
      }
    }
    this.setState({
      selectedGoods: selectedRows,
    })
  }

  changeSelectSum(selectedRows){
    let sum = 0;
    for(let i = 0; i< selectedRows.length; i++){
      if(selectedRows[i].goods_id){
        sum +=  selectedRows[i].money
      }
    }
    this.setState({
      selectedGoods: selectedRows,
      sum_price: sum
    })
  }


  selectChange(value){
    console.log(value);
    this.setState({
      selectedAddr: value
    })
  }

  render(){
    const data = this.props.cart.cartList
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
        dataSource[i].money = dataSource[i].sum*dataSource[i].goods_id.now_price
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
        this.changeSelectSum(selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const WrappedOrderForm = Form.create({ name: 'person' })(OrderForm);

    let address = []
    let addressList = this.props.user.address
    for (var index in addressList) {
      address.push(<Option value={addressList[index]._id}>{addressList[index].dorm + addressList[index].content+" "+addressList[index].name+" " + addressList[index].phone}</Option>)
    }

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
              <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns}/>
            </Col>

          </List.Item>
        </List>
        <Row>

          <Col span={6}> <h4>共计：{this.state.sum_price}</h4></Col>
          <Button onClick={()=>this.handleClick()} shape="round" type="primary" size="large">结算</Button>
          <Button onClick={()=>this.handleDelete()} shape="round" type="danger" size="large">删除</Button>
        </Row>
        <Modal
          title="确认订单"
          visible={this.state.visible}
          onOk={()=>this.handleOk()}
          onCancel={()=>this.handleCancel()}
        >
          <WrappedOrderForm data={this.state.selectedGoods} />
            <Select style={{ width: 300 }} onChange={(v)=>this.selectChange(v)}>
              {address}
            </Select>
          <p>总计：{this.state.sum_price}</p>
        </Modal>

      </div>
    )
  }
}

export default ShopCart
