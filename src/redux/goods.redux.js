import axios from 'axios'

const ERROR_MSG = "ERROR_MSG"
const GOOD_LIST = 'GOOD_LIST'
const ONE_GOODS = 'ONE_GOODS'
const initState = {
}

export function goods(state=initState, action){
  switch(action.type){
    case GOOD_LIST:
      return {...state, goodsList: action.payload}
    case ONE_GOODS:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, ...action.payload}
    default:
      return state
  }
}


function errorMsg(msg){
  return { msg, type: ERROR_MSG}
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
          console.log(res.data);
          dispatch(oneGoods(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
