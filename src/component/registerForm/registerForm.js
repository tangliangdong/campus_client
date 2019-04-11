import React from 'react'
import {
  Form, Icon, Input, Button, Checkbox, message,
} from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import './registerForm.css'
import Message from '../message/message'
const axios = require('axios');

@connect(
  state=>state.user,
  { register }
)
class RegisterForm extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.form.validateFields();
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) {
        console.log('Received values of form: ', data);
        if(data.password !== data.repassword){
          this.props.form.setFields({
              repassword: {
                value: '',
                errors: [new Error('两次输入的密码不同')],
              },
            });
        }else{
          this.props.register(data)
        }
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    let msg = []
    console.log(this.props);
    if(this.props.register_data){
      msg.push(<Message msg={this.props.register_data.msg} />)

      if(this.props.register_data.status===1){
        msg.push(<Redirect to='/login' />)
      }
    }

    return (
      <Form onSubmit={(e)=>this.handleSubmit(e)} className="register-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('repassword', {
            rules: [{ required: true, message: '请再次输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
          )}
        </Form.Item>
        <Form.Item>

          <Button type="primary" htmlType="submit" className="register-form-button" disabled={this.hasErrors(getFieldsError())}>
            注册
          </Button>
          <Button onClick={()=>this.props.history.goBack()} className="register-form-button"
          >
            返回
          </Button>
        </Form.Item>
        {msg}
      </Form>
    );
  }
}

export default RegisterForm
