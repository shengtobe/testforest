// -------- axios 共通的設定 --------

import axios from 'axios'

//
const APP_ENV = {}  // 環境變數 (index.html 內的全域變數)
let obj = {}

try {

    fetch('/env.txt')
    .then(res => res.text())
    .then((res) =>{
        res.replace("\r\n", "\n")  // 統一換行字串
        let arr = res.split("\n")
        
        // let obj = {}
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
        //

        if (obj.MODE == 'dev') {
            axios.defaults.baseURL = `${obj.DEV_HOST}:${obj.DEV_PORT}/api`
        } else if (obj.MODE == 'prod') {
            axios.defaults.baseURL = `${obj.PROD_HOST}:${obj.PROD_PORT}/api`
        }
        else{
        }
        // Object.assign(APP_ENV, obj)
    })
} catch(err) {
    //console.log(err)
}
// 後端 api 的 host、port
// console.log("❌1 axios執行");
// console.log("obj.MODE: ", obj);
// console.log("obj.MODE: ", obj.MODE);

// if (obj.MODE == 'dev') {
//     console.log("❌❌❌APP_ENV: ", obj);
//     console.log("obj.DEV_HOST: ", obj.DEV_HOST);
//     console.log("obj.DEV_PORT: ", obj.DEV_PORT);
//     axios.defaults.baseURL = `${obj.DEV_HOST}:${obj.DEV_PORT}/api`
// } else if (obj.MODE == 'prod') {
//     axios.defaults.baseURL = `${obj.PROD_HOST}:${obj.PROD_PORT}/api`
// }
// else{
//     console.log("❌ else APP_ENV:", obj);
// }

// 攔截器，為每次請求前都做的事
// axios.interceptors.request.use((config) => {
//     // 每次向後端請求時都抓一下當時的 token，避免 token 在瀏覽器開發者工具內改過
//     let $token = localStorage.getItem('LoginToken')
//     if ($token == null) localStorage.clear()

//     config.headers.Authorization = 'Bearer ' + $token
//     return config
// }, (error) => {
//     return Promise.reject(error)
// })

export default axios