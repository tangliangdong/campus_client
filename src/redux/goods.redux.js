import axios from 'axios'
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const ERROR_MSG = "ERROR_MSG"
const GOOD_LIST = 'GOOD_LIST'
const ONE_GOODS = 'ONE_GOODS'
const SUCCESS_MSG = 'SUCCESS_MSG'
const TITLE_LIST = 'TITLE_LIST'
const COMMENT_LIST = 'COMMENT_LIST'
const initState = {
}

export function goods(state=initState, action){
  switch(action.type){
    case GOOD_LIST:
      return {...state, goodsList: action.payload, cart_msg:null, msg: null}
    case ONE_GOODS:
      return {...state, ...action.payload, cart_msg:null}
    case ERROR_MSG:
      return {...state, msg: action.msg, cart_msg:null}
    case SUCCESS_MSG:
      return {...state, cart_msg: action.msg, msg: null}
    case TITLE_LIST:
      return {...state, category: action.payload}
    case COMMENT_LIST:
      return {...state, comments: action.payload}
    default:
      return state
  }
}


function errorMsg(msg){
  return { msg, type: ERROR_MSG}
}

function successMsg(msg){
  console.log('goods delete');
  return { msg, type: SUCCESS_MSG}
}

function oneGoods(goods){
  return {type: ONE_GOODS, payload: goods}
}

function loadGoodsData(goods){
  return {type: GOOD_LIST, payload: goods}
}

function loadTitleData(category){
  return {type: TITLE_LIST, payload: category}
}

function loadCommentData(comments){
  return {type: COMMENT_LIST, payload: comments}
}

/**
 * 根据搜索条件、排序条件显示商品列表
 * @return {[type]} [description]
 */
export function getGoodsList(type, low, high, category, name){

  let where = "";
  where += (type?"condition="+type+"&":'')
  where += (low?"low="+low+"&":'')
  where += (high?"high="+high+"&":'')
  where += (category?"category="+category+"&":'')
  where += (name?"name="+name:'')
  console.log(where);
  return dispatch=>{
    axios.get('/goods/list?'+where)
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

// 编辑商品信息
export function editGoods(data){
  return dispatch=>{
    axios.post(`/goods/edit`, data)
      .then(res=>{
        if(res.status==200&&res.data.code==1){
          this.getGoodsList(1)
          dispatch(successMsg(res.data.msg))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 新增商品
export function addGoods(data){
  console.log(data);
  let fileList = data.upload
  console.log(fileList);
  fileList.forEach(imgItem => {
    if (imgItem && imgItem.status == 'done' && imgItem.response) {
      imgItem.thumbUrl = imgItem.response.img_url;
      console.log(imgItem.response.imgUrl);
    }
  });
  console.log(data);

  return dispatch=>{
    axios.post(`/goods/add`, data)
      .then(res=>{
        if(res.status==200&&res.data.code==1){
          this.getGoodsList(1)
          dispatch(successMsg(res.data.msg))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 删除商品
export function deleteGoods(id){
  return dispatch=>{
    axios.post(`/goods/delete`, {id: id})
      .then(res=>{
        if(res.status==200&&res.data.code==1){
          this.getGoodsList(1)
          dispatch(successMsg(res.data.msg))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function multiDeleteGoods(ids){
  return dispatch=>{
    axios.post('/goods/multiDelete', {ids: ids})
      .then(res=>{
        if(res.status==200&&res.data.code==1){
          this.getGoodsList(1)
          dispatch(successMsg(res.data.msg))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 上传商品图片商品
// export function uploadFirstImg(data){
//   return dispatch=>{
//     axios.post(`/goods/add_first_img`, {data: data})
//       .then(res=>{
//         if(res.status==200&&res.data.code==1){
//           console.log('上传成功');
//           dispatch(successMsg(res.data.msg))
//         }else{
//           dispatch(errorMsg(res.data.msg))
//         }
//       })
//   }
// }



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

// 获取商品种类列表
export function getCategoryList(){
  return dispatch=>{
    axios.get('/category/list')
    .then(function (res) {
      if(res.status==200){
        dispatch(loadTitleData(res.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

// 新增商品种类
export function addCategory(data){
  const _this = this
  return dispatch=>{
    axios.post('/category/add', data)
    .then(function (res) {
      if(res.status==200){
        _this.getCategoryList()
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

// 删除商品种类
export function deleteCategory(id){
  const _this = this
  return dispatch=>{
    axios.post('/category/delete', {id: id})
    .then(function (res) {
      if(res.status==200){
        _this.getCategoryList()
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

// 根据商品id 获取商品评论
export function getComment(id){
  return dispatch=>{
    axios.get('/comment/list?id='+id)
    .then(function (res) {
      if(res.status==200){
        dispatch(loadCommentData(res.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

// 添加商品评论
export function uploadComment(content, goodsId){
  const _this = this
  return dispatch=>{

    axios.post('/comment/add',{
      content: content,
      goods_id: goodsId
    })
    .then(function (res) {
      if(res.status==200){
        _this.getComment(res.data.id)
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
