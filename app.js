const express = require('express')
const app = express()
const port = 3030
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongodb_url = require('./mongodb_url')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require("body-parser")
const Restaurant = require('./models/restaurant') // 載入 Todo model
const restaurant = require('./models/restaurant')


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


//渲染多個頁面
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
  // res.render('index', { restaurants: Restaurant })
})

//新增單一頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//渲染多個頁面
app.post('/restaurants', (req, res) => {
  // console.log(req.body)
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const description = req.body.description
  const google_map = req.body.google_map;

  // const restaurant = new restaurant({ name })
  // return restaurant.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
  return Restaurant.create({ name, name_en, category, image, location, phone, description, rating, google_map })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//瀏覽單一頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log(req.params)
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//搜尋多個頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = Restaurant.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    }
  )
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//編輯單一頁面get
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//編輯單一頁面post
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  // console.log(id)
  const name = req.body.name
  console.log(name)
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
})
