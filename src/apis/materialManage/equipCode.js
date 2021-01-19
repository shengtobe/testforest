// ------------ 設備報修碼 api -----------------

import axios from '@/apis/axiosSetting'

// 取得設備標示編號Lv1
export function fetchEqCode(data) { return axios(
    {
        url: '/global/dev/querylvall',
        method: 'post',
        data,
    }
)}