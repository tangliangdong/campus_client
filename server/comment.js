const express = require('express')
const Router = express.Router()
const model = require('./model')
const Comment = model.getModel('comment')
const utils = require('utility')

// 添加评论
Router.post('/add', function(req, res){
  console.log(req.body);
  console.log(req.session);
  const goodsId = req.body.goods_id
  const userId = req.session.userinfo._id
  const content = req.body.content
  console.log(userId);
  let timestamp = Date.parse(new Date());
  let comment = new Comment({
    content: content,
    goods: goodsId,
    user: userId,
    add_time: timestamp,
  })
  comment.save(function(err, doc){
    return res.json({id: doc.goods})
  })
})

// 获得评论
Router.get('/list', function(req, res){
  const goodsId = req.query.id
  console.log(goodsId);
  Comment.find({goods: goodsId})
    .populate('goods')
    .populate('user')
    .exec(function(err, doc){
      console.log(doc);
      return res.json(doc)
    })
})

module.exports = Router
