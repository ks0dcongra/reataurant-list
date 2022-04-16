const express = require('express')
const app = express()
const port = 3030
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongodb_url = require('./mongodb_url')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require("body-parser")
const restaurantSeed = require('./models/restaurant') // 載入 Todo model


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

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



app.get('/', (req, res) => {
  restaurantSeed.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurantSeed => res.render('index', { restaurantSeed})) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
  // res.render('index', { restaurants: restaurantList.results })
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    }
  )
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
})
