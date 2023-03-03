# 簡易購物網站(復刻毛孩時代網站)
提供API給[pets-store](https://github.com/BearK0515/pets-store)使用

## 專案功能

[專案功能及DEMO](https://github.com/BearK0515/pets-store)

## 開發環境
1. Node.js v14.16.0
2. mySQL v8.0.31

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

[API文件](https://bee3048.docs.apiary.io/#reference)

## 佈署平台

AWS Elastic Beanstalk

## 開發人組 

[Joy](https://github.com/JoyWanddrr)、[MIN](https://github.com/Tzuminn)、[Waylin](https://github.com/linway035)
