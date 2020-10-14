## 關於

    阿里山林業鐵路專案的前端程式

## 安裝 & 啟動測試 Web 伺服器
```
npm install
npm run serve
```

## 部署 (產生要放至正式環境的檔案)
```
npm run build
```

## 備註
    (1) public 目錄下的 env.txt 是環境設定檔(公開的檔案)，可自行增加不需保密的變數或修改其值
    (2) 字型檔含有 woff2 類型，Web Server 的 MIME 若沒此類型記得加入
    (3) npm run build 時，編譯過程的 warning 不影響運作，它主要是提醒有些js引入css順序不一致、有些檔案超過推薦大小(214k)