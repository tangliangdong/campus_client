import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

@connect(
  state=>state.user
)
class AdminPage extends React.Component{

  render(){

    return (
      <div><h1>管理员界面 {this.props.username}</h1></div>
    )
  }
}

export default AdminPage
