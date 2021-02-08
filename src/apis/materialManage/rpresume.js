//報表管理
import axios from '@/apis/axiosSetting'

//維修工時履歷清單
export function workTimeQueryList(data) { 
    return axios(
    {
        url: '/mmis/rpresume/worktimequerylist',
        method: 'post',
        data,
    }
)}
//維修工時履歷明細資料
export function workTimeQuery(data) { 
  return axios(
  {
      url: '/mmis/rpresume/worktimequery',
      method: 'post',
      data,
  }
)}
//料件履歷清單
export function materialQueryList(data) { 
  return axios(
  {
      url: '/mmis/rpresume/materialquerylist',
      method: 'post',
      data,
  }
)}
//料件履歷明細資料
export function materialQuery(data) { 
  return axios(
  {
      url: '/mmis/rpresume/materialquery',
      method: 'post',
      data,
  }
)}
//維修費用履歷清單
export function costQueryList(data) { 
  return axios(
  {
      url: '/mmis/rpresume/costquerylist',
      method: 'post',
      data,
  }
)}
//維修費用明細資料
export function costQuery(data) { 
  return axios(
  {
      url: '/mmis/rpresume/costquery',
      method: 'post',
      data,
  }
)}