import axios from '@/apis/axiosSetting'

// 服務科工單立案匯出 excel
export function serveNewListExecl(data) { return axios(
    {
        url: '/user/excel/create',
        method: 'post',
        data,
    }
)}