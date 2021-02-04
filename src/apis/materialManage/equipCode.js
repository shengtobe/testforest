// ------------ 設備報修碼 api -----------------

import axios from '@/apis/axiosSetting'

// 取得設備標示編號
export function fetchEqCode(data) { return axios(
    {
        url: '/global/dev/querylvall',
        method: 'post',
        data,
    }
)}
// 反查設備報修碼 回傳六個值
export function fetchEqList(data) { return axios(
  {
      url: '/global/dev/reveqcode',
      method: 'post',
      data
  }
)}