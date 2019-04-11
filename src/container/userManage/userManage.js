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
  Form,
} from 'antd'

import { connect } from 'react-redux'
import { getUserList, getUserById, getGradeList, editUser, addUser } from '../../redux/user.redux'
import PersonForm from '../../component/personForm/personForm'

@connect(
  state => state.user,
  { getUserList, getUserById, getGradeList, editUser, addUser }
)
class UserManage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      editVisible: false,
      addVisible: false,
    }
    this.props.getUserList()
    this.props.getGradeList()


  }
  componentDidMount(){

  }

  showModal(obj, data){
    if(data!=undefined){
      this.props.getUserById(data._id)
    }
    this.setState({
      [obj]: true,
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

  // 添加用户
  add(data){

  }

  render(){
    const data = this.props.list
    const columns = [{
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '昵称',
      dataIndex: 'nikename',
      key: 'nikename',
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '简介',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
    }, {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => {
        return <div><a type="primary" onClick={()=>this.showModal('editVisible', record)}>edit</a></div>
      }
    }];
    const WrappedPersonForm = Form.create({ name: 'person' })(PersonForm);
    return (
      <div>
        <Table dataSource={data} columns={columns} />
        <Button onClick={()=>this.showModal('addVisible', null)}>新增</Button>
        <Modal
            title="编辑用户"
            visible={this.state.editVisible}
            onOk={()=>this.handleOk('editVisible')}
            onCancel={()=>this.handleCancel('editVisible')}
          >
            <WrappedPersonForm
              userinfo={this.props.person}
              edit={this.props.editUser}
              grades={this.props.grades}/>
          </Modal>

        <Modal
            title="添加用户"
            visible={this.state.addVisible}
            onOk={()=>this.handleOk('addVisible')}
            onCancel={()=>this.handleCancel('addVisible')}
          >
            <WrappedPersonForm
              add={this.props.addUser} grades={this.props.grades}/>
          </Modal>
      </div>

    )
  }
}
export default UserManage
