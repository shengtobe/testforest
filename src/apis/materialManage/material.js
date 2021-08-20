
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
// 移存申請單
export function mmaterialRequistision(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materialrequistision',
      method: 'post',
      data,
  }
)}

// 規格
export function materialSpecQueryList(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materiaspeclquerylist',
      method: 'post',
      data,
  }
)}

export function materialSpecQuery(data) { 
return axios(
{
    url: '/mmis/equipdata/materialspecquery',
    method: 'post',
    data,
}
)}

export function materialSpecEdit(data) { 
return axios(
{
    url: '/mmis/equipdata/materialspecedit',
    method: 'post',
    data,
}
)}

export function materialSpecDelete(data) { 
return axios(
{
    url: '/mmis/equipdata/materialspecdelete',
    method: 'post',
    data,
}
)}

//庫存
export function materialInventoryQueryList(data) { 
  return axios(
  {
      url: '/mmis/equipdata/materialinventoryquerylist',
      method: 'post',
      data,
  }
)}

export function materialInventoryQuery(data) { 
return axios(
{
    url: '/mmis/equipdata/materialinventoryquery',
    method: 'post',
    data,
}
)}

export function materialInventoryEdit(data) { 
return axios(
{
    url: '/mmis/equipdata/materialinventoryedit',
    method: 'post',
    data,
}
)}

export function materialInventoryDelete(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialinventorydelete',
        method: 'post',
        data,
    }
    )}