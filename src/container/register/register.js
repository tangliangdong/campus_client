import React from 'react'
// import './login.css'
import RegisterForm from '../../component/registerForm/registerForm'
import { Form } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './register.css'

@connect(
  state=> state.user
)
class Login extends React.Component{


  render(){
    const WrappedNormalRegisterForm = Form.create({ name: 'normal_login' })(RegisterForm);
    return (
      <div>
        <h1 className="register-title">大学生二手交易平台</h1>
        <div className="register-frame">
          <WrappedNormalRegisterForm history={this.props.history}/>
        </div>
      </div>
    )
  }
}

export default Login
