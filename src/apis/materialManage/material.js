
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

// 移存申請單
export function materialRequistision(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialrequistision',
        method: 'post',
        data,
    }
)}

export function materialRequistisionList(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialrequistisionlist',
        method: 'post',
        data,
    }
)}

export function materialRequistisionDelete(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialrequistisiondelete',
        method: 'post',
        data,
    }
)}

export function materialRequistisionReturn(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialrequistisionreturn',
        method: 'post',
        data,
    }
)}

export function materialRequistisionConfirm(data) { 
    return axios(
    {
        url: '/mmis/equipdata/materialrequistisionconfirm',
        method: 'post',
        data,
    }
)}