const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/campus'
mongoose.connect(DB_URL)
const Schema = mongoose.Schema;

const models = {
  // 用户
  user: {
    'username': {type: String, require: true},
    'nikename': {type: String, require: true},
    'password': {type: String, require: true, select: false },
    'type': {type: String, require: true},
    'avatar': {type: String},
    'grade': {type: String, require: true},
    'phone': {type: Number, require: true},
    'email': {type: String},
    // 个人简介
    'desc': {type: String},
    "add_time": {type: String, require: true}
  },
  // 商品信息
  goods: {
    "name": {type: String, require: true},
    "former_price": {type: Number},
    "now_price": {type: Number, require: true},
    "desc": {type: String, require: true},
    "time": {type: String, require: true},
    "num": {type: Number, require: true},
    "img": {type: String, require: true},
    "content": {type: String, require: true},
    "category_id": {
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
  },
  // 商品照片表
  goods_img: {
    "goods_id": {
      type: Schema.Types.ObjectId,
      ref: 'goods'
    },
    "name": {type: String, require: true},
    "address": {type: String, require: true},
    "index": {type: Number, require: true},
  },
  // 购物车表
  cart: {
    "goods_id": {
      type: Schema.Types.ObjectId,
      ref: 'goods'
    },
    "user_id": {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    "sum": {type: Number, require: true},
    "add_time": {type: String, require: true}
  },
  // 订单表
  order_form: {
    "sequence": {type: String, require: true},
    "goods": [{
        "goods_id": {
          type: Schema.Types.ObjectId,
          ref: 'goods'
        },
        "price": {type: Number, require: true},
        "num": {type: Number, require: true},
        "name": {type: String, require: true},
        "desc": {type: String, require: true},
    }],
    "user_id": {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    "add_time": {type: String, require: true},
    "price": {type: Number, require: true},
    // 0:待付款, 1:待发货，2：完成订单
    "status": {type: Number, require: true},
    "address": {type: String, require: true},
    "phone": {type: String, require: true}
  },
  // 订单里的商品信息表
  // order_goods: {
  //   "order_form_id": {
  //     type: Schema.Types.ObjectId,
  //     ref: 'order_form'
  //   },
  //   "goods_id": {
  //     type: Schema.Types.ObjectId,
  //     ref: 'goods'
  //   },
  //   "price": {type: Number, require: true},
  //   "num": {type: Number, require: true},
  //   "name": {type: String, require: true},
  //   "desc": {type: String, require: true},
  // },
  // 商品类别表
  category: {
    "title": {type: String, require: true},
    "child": [{
        type: Schema.Types.ObjectId,
        ref: 'goods'
    }]
  },
  // 商品类别子类表
  // category_child: {
  //   title: {type: String, require: true},
  //   "pid": {
  //     type: Schema.Types.ObjectId,
  //     ref: 'category'
  //   },
  // },
  // 商品留言表
  comment: {
    "content": {type: String, require: true},
    "goods": {
      type: Schema.Types.ObjectId,
      ref: 'goods'
    },
    "user": {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    "add_time": {type: String, require: true}
  },
  address: {
    "dorm": {type: String, require: true},
    "content": {type: String, require: true},
    "name": {type: String, require: true},
    "phone": {type: String, require: true},
    "user_id": {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    "add_time": {type: String, require: true}
  },
  dictionary: {
    "type": {type: String, require: true},
    "key": {type: String, require: true},
    "value": {type: String, require: true}
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}
