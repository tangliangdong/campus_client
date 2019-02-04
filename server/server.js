const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoute = require('./user')
const goodsRoute = require('./goods')
const utils = require('utility')
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRoute)
app.use('/goods', goodsRoute)
app.listen(9093,function(){
  console.log('Node app start at port 9093');
})
