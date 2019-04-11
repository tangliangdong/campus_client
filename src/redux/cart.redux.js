import axios from 'axios'

const ERROR_MSG = "ERROR_MSG"
const CART_LIST = 'CART_LIST'

const initState = {
}

export function cart(state=initState, action){
  switch(action.type){
    case CART_LIST:
      return {...state, cartList: action.payload}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    default:
      return state
  }
}

function errorMsg(msg){
  return { msg, type: ERROR_MSG}
}


function loadGoodsData(cart){
  return {type: CART_LIST, payload: cart}
}

export function cartList(){
  return dispatch=>{
    axios.get(`/cart/list`)
      .then(res=>{
        if(res.status==200){
          dispatch(loadGoodsData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function deleteCart(carts){
  let where = '';
  for (let item in carts) {
    where += carts[item]._id+','
  }
  where = where.substring(0, where.length-1)
  return dispatch=>{
    axios.post(`/cart/delete`, {
      ids: where
    })
      .then(res=>{
        if(res.status==200){
          this.cartList()
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function changeSum(id, sum){
  return dispatch=>{
    axios.post(`/cart/change_sum`, {
      id: id,
      sum: sum
    })
      .then(res=>{
        if(res.status==200){
          this.cartList()
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
