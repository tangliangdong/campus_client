const express = require('express')
const Router = express.Router()
const model = require('./model')
const Goods = model.getModel('goods')
const utils = require('utility')
const GoodsImg = model.getModel('goods_img')
const Category = model.getModel('category')
const multer  = require('multer')
const upload = multer({ dest: 'img/' })
const path = require('path');
const formidable = require('formidable');
const fs=require('fs');


/**
 * condition  2:价格升序，3：价格降序
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
Router.get('/list', function(req, res){
  // User.remove({},function(e, d){})
  let condition = req.query.condition;
  let low = (req.query.low?parseInt(req.query.low):null);
  let high = (req.query.high?parseInt(req.query.high):null);
  let category = (req.query.category?req.query.category:null);
  let name = (req.query.name?req.query.name:null);
  // let where = "";
  // where += (low?"this.now_price>"+low+" && ":null)
  // where += (high?"this.now_price<"+high:null)
  // console.log(where);
  let where = {}

  let price = {}
  let index = 0;
  if(low){
    price.$gte = low
    index++;
  }
  if(high){
    price.$lte = high
    index++;
  }
  if(index>0){
    where.now_price = price;
  }
  if(category){
    where.category_id = category
  }
  if(name){
    where.name = {$regex: name, $options: '$i'}
  }

  if(condition!==undefined&&condition!==null&&category!==undefined&&category!==null){
    switch (condition) {
      case '2':
      Goods.find(where).populate('category_id').sort({now_price: -1}).exec(function(err, doc){
        // console.log(doc);
        return res.json(doc)
      })
        break;
      case '3':
        Goods.find(where).populate('category_id').sort({now_price: 1}).exec(function(err, doc){
          // console.log(doc);
          return res.json(doc)
        })
        break;

      default:
        Goods.find(where).populate('category_id').exec(function(err, doc){
          // console.log(doc);
          return res.json(doc)
        })
    }

  }else{
    Goods.find(where).populate('category_id').exec(function(err, doc){
      // console.log(doc);
      return res.json(doc)
    })
  }

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

Router.get('/find2', function(req, res){
  // User.remove({},function(e, d){})
  let name = req.query.name
  Goods.find({name: {$regex: name, $options: '$i'}}).exec(function(err, doc){
    return res.json(doc)
  })
})

// 添加商品
Router.post('/add', function(req, res){
  // User.remove({},function(e, d){})
  const data = req.body
  data.img = data.img.file.response.img_url
  let imgs = []
  data.upload.forEach(item=>{
    imgs.push(item.thumbUrl)
  })
  console.log(imgs);
  let myDate = new Date();
  data.time = myDate.toLocaleDateString()
  let goods = new Goods(data)
  goods.save(function(err,doc){
    if(!err){
      console.log(doc);
      data.upload.forEach(item=>{
        GoodsImg.create({
          goods_id: goods._id,
          address: item.thumbUrl,
          name: goods.name
        },function (err, candies) {
          if (!err) {

          }
        })
      })
      return res.json({code: 1, cart_msg: '成功新增商品'})
    }else{
      console.log(err);
      return res.json({code: 0, msg: err})
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


// 商品信息编辑
Router.post('/edit', function(req, res){
  const data = req.body
  console.log(data);
  Goods.updateOne({_id: data._id}, data, function(err, doc){

    if(err){
      return res.json({code: 0, msg: '后端出错了'})
    }else{
      return res.json({code: 1, msg: '商品信息修改成功'})
    }
  })
})
// 商品删除
Router.post('/delete', function(req, res){
  const id = req.body.id
  console.log(id);
  Goods.deleteOne({_id: id}, function(err, doc){
    console.log(doc);
    if(err){
      return res.json({code: 0, msg: '后端出错了'})
    }else{
      return res.json({code: 1, msg: '商品删除成功'})
    }
  })
})
// 商品多选删除
Router.post('/multiDelete', function(req, res){
  const ids = req.body.ids
  console.log(ids);
  Goods.deleteMany({_id: {$in: ids}}, function(err, doc){
    console.log(doc);
    if(err){
      return res.json({code: 0, msg: '后端出错了'})
    }else{
      return res.json({code: 1, msg: '商品删除成功'})
    }
  })
})

// 商品文件上传
Router.post('/upload_goods_img', function(req, res){
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname,'/public/img/');
  let img_url = '';
  form.on('file', function(field, file) {
    //rename the incoming file to the file's name
    let timestamp=new Date().getTime()
    img_url += "goodsImg_" +timestamp+"_"+file.name
    fs.rename(file.path, form.uploadDir+img_url, function(err){
      if (err) throw err;
      console.log('renamed complete');
    });
  })
  form.parse(req,function (err,fileds,files){
     if(err) next(err);
     console.log("success");
     res.send({code: 1, img_url: img_url});
  })
  // return res.json({code: 1, msg: '成功上传'})

})


// 商品详情图片上传
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
