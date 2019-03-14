const express = require('express')
const Router = express.Router()
const model = require('./model')
const Goods = model.getModel('goods')
const utils = require('utility')
const GoodsImg = model.getModel('goods_img')

Router.get('/list', function(req, res){
  // User.remove({},function(e, d){})
  Goods.find({}, function(err, doc){
    return res.json(doc)
  })
})

// 根据id查找 商品
Router.get('/find', function(req, res){
  // User.remove({},function(e, d){})
  Goods.findById(req.query.id).lean().exec(function(err, doc){
    GoodsImg.find({goods_id: doc._id}, function(err, docs){
      doc['imgs'] = docs;
      // let obj = {
      //   goods: doc,
      //   imgs: docs
      // }
      return res.json(doc)
    })
  })
})

Router.get('/add', function(req, res){
  // User.remove({},function(e, d){})
  Goods.create({
    name: 'iphone Xs',
    former_price: 6999,
    now_price: 5999,
    desc: "来和 Liquid视网膜显示屏见个面。iPhone XR上的全新显示屏，是一款尤为先进的LCD屏。创新的背光设计，让显示屏一直延伸到了机身边角。因此看上去，整个屏幕都被鲜活生动的色彩铺满。",
    time: 15912312321312,
    img: 'iphone Xs.jpg',
    num: 2,
  },function(err,doc){
    if(!err){
      console.log(doc);
    }else{
      console.log(err);
    }
  })
})

// 根据商品id 查找照片
Router.get('/goods_img', function(req, res){
  // User.remove({},function(e, d){})
  GoodsImg.find({goods_id: req.query.id}, function(err, doc){
    return res.json(doc)
  })
})

Router.get('/add_img', function(req, res){
  // User.remove({},function(e, d){})
  GoodsImg.create({
    name: 'iphone XS',
    address: 'iphone Xs4.jpg',
    goods_id: '5c578e390cf88c0832ba099d',
    index: 4,
  },function(err,doc){
    if(!err){
      console.log(doc);

    }else{
      console.log(err);
    }
    return res.json({status: 1})
  })
})




module.exports = Router
