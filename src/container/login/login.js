import React from 'react'
import './login.css'
import LoginForm from '../../component/loginForm/loginForm'
import { Form } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
@connect(
  state=> state.user
)
class Login extends React.Component{


  render(){
    const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
    return (
      <div>
        <h1 className="login-title">大学生二手交易平台</h1>
        <div className="login-frame">
          {this.props.redirectTo?<Redirect to={this.props.redirectTo} /> : null}
          <WrappedNormalLoginForm />
        </div>
      </div>
    )
  }
}

export default Login
