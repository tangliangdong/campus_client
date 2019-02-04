import React from 'react'
import img from '../../img/avatar.jpg'
import {
  Row,
  Col,
  Avatar,
  List,
  Button,
} from 'antd'
import { connect } from 'react-redux'
import { transformGrade } from '../../utils'
import { logout } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
@connect(
  state=>state.user,
  {logout}
)
class IdentityPage extends React.Component{

  handleLogout(e){
    // this.props.logout()
    browserCookie.erase('userid')
    this.props.logout()
  }
  render(){
    const data = [
      `账号：${this.props.username}`,
      `昵称：${this.props.nikename}`,
      `年级：${transformGrade(this.props.grade)}`,
      `邮箱：${this.props.email}`,
      `个人简介：${this.props.desc}`,
    ];
    console.log(this.props)
    return this.props?(
      <div>
        <div>
          <Row>
            <Col span={6}>
              <Avatar size={200} src={img} />
            </Col>
            <Col span={18}>
              <List
                header={<Row>
                  <Col span={12}><h3>个人信息</h3></Col>
                  <Col span={12}>
                    <Button>编辑信息</Button>
                    <Button>编辑地址</Button>
                    <Button onClick={(e)=>this.handleLogout(e)}>注销</Button>
                  </Col> </Row>}
                bordered
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
              />
            </Col>
          </Row>

        </div>
      </div>
    ):<Redirect to={this.props.redirectTo} />
  }
}

export default IdentityPage
