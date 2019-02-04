import axios from 'axios'

const ERROR_MSG = "ERROR_MSG"
const LOAD_DATA = 'LOAD_DATA'

const initState1 = [{
  name: '',
  num: 0,
}]

export function goods(state=initState1, action){
  switch(action.type){
    case LOAD_DATA:
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

function loadGoodsData(goods){
  return {type: LOAD_DATA, payload: goods}
}

export function getGoodsList(){
  return dispatch=>{
    axios.get('/goods/list')
      .then(res=>{
        if(res.status==200){
          console.log(res.data);
          dispatch(loadGoodsData(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
