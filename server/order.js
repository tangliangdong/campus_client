const express = require('express')
const Router = express.Router()
const model = require('./model')
const Cart = model.getModel('cart')
const User = model.getModel('user')
const Goods = model.getModel('goods')
const Order = model.getModel('order_form')
const utils = require('utility')


Router.get('/list',function(req, res){
  Order.find()
    // .populate('goods_id') //加上这句话也就有了属性值,
    .populate('user_id')
    .exec(function(err, docs) {
        if(docs){
          return res.json(docs)
        }else{
          return res.json({code:0, msg: err})
        }
    });
})

Router.post('/add', function(req, res){
  let userId = '5c5690714ccc05f8639d2330'
  let timestamp = userId + '_' + new Date().getTime();
  let order = new Order({
    sequence: timestamp,
    user_id: userId,
    add_time: '2019-4-1',
    price: 1000,
    status: 0,
    address: '浙江省杭州市江干区华峰国际',
    goods: [{
      goods_id: '5c8f4db0a4810139f53d690a',
      price: 1000,
      name: "iphone Xs",
      desc: 'Hello world',
      num: 2
    },
    {
      goods_id: '5c8b8c9842c8988adab7f542',
      price: 2000,
      name: "《三日间的幸福",
      desc: '重生之门',
      num: 3,
    }]
  })
  order.save((err, doc)=>{
    if(!err){
      return res.json(doc)
    }else{
      return res.json(err)
    }
  })
})

// 删除订单
Router.post('/delete', function( req, res){
  const id = req.body.id;
  Order.deleteOne({_id: id}, function(err){
    if(err){
      return res.json({code: 0, msg: err})
    }else{
      return res.json({code: 1, msg: '订单删除成功'})
    }
  })
})



module.exports = Router
