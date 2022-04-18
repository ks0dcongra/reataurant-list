// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const Restaurant = require('../../models/restaurant')

// 渲染多個餐廳
router.get('/', (req, res) => {
  return Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'desc' }) // desc
    .then(restaurants => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 搜尋多個頁面
router.get('/search', (req, res) => {
  let keyword = req.query.keywords
  let sort = `'${req.query.option}'`

  if (!keyword) {
    keyword = ''
  }

  if (sort.includes('asc')) {
    sort = 'name'
  } else if (sort.includes('desc')) {
    sort = '-name'
  } else if (sort.includes('category')) {
    sort = 'category'
  } else {
    sort = 'location'
  }

  keyword = keyword.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: filterRestaurants, keyword, sort })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
