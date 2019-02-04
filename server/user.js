const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

const _filter = { 'pwd': 0, '__v': 0}

Router.get('/list', function(req, res){
  // User.remove({},function(e, d){})
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})

Router.post('/login', function(req, res){
  // User.remove({},function(e, d){})
  const username = req.body.username
  const password = req.body.password
  User.findOne({username: username, password: md5Pwd(password)},function(err, doc) {
    if( !doc ){
      return res.json({code: 0, msg: '用户名不存在或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 1, data: doc})
  })

})

Router.get('/logout', function(req, res){
  res.clearCookie('userid');
  return res.json({code: 1})
})

Router.get('/info',function(req, res){
  const {userid} = req.cookies

  if( !userid ){
    return res.json({code: 0})
  }
  User.findOne({_id: userid}, _filter, function(err, doc){

    if(err){
      return res.json({code: 0, msg: '后端出错了'})
    }
    if(doc){
      return res.json({code: 1, data: doc})
    }
  })
  // return res.json({code: 1})
})

Router.get('/add', function(req, res){
  // User.remove({},function(e, d){})
  User.create({
    username: 'yaozi',
    nikename: '窑子',
    password: md5Pwd('123'),
    type: 1,
    email: '18868748898@163.com',
    avatar: 'avatar.jpg',
    grade: '1',
    desc: '我是咸鱼',
    age: 22,
  },function(err,doc){
    if(!err){
      console.log(doc);
    }else{
      console.log(err);
    }
  })
})

Router.get('/delete', function(req, res){
  User.deleteMany({},function(err){
    console.log('delete all');
  })
})

function md5Pwd(pwd){
  const salt = 'campus_service_1996@>_>'
  return utils.md5(pwd+salt)
}

module.exports = Router
