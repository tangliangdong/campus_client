
export function transformTime(timestamp){
  let date = new Date(timestamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y+M+D+h+m+s;
}

export function getRedirectPath({type, avatar}){
  // 根据用户信息 返回跳转地址
  // user.type  /boss / genius
  console.log(type);
  let url = (type === '1')?'/admin': '/index'
  // if(!avatar){
  //   url += 'info'
  // }
  return url
}

export function transformGrade(grade){
  let str = '不详'
  switch (parseInt(grade)) {
    case 1:
      str = '大一'
      break;
    case 2:
      str = '大二'
      break;
    case 3:
      str = '大三'
      break;
    case 4:
      str = '大四'
      break;
    default:
      str = '不详'
      break;
  }
  return str;

}

export function transformOrderStatus(status){
  let obj = {
    status: '待定',
    theme: 'red'
  };
  switch (status) {
    case "0":
      obj.status = '待付款'
      obj.theme = 'orange'
      break;
    case "1":
      obj.status = '待发货'
      obj.theme = 'green'
      break;
    case "2":
      obj.status = '订单完成'
      obj.theme = 'blue'
      break;
  }
  return obj
}
