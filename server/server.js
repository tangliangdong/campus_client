const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoute = require('./user')
const goodsRoute = require('./goods')
const cartRoute = require('./cart')
const categoryRoute = require('./category')
const commentRoute = require('./comment')
const orderRoute = require('./order')

const utils = require('utility')
const app = express()
var session = require('express-session');
app.use(cookieParser('sessiontest'));
app.use(session({
 secret: 'sessiontest',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static('public'));

app.use('/user', userRoute)
app.use('/goods', goodsRoute)
app.use('/cart', cartRoute)
app.use('/category', categoryRoute)
app.use('/comment', commentRoute)
app.use('/order', orderRoute)

app.listen(9093,function(){
  console.log('Node app start at port 9093');
})
