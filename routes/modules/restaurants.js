const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//前往新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//建立餐廳
router.post('/', (req, res) => {
  // console.log(req.body)
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const description = req.body.description
  const google_map = req.body.google_map

  // const restaurant = new restaurant({ name })
  // return restaurant.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
  return Restaurant.create({ name, name_en, category, image, location, phone, description, rating, google_map })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//瀏覽單一餐廳
router.get('/:restaurant_id', (req, res) => {
  // console.log(req.params)
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})



//編輯單一餐廳-Get
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})



//編輯單一餐廳-Post
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const description = req.body.description
  const google_map = req.body.google_map
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.description = description
      restaurant.google_map = google_map
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


// 刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router