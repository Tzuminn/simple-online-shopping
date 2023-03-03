# 簡易購物網站(復刻毛孩時代網站)
提供API給[https://github.com/BearK0515/pets-store](pets-store)使用

## 開發環境
1. Node.js v14.16.0
2. mySQL v8.0.31

## 專案照片


## Installing - 專案安裝流程(本地端使用)

1. 開啟終端機(Terminal)，Clone 此專案至本機電腦。

```
git clone https://github.com/Tzuminn/simple-online-shopping.git
```

2. 使用終端機(Terminal)指令，進入存放此專案的資料夾。

```
cd simple-online-shopping
```

3. 在專案資料夾下，使用終端機(Terminal)，輸入 npm 套件安裝指令。

```
npm install
```

4. 新增 .env，並按照.env.example檔設定

```
MYSQL_DB_USER=SKIP 
MYSQL_DB_PASSWORD=SKIP 
MYSQL_DB=SKIP
MYSQL_DB_HOST=SKIP 

SESSION_SECRET=SKIP

JWT_SECRET=SKIP
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=SKIP
GOOGLE_ID=SKIP
GOOGLE_SECRET=SKIP
GOOGLE_CALLBACK=SKIP
LINE_ID=SKIP
LINE_SECRET=SKIP
LINE_CALLBACK=SKIP

IMGUR_CLIENT_ID=SKIP
SESSION_SECRET=SKIP

EMAIL_ACCOUNT=SKIP
EMAIL_PASS=SKIP

MESSENGER_PAGE_ID=SKIP
MESSENGER_ACCESS_TOKEN=SKIP
MESSENGER_VERIFY_TOKEN=SKIP

LINE_BOT_ID=SKIP
LINE_BOT_SECRET=SKIP
LINE_BOT_TOKEN=SKIP

OPENAI_API_KEY=SKIP
```

5. 開啟MySQLWorkbench ，使用SQL指令，在本地(local)建立資料庫。

```
drop database if exists e-shop;
create database e-shop;
```

6. 回到專案資料夾下的終端機(Terminal)，建立mySQL Table。

```
npx sequelize db:migrate
```

7. 匯入種子檔案， 產生測試用的初始資料。

```
npx sequelize db:seed:all
```

8. 執行npm腳本指令，啟動伺服器

```
npm run dev
```

9. 現在可以開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用！

10. 可以使用種子帳號來做測試：

管理者種子帳號：
帳號：root@root.com
密碼：123

## API文件

API文件 https://bee3048.docs.apiary.io/#reference

## 開發人組 

Joy、MIN、Waylin