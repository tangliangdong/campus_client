import axios from 'axios'
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const ERROR_MSG = "ERROR_MSG"
const GOOD_LIST = 'GOOD_LIST'
const ONE_GOODS = 'ONE_GOODS'
const SUCCESS_MSG = 'SUCCESS_MSG'
const initState = {
}

export function goods(state=initState, action){
  switch(action.type){
    case GOOD_LIST:
      return {...state, goodsList: action.payload, cart_msg:null}
    case ONE_GOODS:
      return {...state, ...action.payload, cart_msg:null}
    case ERROR_MSG:
      return {...state, msg: action.msg, cart_msg:null}
    case SUCCESS_MSG:
      return {...state, cart_msg: action.msg}
    default:
      return state
  }
}


function errorMsg(msg){
  return { msg, type: ERROR_MSG}
}

function successMsg(msg){
  return { msg, type: SUCCESS_MSG}
}

function oneGoods(goods){
  return {type: ONE_GOODS, payload: goods}
}

function loadGoodsData(goods){
  return {type: GOOD_LIST, payload: goods}
}

/**
 * 显示商品列表
 * @return {[type]} [description]
 */
export function getGoodsList(){
  return dispatch=>{
    axios.get('/goods/list')
      .then(res=>{
        if(res.status==200){
          dispatch(loadGoodsData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 根据Id查找商品
export function findOneGoods(id){
  return dispatch=>{
    axios.get(`/goods/find?id=${id}`)
      .then(res=>{
        if(res.status==200){
          dispatch(oneGoods(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 用户添加购物车
export function addChat(id, user_id){
  return dispatch=>{
    axios.post('/cart/add', {
      goodsId: id,
      userId: user_id
    })
    .then(function (res) {
      if(res.status==200){
        dispatch(successMsg(res.data.msg))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function cartList(userId){
  console.log(this);
  return dispatch=>{
    axios.get(`/cart/list?userId=${userId}`)
      .then(res=>{
        if(res.status==200){
          dispatch(loadGoodsData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
