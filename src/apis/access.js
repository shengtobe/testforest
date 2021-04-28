// -------- 組織表 API --------

import axios from './axiosSetting'

// 取得組織表
export function fetchUserAuth(data) { return axios(
    {
        url: '/user/account/query',
        method: 'post',
        data,
    }
)}
//人員權限管理更新
export function userAuthUpdate(data) { return axios(
    {
        url: '/user/account/update',
        method: 'post',
        data,
    }
)}
// 取得群組權限表
export function fetchGroupAuth(data) { return axios(
    {
        url: '/user/account/groupquery',
        method: 'post',
        data,
    }
)}
//群組權限管理更新
export function groupAuthUpdate(data) { return axios(
    {
        url: '/user/account/groupupdate',
        method: 'post',
        data,
    }
)}