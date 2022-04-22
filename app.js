const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

require('./config/mongoose')
const bodyParser = require('body-parser')

// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
