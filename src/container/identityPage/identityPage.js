import React from 'react'
import {
  Row,
  Col,
  Avatar,
  List,
  Button,
  Modal,
  Form,
} from 'antd'
import { connect } from 'react-redux'
import { transformGrade } from '../../utils'
import { logout, getGradeList, editInfo } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import InfoForm from '../../component/infoForm/infoForm'

@connect(
  state=>state.user,
  { logout, getGradeList, editInfo }
)
class IdentityPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      visible: false,
    }
    this.editInfoClick = this.editInfoClick.bind(this);
  }
  componentDidMount(){
    this.props.getGradeList()
  }

  showModal(){
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleLogout(e){
    // this.props.logout()
    browserCookie.erase('userid')
    this.props.logout()
    // this.props.history.push('/login')
  }

  // 编辑用户信息提交
  editInfoClick(data){
    this.props.editInfo(data)
  }

  render(){

    const data = [
      `账号：${this.props.username}`,
      `昵称：${this.props.nikename}`,
      `年级：${transformGrade(this.props.grade)}`,
      `邮箱：${this.props.email?this.props.email:'不详'}`,
      `个人简介：${this.props.desc?this.props.desc:'不详'}`,
    ];
    return this.props.username!=''?(
      <div>
        <div>
          <Row>
            <Col span={6}>
              <Avatar size={200} src={URL+"/avatar/avatar.jpg"} />
            </Col>
            <Col span={18}>
              <List
                header={<Row>
                  <Col span={12}><h3>个人信息</h3></Col>
                  <Col span={12}>
                    <Button onClick={()=>this.showModal()}>编辑信息</Button>
                    <Button onClick={()=>{this.props.history.push('/index/address')}}>编辑地址</Button>
                    <Button onClick={(e)=>this.handleLogout(e)}>注销</Button>
                  </Col> </Row>}
                bordered
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
              />
            </Col>
          </Row>
        </div>

        <Modal
            title="编辑信息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose="true"
          >
          <WrappedInfoForm userinfo={this.props} editInfo2={this.editInfoClick} />
        </Modal>
      </div>
    ):<Redirect to={this.props.redirectTo} />
  }
}

const WrappedInfoForm = Form.create({ name: 'normal_login' })(InfoForm);

export default IdentityPage
