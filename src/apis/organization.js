// -------- 組織表 API --------

import axios from './axiosSetting'

// 取得組織表
export function fetchOrganization(data) { return axios(
    {
        url: '/global/personnel/querylist',
        method: 'post',
        data,
    }
)}