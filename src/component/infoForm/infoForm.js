import React from 'react'
import {
  Form, Icon, Input, Button, Select
} from 'antd';
import { connect } from 'react-redux'

const axios = require('axios');

const { Option } = Select;

class InfoForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      info: {
        username: '',
        nikename: '',
        phone: '',
        name: '',
        content: '',
      }
    }
    console.log(this.props);
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.editInfo2(values)
      }else{
        console.log(err);
      }
    });
  }

  delete(id){

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const user = this.props.userinfo
    let grade_list = []
    if(user.grades!==undefined&&user.grades!==null){
      user.grades.map((grade) => (
        grade_list.push(<Option value={grade.value}>{grade.value}</Option>)
      ))
    }
    return user!==undefined?(
      <Form onSubmit={e=>this.handleSubmit(e)} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {initialValue: user.username})(
            <Input disabled prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('nikename', {
            rules: [{ required: true, message: '输入昵称!' }],
            initialValue: user.nikename
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="昵称" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '输入手机号!' }],
            initialValue: user.phone
          })(
            <Input type="number"  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ message: '输入邮箱!' }],
            initialValue: user.email
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
          )}
        </Form.Item>
        <Form.Item
          label="年级"
        >
          {getFieldDecorator('grade', {
            rules: [
              { message: '选择年级!' },
            ],
            initialValue: user.grade
          })(
            <Select placeholder="年级">
              {grade_list}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('desc', {
            rules: [{ message: '输入简介!' }],
            initialValue: user.desc
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="这个人很懒，什么简介都没有" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            保存
          </Button>
        </Form.Item>
        <Button type="danger" onClick={()=>this.delete(user.id)}>删除</Button>
      </Form>
    ):''
  }

}

export default InfoForm
