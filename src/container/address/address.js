import React from 'react'
import { connect } from 'react-redux'
import { addressList, setAddress, getDormList, delete_address } from '../../redux/user.redux'
import {
  List,
  Avatar,
  Button,
  Modal,
  Select,
  Input,
  Row,
  Form,
  Icon,
  message,
} from 'antd';
import AddressForm from '../../component/addressForm/addressForm'

const Option = Select.Option;
const confirm = Modal.confirm;

@connect(
  state=>state.user,
  { addressList, setAddress, getDormList, delete_address}
)
class AddressPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      visible: false,
      addVisible: false,
      editAddress: {
        dorm: '',
        content: '',
        phone: '',
        name: '',
      },
      addAddress: {
        dorm: '',
        content: '',
        phone: '',
        name: '',
      }
    }
  }

  componentDidMount(){
    this.props.addressList()
    this.props.getDormList()
  }

  // 修改地址按钮
  editClick(obj){
    this.showModal()
    this.setState({
      editAddress: obj
    })
    // this.props.editAddress(id)
  }

  // 修改地址按钮
  deleteClick(obj){
    console.log(obj);
    let this1 = this;
    confirm({
      title: `确定删除改地址？`,
      content: <div>
      <p>地址：{obj.dorm+obj.content}</p>
      <p>收件人：{obj.name}</p>
      <p>手机号：{obj.phone}</p></div>,
      okType: 'danger',
      onOk() {
        this1.props.delete_address(obj._id)
        message.success('地址删除成功');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  createAddress(){
    this.showAddModal()
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.setAddress(this.state.editAddress)
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // 显示添加地址modal
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  }

  addHandleOk = (e) => {
    this.setState({
      addVisible: false,
    });
    this.props.setAddress(this.state.editAddress)
  }

  addHandleCancel = (e) => {
    this.setState({
      addVisible: false,
    });
  }

  // 宿舍选择框change事件
  dormSelectChange(e){
    this.setState({
      editAddress: Object.assign({}, this.state.editAddress, { dorm: e })
    })
  }

  modalChange(key, e){
    this.setState({
      editAddress: Object.assign({}, this.state.editAddress, { [key]: e.target.value })
    })
  }

  modalAddChange(key, e){
    this.setState({
      addAddress: Object.assign({}, this.state.addAddress, { [key]: e.target.value })
    })
  }

  render(){
    const list = this.props.address
    let dorm_list = []
    if(this.props.dorms!==undefined&&this.props.dorms!==null){
      this.props.dorms.map((dorm) => (
        dorm_list.push(<Option value={dorm.value}>{dorm.value}</Option>)
      ))
    }

    return (
      <div>
        <Row>
          <Button onClick={(e)=>this.createAddress()}>新增地址</Button>
        </Row>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[
                <Button onClick={()=>this.editClick(item)}>edit</Button>,
                <Button onClick={()=>this.deleteClick(item)} type="danger">delete</Button>
              ]}>
              <List.Item.Meta
                title={'地址：'+item.dorm+item.content}
                description={`收件人：${item.name}
                  手机号：${item.phone}`}
              />

            </List.Item>
          )}
        />

        <Modal
            title="编辑地址"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          宿舍楼：<Select value={this.state.editAddress.dorm} style={{ width: 120 }} onChange={(e)=>this.dormSelectChange(e)}>
            {dorm_list}
          </Select><br/>
          寝室号：<Input value={this.state.editAddress.content} onChange={e=>this.modalChange('content', e)} />
          收件人：<Input value={this.state.editAddress.name} onChange={(e)=>this.modalChange('name', e)}/>
          手机号：<Input value={this.state.editAddress.phone} onChange={(e)=>this.modalChange('phone', e)}/>
        </Modal>

        <Modal
            title="新增地址"
            visible={this.state.addVisible}
            onOk={this.addHandleOk}
            onCancel={this.addHandleCancel}
          >
          <WrappedNormalAddressForm dormList={this.props.dorms} />
        </Modal>
      </div>
    )
  }
}
const WrappedNormalAddressForm = Form.create({ name: 'address_add' })(AddressForm);
export default AddressPage
