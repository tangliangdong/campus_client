const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/campus'
mongoose.connect(DB_URL)

const models = {
  user: {
    'username': {type: String, require: true},
    'nikename': {type: String, require: true},
    'password': {type: String, require: true, select: false },
    'type': {type: String, require: true},
    'avatar': {type: String},
    'grade': {type: Number, require: true},
    'email': {type: String},
    // 个人简介
    'desc': {type: String}
  },
  goods: {
    "name": {type: String, require: true},
    "former_price": {type: Number},
    "now_price": {type: Number, require: true},
    "desc": {type: String, require: true},
    "time": {type: Number},
    "num": {type: Number, require: true},
    "img": {type: String, require: true}
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
