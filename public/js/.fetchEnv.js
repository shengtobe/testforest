const APP_ENV = {}  // 環境變數 (index.html 內的全域變數)

async function fetchEnv() {
    try {
        await fetch('/env.txt')
        .then(res => res.text())
        .then((res) =>{
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
                    obj[left] = right
                }
            })

            Object.assign(APP_ENV, obj)
        })
    } catch(err) {
        console.log(err)
    }
}

fetchEnv()