// -------- 使用者登入 API --------

import axios from './axiosSetting'

// 登入
export function login(data) { return axios(
    {
        url: '/smis/user/login',
        method: 'post',
        data,
    }
)}

// 個人訊息查詢
export function fetchPersonalInfo(data) { return axios(
    {
        url: '/global/user/info/query',
        method: 'post',
        data,
    }
)}

// 個人訊息讀取					
export function fetchPersonalInfoRead(data) { return axios(
    {
        url: '/global/user/info/read',
        method: 'post',
        data,
    }
)}