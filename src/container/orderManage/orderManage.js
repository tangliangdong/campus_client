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
  message,
} from 'antd'

import { connect } from 'react-redux'
import { getOrderList, deleteOrder, changeOrderStatus } from '../../redux/order.redux'
import OrderInfo from '../../component/orderInfo/orderInfo'
import Message from '../../component/message/message'
import { transformOrderStatus } from '../../utils'

const confirm = Modal.confirm;

@connect(
  state => state,
  { getOrderList, deleteOrder, changeOrderStatus }
)
class OrderManage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      editVisible: false,
      modalContent: ''
    }
  }
  componentDidMount(){
    this.props.getOrderList()
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
        _this.props.deleteOrder(data._id)
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

  editStatus(status){
    const data = this.state.info

    // if(data.status== status){
    //   message.warning('状态未修改')
    //   return
    // }
    this.props.changeOrderStatus(data._id, status)
    this.setState({
      editVisible: false,
    });
  }


  render(){
    const data = this.props.order.orderList
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
      key: 'user_id.phone',
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
        return <div>
          <a type="danger" onClick={()=>this.showDeleteConfirm(record)}>delete</a>
          |<a type="primary" onClick={()=>this.showModal('editVisible', record)}>edit</a>
        </div>
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

    // let modalContent = <div>
    //   <Button></Button>
    //   <Button></Button>
    // </div>

    return (
      <div>
        <Message msg={this.props.order.msg} />

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

          <Modal
            title="修改订单状态"
            visible={this.state.editVisible}
            onOk={()=>this.handleOk('editVisible')}
            onCancel={()=>this.handleCancel('editVisible')}
          >
            <Button onClick={()=>this.editStatus(0)}>代付款</Button>
            <Button onClick={()=>this.editStatus(1)}>已发货</Button>
            <Button onClick={()=>this.editStatus(2)}>完成订单</Button>
          </Modal>



      </div>

    )
  }
}
export default OrderManage
