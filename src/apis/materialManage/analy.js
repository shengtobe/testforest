//分析
import axios from '@/apis/axiosSetting'

export function MTTR(data) { 
    return axios(
    {
        url: '/mmis/analy/mttr',
        method: 'post',
        data,
    }
)}
export function MTBF(data) { 
  return axios(
  {
      url: '/mmis/analy/mtbf',
      method: 'post',
      data,
  }
)}
export function MKBF(data) { 
  return axios(
  {
      url: '/mmis/analy/mkbf',
      method: 'post',
      data,
  }
)}