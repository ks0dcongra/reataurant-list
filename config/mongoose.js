const mongoose = require('mongoose') // 載入 mongoose
const mongodb_url = require('../mongodb_url')
//連線資料庫
mongoose.connect(mongodb_url(), { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db