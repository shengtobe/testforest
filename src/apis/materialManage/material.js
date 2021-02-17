
import axios from '@/apis/axiosSetting'

// 料件清單
export function materialQueryList(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialquerylist',
        method: 'post',
        data,
    }
)}

export function materialQuery(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materialquery',
      method: 'post',
      data,
  }
)}

export function materialEdit(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materialedit',
      method: 'post',
      data,
  }
)}

export function materialDelete(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materialdelete',
      method: 'post',
      data,
  }
)}

export function mmaterialRequistision(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materialrequistision',
      method: 'post',
      data,
  }
)}
