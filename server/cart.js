const express = require('express')
const Router = express.Router()
const model = require('./model')
const Cart = model.getModel('cart')
const User = model.getModel('user')
const Goods = model.getModel('goods')
const utils = require('utility')

// 添加购物车，若是购物车没有，则添加新纪录，若是有则数量加1
Router.post('/add', function(req, res){
  const goodsId = req.body.goodsId
  const userId = req.body.userId
  Cart.findOne({goods_id: goodsId,user_id: userId}, function(err, doc){
    if(doc){
      let sum = doc.sum+1;
      Cart.updateOne({goods_id: goodsId,user_id: userId},{sum: sum}, function(err, numberAffected, raw){
        // if (err) return console.log(err);
        if(numberAffected.n>0) {
          return res.json({status: 1,msg: '成功加入购物车'})
        }else{
          console.log(err);
          return res.json({status: 0,msg: "失败"})
        }
      })
    }else{
      let cartEntity = new Cart({
        goods_id: goodsId,
        user_id: userId,
        sum: 1,
      })
      cartEntity.save(function(err, docs){
        if(docs) {

          return res.json({status: 1,msg: '成功加入购物车'})
        }else{
          console.log(err);
          return res.json({status: 0,msg: '失败'})
        }
      })
    }
  })

  // return res.json({status: 1,msg: '成功加入购物车'})
})

Router.get('/list',function(req, res){
  Cart.find({
        user_id: req.session.userinfo._id
    })
    .populate('goods_id') //加上这句话也就有了属性值,
    .populate('user_id')
    .exec(function(err, docs) {
        if(docs){
          return res.json(docs)
        }else{
          return res.json({status:0,msg: err})
        }
        //id:  { _id: 58ddd5db6216a905ce973de4, name: '第一高中', __v: 0 } name:  第一高中
    });

})

// 批量删除购物车的商品
Router.post('/delete',function(req, res){
  let where = req.body.ids.split(',')
  Cart.deleteMany({ _id: { $in: where } }).exec();
  return res.json({status: 1})

})
// 修改商品的数量
Router.post('/change_sum',function(req, res){
  const id = req.body.id;
  const sum = req.body.sum;
  if(sum!==0){
    Cart.update({_id: id}, {sum: sum}, function(err, doc){
      return res.json({status: 1})
    })
  }
})

module.exports = Router
