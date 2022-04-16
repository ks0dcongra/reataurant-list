const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require("../../restaurant.json").results
const mongodb_url = require('../../mongodb_url')
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(mongodb_url(), { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
console.log(restaurantList)
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  // for (let i = 0; i < 10; i++) {
    // Restaurant.create({ name: `RESSSSSST-${i}`, name_en: `RUNT-${i}` })
    Restaurant.create(restaurantList)
      .then(() => {
        console.log("restaurantSeeder done!")
        db.close()
      })
      .catch(err => console.log(err))
  // }
  console.log('done')
})