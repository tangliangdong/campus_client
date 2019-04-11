const express = require('express')
const Router = express.Router()
const model = require('./model')
const Category = model.getModel('category')
// const CategoryChild = model.getModel('category_child')
const utils = require('utility')

Router.get('/list',function(req, res){
  Category.find()
    .populate('child')
    .exec(function(err, docs) {
        if(docs){
          return res.json(docs)
        }else{
          console.log(err);
          return res.json({status:0,msg: err})
        }
    });
})

Router.get('/find_test',function(req, res){
  Category.find({child: {_id: '5c8f470b8c300438e7ced54f'}})
    .exec(function(err, docs) {
        if(docs){
          return res.json(docs)
        }else{
          console.log(err);
          return res.json({status:0,msg: err})
        }
    });
})

Router.post('/add',function(req, res){
  const title = req.body.title

  Category.create({
    title: title,
  },function(err,doc){
    if(!err){
      console.log(doc);
      return res.json({code: 1, msg: '成功添加'})
    }else{
      console.log(err);
    }
  })

})

Router.post('/delete',function(req, res){
  const id = req.body.id

  Category.deleteOne({_id: id}, function(err, doc){
    if(!err){
      return res.json({
        code: 1, msg: '成功删除'
      })
    }
  })

})

Router.get('/add_child',function(req, res){
  CategoryChild.create({
    title: '计算机',
    pid: '5c8cbd23cbd30f2c503131d6'
  },function(err,doc){
    if(!err){
      console.log(doc);
      return res.json({status: 1})
    }else{
      console.log(err);
    }
  })

})


module.exports = Router
