const APP_ENV = {}  // 環境變數 (index.html 內的全域變數)

async function fetchEnv() {
    try {
        console.log("☎ start");

        await fetch('/env.txt')
        .then(res => res.text())
        .then((res) =>{
            console.log("☎☎ res: ", res);
            res.replace("\r\n", "\n")  // 統一換行字串
            let arr = res.split("\n")
            
            let obj = {}
            let dot = 0
            let left = ''
            let right = ''

            arr.forEach(item => {
                if (/^#.+/.test(item)) return  // 開頭為 # 的為備註，不處理

                dot = item.indexOf('=')
                if(dot > 0) {
                    left = item.substr(0, dot).trim()
                    right = item.substr(dot+1).trim()
                    console.log("left: ",left)
                    console.log("right: ",right)
                    obj[left] = right
                }
            })
            console.log("☎☎☎ obj: ", obj);
            Object.assign(APP_ENV, obj)
        })

        if (obj.MODE == 'dev') {
            console.log("✖✖✖ APP_ENV: ", obj);
            console.log("obj.DEV_HOST: ", obj.DEV_HOST);
            console.log("obj.DEV_PORT: ", obj.DEV_PORT);
            axios.defaults.baseURL = `${obj.DEV_HOST}:${obj.DEV_PORT}/api`
        } else if (obj.MODE == 'prod') {
            axios.defaults.baseURL = `${obj.PROD_HOST}:${obj.PROD_PORT}/api`
        }
        else{
            console.log("✖ else APP_ENV:", obj);
        }
    } catch(err) {
        console.log(err)
    }
}

// fetchEnv()