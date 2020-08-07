// -------- axios 共通的設定 --------

import axios from 'axios'

// 後端 api 的 host、port
if (APP_ENV.MODE == 'dev') {
    axios.defaults.baseURL = `${APP_ENV.DEV_HOST}:${APP_ENV.DEV_PORT}/api`
} else if (APP_ENV.MODE == 'prod') {
    axios.defaults.baseURL = `${APP_ENV.PROD_HOST}:${APP_ENV.PROD_PORT}/api`
}

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