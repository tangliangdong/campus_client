import React from 'react'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {login} from '../../redux/user.redux'
import './loginForm.css'
const axios = require('axios');

@connect(
  state=>state.user,
  {login}
)
class LoginForm extends React.Component{
  constructor(props){
    super(props)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login(values)
        // axios.post('/user/login', {
        //   data: values,
        // })
        // .then(function (res) {
        //   console.log(res);
        //   if(res.status === 200 && res.data.code===1){
        //
        //   }
        // })
        // .catch(function (err) {
        //   console.log(err);
        // });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm
