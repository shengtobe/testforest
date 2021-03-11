// --------- 健檢管理 API --------------

import axios from '@/apis/axiosSetting'

// 新增
export function healthUpdate(data) { return axios(
    {
        url: '/sms/health/update',
        method: 'post',
        data,
    }
)}

// 修改勾選
export function healthUpdateStatus(data) { return axios(
    {
        url: '/sms/health/updatestatus',
        method: 'post',
        data,
    }
)}

// 搜尋
export function healthList(data) { return axios(
    {
        url: '/sms/health/querylist',
        method: 'post',
        data,
    }
)}

// 單人搜尋
export function healthCdList(data) { return axios(
  {
      url: '/sms/health/queryrcdlist',
      method: 'post',
      data,
  }
)}