// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const Restaurant = require('../../models/restaurant')

//渲染多個餐廳
router.get('/', (req, res) => {
  Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
  // res.render('index', { restaurants: Restaurant })
})

//搜尋多個頁面
router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keyword = req.query.keywords.trim().toLowerCase()
  const sort = req.query.sort
  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

// router.get("/search", (req, res) => {
//   if (!req.query.keywords) {
//     res.redirect("/")
//   }

//   const keywords = req.query.keywords
//   const keyword = req.query.keywords.trim().toLowerCase()

//   Restaurant.find({})
//     .lean()
//     .then(restaurantsData => {
//       const filterRestaurantsData = restaurantsData.filter(
//         data =>
//           data.name.toLowerCase().includes(keyword) ||
//           data.category.includes(keyword)
//       )
//       res.render("index", {
//         restaurantsData: filterRestaurantsData,
//         keywords,
//       })
//     })
//     .catch(err => console.log(err))
// })





// 匯出路由模組
module.exports = router