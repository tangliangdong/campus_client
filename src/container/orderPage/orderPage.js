import React from 'react'
import {
  Row,
  Col,
  Icon,
  Button,
  Menu,
  Input,
  InputNumber,
  Table,
  Modal,
  Tag,
} from 'antd'

import { connect } from 'react-redux'
import { getUserOrder, deleteUserOrder } from '../../redux/user.redux'
import OrderInfo from '../../component/orderInfo/orderInfo'
import Message from '../../component/message/message'
import { transformOrderStatus } from '../../utils'

const confirm = Modal.confirm;

@connect(
  state => state,
  { getUserOrder, deleteUserOrder }
)
class OrderPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      deleteVisible: false,
    }
  }
  componentDidMount(){
    this.props.getUserOrder()
  }

  showDeleteConfirm(data) {
    const _this = this;
    confirm({
      title: 'Are you sure delete this Order?',
      content: <p>订单号：{data.sequence}</p>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        _this.props.deleteUserOrder(data._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  showModal(obj, data){
    console.log(data);
    this.setState({
      [obj]: true,
      info: data
    });
  }

 handleOk(obj){
   this.setState({
     [obj]: false,
   });
 }

 handleCancel(obj){
   this.setState({
     [obj]: false,
   });
 }


  render(){
    const data = this.props.user.orderList
    const columns = [{
      title: '订单号',
      dataIndex: 'sequence',
      key: 'sequence',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '添加时间',
      dataIndex: 'add_time',
      key: 'add_time',
    }, {
      title: '用户名',
      dataIndex: 'user_id.username',
      key: 'user_id.username',
    }, {
      title: '联系电话',
      dataIndex: 'user_id.phone',
      key: 'phone',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => {
        const obj = transformOrderStatus(record.status.toString());

        return <Tag color={obj.theme}>{obj.status}</Tag>
      }
    }, {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => {
        return <div><a type="primary" onClick={()=>this.showDeleteConfirm(record)}>delete</a></div>
      }
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

    const expandedColumns = [
      {
        title: '商品名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      }, {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
      }, {
        title: '简介',
        dataIndex: 'desc',
        key: 'desc',
      }
    ]

    let messageModal = this.props.order.msg? <Message msg={this.props.order.msg} />: null

    return (
      <div>
        <Message msg={this.props.user.msg} />

        <Table rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          expandedRowRender={(record)=>{
            console.log(record);

            return (
              <Table columns={expandedColumns}
                pagination={false}
                dataSource={record.goods}></Table>
            )
          }}/>

      </div>

    )
  }
}
export default OrderPage
