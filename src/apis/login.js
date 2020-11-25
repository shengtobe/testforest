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