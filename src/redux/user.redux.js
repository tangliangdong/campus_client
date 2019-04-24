import axios from 'axios'
import { getRedirectPath } from '../utils'
const ERROR_MSG = "ERROR_MSG"
const LOAD_DATA = 'LOAD_DATA'
const LOAD_IDENTITY = 'LOAD_IDENTITY'
const LOAD_USER_LIST = 'LOAD_USER_LIST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const ADDRESS_DATA = 'ADDRESS_DATA'
const DORM_DATA = 'DORM_DATA'
const GRADE_DATA = 'GRADE_DATA'
const ORDER_DATA = 'ORDER_DATA'
const REGISTER_INFO = 'REGISTER_INFO'

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
      return {...state,logoutTo: '',msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload, msg: ''}
    case LOAD_IDENTITY:
      return {...state, person: action.payload}
    case LOAD_USER_LIST:
      return {...state, list: action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGOUT_SUCCESS:
      return {...initState, redirectTo: '/login'}
    case ADDRESS_DATA:
      return {...state, address: action.payload}
    case DORM_DATA:
      return {...state, dorms: action.payload}
    case GRADE_DATA:
      return {...state, grades: action.payload}
    case ORDER_DATA:
      return {...state, orderList: action.payload, msg: ''}
    case REGISTER_INFO:
      return {...state, register_data: action.payload}
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
function addressData(data){
  return {type: ADDRESS_DATA, payload: data}
}

function dormData(data){
  return {type: DORM_DATA, payload: data}
}

function orderData(data){
  return {type: ORDER_DATA, payload: data}
}

function gradeData(data){
  return {type: GRADE_DATA, payload: data}
}

function registerInfo(data){
  return {type: REGISTER_INFO, payload: data}
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

export function loadIdentity(userinfo){
  return {type: LOAD_IDENTITY, payload: userinfo}
}

export function loadUserList(userinfo){
  return {type: LOAD_USER_LIST, payload: userinfo}
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

// 注册
export function register({username, password, repassword, type}){
  // if(!username||!password){
  //   return errorMsg('用户名密码必须输入')
  // }
  return dispatch=>{
    axios.post('/user/register', {username, password})
      .then(res=>{
        if(res.status==200){
          dispatch(registerInfo(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 获取用户信息
export function getInfo(){
  // if(!username||!password){
  //   return errorMsg('用户名密码必须输入')
  // }
  return dispatch=>{
    axios.post('/user/info')
      .then(res=>{
        if(res.status==200){
          dispatch(loadData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 获取所有的用户信息
export function getUserList(){
  // if(!username||!password){
  //   return errorMsg('用户名密码必须输入')
  // }
  return dispatch=>{
    axios.get('/user/list')
      .then(res=>{
        if(res.status==200){
          dispatch(loadUserList(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 获取指定的用户信息
export function getUserById(id){
  // if(!username||!password){
  //   return errorMsg('用户名密码必须输入')
  // }
  return dispatch=>{
    axios.post('/user/getUserById', {id: id})
      .then(res=>{
        if(res.status==200){
          dispatch(loadIdentity(res.data))
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
        if(res.status===200){
          dispatch(logoutSuccess())
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

/**
 * 获取用户的地址列表
 * @return {[type]} [description]
 */
export function addressList(){
  return dispatch=>{
    axios.get('/user/address/list')
      .then(res=>{
        if(res.status===200){
          dispatch(addressData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function findOneAddress(id){
  return dispatch=>{
    axios.post('/user/address/find', {
      id: id
    })
    .then(res=>{
      if(res.status==200){
        dispatch(addressList())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 修改用户地址信息
export function setAddress(data){
  return dispatch=>{
    axios.post('/user/address/edit', {
      data: data
    })
    .then(res=>{
      if(res.status==200){
        dispatch(addressList())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 添加用户地址
export function add_address(data){
  return dispatch=>{
    axios.post('/user/address/add', {
      data: data
    })
    .then(res=>{
      if(res.status==200){
        dispatch(addressList())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 删除用户地址
export function delete_address(id){
  return dispatch=>{
    axios.post('/user/address/delete', {
      id: id
    })
    .then(res=>{
      if(res.status==200){
        dispatch(addressList())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 修改用户信息
export function editInfo(data){
  let _this = this
  return dispatch=>{
    axios.post('/user/info/edit', {
      data: data
    })
    .then(res=>{
      if(res.status==200){
        dispatch(getInfo())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 编辑用户
export function editUser(data){
  console.log(data);
  const _this = this;
  return dispatch=>{
    axios.post('/user/edit', {
      data: data
    })
    .then(res=>{
      if(res.status==200){
        // _this.getUserList()
        dispatch(getUserList())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 添加用户
export function addUser(data){
  return dispatch=>{
    axios.post('/user/add', {
      data: data
    })
    .then(res=>{
      if(res.status==200){
        dispatch(getUserList())
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}


// 获取用户下的订单列表
export function getUserOrder(){
  return dispatch=>{
    axios.get('/user/getUserOrderList')
    .then(res=>{
      if(res.status==200){
        dispatch(orderData(res.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function deleteUserOrder(id){
  return dispatch=>{
    axios.post('/order/delete', {id: id})
      .then(res=>{
        if(res.status==200){
          dispatch(errorMsg(res.data.msg))
          dispatch(getUserOrder())
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 获取宿舍楼列表
export function getDormList(){
  return dispatch=>{
    axios.get('/user/dorm/title')
    .then(res=>{
      if(res.status==200){
        dispatch(dormData(res.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 获取年级列表
export function getGradeList(){
  return dispatch=>{
    axios.get('/user/grade/title')
    .then(res=>{
      if(res.status==200){
        dispatch(gradeData(res.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
