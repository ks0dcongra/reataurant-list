# 餐廳清單 2.0

此專案提供使用者新增、刪除及修改餐廳的資訊，例如:餐廳類別、地址、評分、描述等

## 功能列表

1. 依照餐廳名稱及餐廳類別搜尋
  - 優化搜尋功能
    - 剔除多餘的空白
    - 搜尋沒有結果時也有對應頁面提示
2. 可從首頁點擊餐廳圖片了解餐廳詳細資訊
3. 依照餐廳名稱、類別及地區排序
4. 檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
  - 基本CRUD
    - 點選Banner的圖標返回首頁瀏覽全部餐廳資料
    - 點選`Edit`編輯此筆餐廳資料
    - 點選`Delete`刪除此筆餐廳資料
    - 點選 Google Map`顯示詳細地圖`可查看位置詳細資料
5. 點選`Create`新增餐廳包含上傳圖片、評分、類別、地址等資訊，Google Map 位置會依照輸入之地址產生

## 先決條件
* Windows系統

### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/ks0dcongra/reataurant-list.git
```

2.進入專案資料夾

```
cd restaurant-list
```

### 3.~8.為若你過去沒有下載過node.js，所需要執行的事，若曾經使用過node.js請跳至9.。

3.安操nvm
```
到這裡 https://github.com/coreybutler/nvm-windows/releases 安裝nvm，選擇最新版本的nvm-setup.zip 檔案，請注意路徑中不能有空白或中文。
npm install  //安裝套件
```

4.CMD查看是否安裝成功
```
$ nvm version
```

5.查看目前有再更新的版本
```
$ nvm list available
```

6.下載node.js 14.16.0 版
```
$ nvm use 14.16.0
```

7.使用node.js 14.16.0 版
```
$ nvm use 14.16.0
```

8.檢查node.js版本
```
$ node -v
```

9.下載mongoose套件
```
npm i mongoose@5.9.7
```

10.開啟程式
```
npm run dev 
```

11.打開瀏覽器網址列輸入 http://localhost:3000/

終端顯示 `Express is running on http://localhost:3000` 即啟動完成，請至[http://localhost:3000](http://localhost:3000)開始使用程式

## 系統截圖
![搜尋排序完之首頁](https://github.com/ks0dcongra/reataurant-list/blob/master/public/imgur/5.jpg)



## 使用工具
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Fileupload](https://www.npmjs.com/package/express-fileupload) - 上傳圖片並放置指定目錄
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎

## Acknowledgments
* AlphaCamp