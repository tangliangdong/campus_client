import axios from 'axios'

const ERROR_MSG = "ERROR_MSG"
const ORDER_LIST = "ORDER_LIST"
const ORDER_SUCCESS_MSG = 'ORDER_SUCCESS_MSG'
const initState = {
  msg: '',
}

export function order(state=initState, action){
  switch(action.type){
    case ORDER_LIST:
      return {...state, orderList: action.payload, msg: ''}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    case ORDER_SUCCESS_MSG:
      return {...state, msg: action.msg}
    default:
      return state
  }
}

function errorMsg(msg){
  return { msg, type: ERROR_MSG}
}
function orderSuccessMsg(msg){
  return { msg, type: ORDER_SUCCESS_MSG}
}

function loadData(order){
  return {type: ORDER_LIST, payload: order}
}

export function getOrderList(){
  return dispatch=>{
    axios.get('/order/list')
      .then(res=>{
        if(res.status==200){
          console.log(res.data);
          dispatch(loadData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function deleteOrder(id){
  return dispatch=>{
    axios.post('/order/delete', {id: id})
      .then(res=>{
        if(res.status==200){
          dispatch(orderSuccessMsg(res.data.msg))
          dispatch(getOrderList())
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function changeOrderStatus(id, status){
  return dispatch=>{
    axios.post('/order/changeStatus', {id: id, status: status})
      .then(res=>{
        if(res.status==200){
          dispatch(orderSuccessMsg(res.data.msg))
          dispatch(getOrderList())
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
