import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
  state=>state.user,
  {loadData}
)
class AuthRouter extends React.Component{
  componentWillMount(){
    let pathName = this.props.location.pathname
    if(pathName.indexOf('/admin')!=-1 && this.props.type != '1'){
      this.props.history.push('/login')
    }
  }

  componentDidMount(){
    const publicList = ['login','register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    // 获取用户信息
    axios.get('/user/info')
      .then(res=>{
        if(res.status === 200){
          if( res.data.code == 1){
            // 有登录信息
            this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
          }
        }
      })

  }


  render(){
    return null
  }
}

export default AuthRouter
