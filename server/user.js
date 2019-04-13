const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Order = model.getModel('order_form')
const Dictionary = model.getModel('dictionary')
const Address = model.getModel('address')
const utils = require('utility')

const _filter = { 'pwd': 0, '__v': 0}

// 获取所有用户信息
Router.get('/list', function(req, res){
  // User.remove({},function(e, d){})
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})

Router.post('/getUserById', function(req, res){
  const id = req.body.id
  // User.remove({},function(e, d){})
  User.findById(id, function(err, doc){
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
    req.session.userinfo = doc;
    return res.json({code: 1, data: doc})
  })

})

Router.post('/register', function(req, res){
  // User.remove({},function(e, d){})
  const username = req.body.username
  const psw = md5Pwd(req.body.password)
  User.findOne({username: username},function(err, doc) {
    if( !doc ){
      let timestamp = Date.parse(new Date())
      let user = new User({
        username: username,
        password: psw,
        type: 3,
        nikename: '无名'+timestamp,
        add_time: timestamp,
        avatar: 'avatar.jpg',
      })
      user.save(function(err, obj){
        return res.json({status: 1, msg: '注册成功'})

      })
    }else{
      return res.json({status: 0, msg: '账号已存在'})
    }
  })

})

// 注销
Router.get('/logout', function(req, res){
  res.clearCookie('userid');
  delete req.session.userinfo;
  return res.json({code: 1})
})



Router.get('/info',function(req, res){
  const userinfo = req.session.userinfo
  if( !userinfo ){
    return res.json({code: 0})
  }
  User.findOne({_id: userinfo._id}, _filter, function(err, doc){
    if(err){
      return res.json({code: 0, msg: '后端出错了'})
    }
    if(doc){
      return res.json({code: 1, data: doc})
    }
  })
  // return res.json({code: 1})
})

Router.post('/info/edit',function(req, res){

  const data = req.body.data
  const userinfo = req.session.userinfo
  if( !userinfo ){
    return res.json({code: 0})
  }
  console.log(data);
  User.updateOne({_id: userinfo._id}, {
    nikename: data.nikename,
    phone: data.phone,
    email: data.email,
    desc: data.desc,
    grade: data.grade
  }, function(err, doc){

    if(err){
      return res.json({code: 0, msg: '后端出错了'})
    }else{
      return res.json({code: 1, data: doc})
    }
  })
  // return res.json({code: 1})
})

// 管理员新增用户
Router.post('/add', function(req, res){
  const data = req.body.data
  // User.remove({},function(e, d){})
  User.create(data, function(err,doc){
    if(!err){
      console.log(doc);
      return res.json({code: 1, msg: '编辑成功'})
    }else{
      console.log(err);
      return res.json({code: 0, msg: err})
    }
  })
})

// 用户编辑
Router.post('/edit', function(req, res){
  const data = req.body.data
  User.updateOne({_id: data._id}, data, function(err, doc){
    if(!err){
      return res.json({code: 1, msg: '编辑成功'})
    }else{
      return res.json({code: 0, msg: err})
    }
  })
})

Router.get('/delete', function(req, res){
  // User.deleteMany({},function(err){
  //   console.log('delete all');
  // })
})




// 显示用户地址列表
Router.get('/address/list', function(req, res){
  const userId = req.session.userinfo._id
  Address.find({user_id: userId})
    .populate("list")
    .exec(function(err, doc){
      return res.json(doc);
    })
})

// 添加用户的地址
Router.post('/address/add', function(req, res){
  const userId = req.session.userinfo._id
  const data = req.body.data
  const address = new Address({
    dorm: data.dorm,
    content: data.content,
    name: data.name,
    phone: data.phone,
    user_id: userId
  })
  address.save(function(err, doc){
    if(!err){
      console.log(doc);
      res.json({doc})
    }else{
      res.json({msg: err})
    }
  })
})

// 编辑用户地址信息
Router.post('/address/edit', function(req, res){
  const data = req.body.data;

  Address.updateOne({_id: data._id}, {
    dorm: data.dorm,
    content: data.content,
    name: data.name,
    phone: data.phone
  }, function(err,raw){
    //{ n: 1, nModified: 1, ok: 1 }
    return res.json({status: raw.n})
  })
})

// 删除指定用户地址信息
Router.post('/address/delete', function(req, res){
  const id = req.body.id
  Address.remove({_id: id}, function(err, doc){
    //{ n: 1, nModified: 1, ok: 1 }
    console.log(doc);
    return res.json({status: 1})
  })
})

// 显示所有的宿舍楼选项
Router.get('/dorm/title', function(req, res){
  Dictionary.find({type: 'dorm'}).exec(function(err, doc){
    if(!err){
      return res.json(doc)
    }else{
      return res.json({msg: err})
    }
  })
})

// 显示所有的年级选项
Router.get('/grade/title', function(req, res){
  Dictionary.find({type: 'grade'}).exec(function(err, doc){
    if(!err){
      return res.json(doc)
    }else{
      return res.json({msg: err})
    }
  })
})

// 获取用户订单列表
Router.get('/getUserOrderList', function( req, res){
  const userinfo = req.session.userinfo
  Order.find({user_id: userinfo._id})
    .populate('user_id')
    .exec(function(err, doc){
      if(err){
        return res.json({code: 0, msg: err})
      }else{
        return res.json(doc)
      }
    })
})

function md5Pwd(pwd){
  const salt = 'campus_service_1996@>_>'
  return utils.md5(pwd+salt)
}

module.exports = Router
