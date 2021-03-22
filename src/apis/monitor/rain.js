// --------- 邊坡監控 API --------------

import axios from '@/apis/axiosSetting'

// 搜尋
export function fetchList(data) { return axios(
    {
        url: '/mmis/monitor/rainfallquery',
        method: 'post',
        data,
    }
)}
