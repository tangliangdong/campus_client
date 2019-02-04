const express = require('express')
const Router = express.Router()
const model = require('./model')
const Goods = model.getModel('goods')
const utils = require('utility')


Router.get('/list', function(req, res){
  // User.remove({},function(e, d){})
  Goods.find({}, function(err, doc){
    return res.json(doc)
  })
})

// 根据id查找 商品
Router.get('/find', function(req, res){
  // User.remove({},function(e, d){})
  console.log(req.query);
  Goods.findById(req.query.id, function(err, doc){
    return res.json(doc)
  })
})

Router.get('/add', function(req, res){
  // User.remove({},function(e, d){})
  Goods.create({
    name: 'iphone XR',
    former_price: 6999,
    now_price: 5999,
    desc: "来和 Liquid视网膜显示屏见个面。iPhone XR上的全新显示屏，是一款尤为先进的LCD屏。创新的背光设计，让显示屏一直延伸到了机身边角。因此看上去，整个屏幕都被鲜活生动的色彩铺满。",
    time: 15912312321312,
    img: 'iphone XR.jpg',
    num: 2,
  },function(err,doc){
    if(!err){
      console.log(doc);
    }else{
      console.log(err);
    }
  })
})



module.exports = Router
