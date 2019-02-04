import axios from 'axios'
import { getRedirectPath } from '../utils'
const ERROR_MSG = "ERROR_MSG"
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const initState = {
  redirectTo: '',
  msg: '',
  username: '',
  nikename: '',
  email: '',
  grade: 0,
  type: '',
  decs: '',
}

//reducers
export function user(state=initState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state, msg: '',logoutTo: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGOUT_SUCCESS:
      return {...initState, redirectTo: '/login'}
    default:
      return state
  }

}
function authSuccess(data){
  // const {password, ...data} = obj
  return {type: AUTH_SUCCESS, payload: data}
}
function errorMsg(msg){
  return { msg, type: ERROR_MSG}
}
function logoutSuccess(){
  return {type: LOGOUT_SUCCESS}
}

// export function update(data){
//   return dispatch=>{
//     axios.post('/user/update', data)
//       .then(res=>{
//         if(res.status == 200 && res.data.code ==0){
//           dispatch(authSuccess(res.data.data))
//         }else{
//           dispatch(errorMsg(res.data.msg))
//         }
//       })
//   }
// }


export function loadData(userinfo){
  return {type: LOAD_DATA, payload: userinfo}
}

export function login({username, password}){
  if(!username|| !password){
    return errorMsg('用户密码必须输入')
  }
  return dispatch=>{
    axios.post('/user/login', {username, password})
      .then(res=>{
        if(res.status === 200 && res.data.code === 1){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register({username, password, repeatpwd, type}){
  if(!username||!password||!type){
    return errorMsg('用户名密码必须输入')
  }
  if(password!==repeatpwd){
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
    axios.post('/user/register', {username, password, type })
      .then(res=>{
        if(res.status==200&&res.data.code==0){
          dispatch(authSuccess({username, password, type }))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

/**
 * 注销
 * @return {[type]} [description]
 */
export function logout(){
  return dispatch=>{
    axios.get('/user/logout')
      .then(res=>{
        if(res.status==200 && res.data.code==1){
          dispatch(logoutSuccess())
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
