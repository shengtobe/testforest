// --------- 健檢管理 API --------------

import axios from '@/apis/axiosSetting'

// 新增/修改
export function licenseRcdOption(data) { return axios(
    {
        url: '/sms/license/licensercdoption',
        method: 'post',
        data,
    }
)}

// 搜尋
export function licenseRcdQuery(data) { return axios(
    {
        url: '/sms/license/licensercdquery',
        method: 'post',
        data,
    }
)}

// 新增/修改 - 依人
export function licenseOption(data) { return axios(
  {
      url: '/sms/license/licenseoption',
      method: 'post',
      data,
  }
)}