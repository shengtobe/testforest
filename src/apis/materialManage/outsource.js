//維修外包管理
import axios from '@/apis/axiosSetting'

//清單
export function outsourceQueryList(data) { 
    return axios(
    {
        url: '/mmis/outsourcing/outsourcequerylist',
        method: 'post',
        data,
    }
)}
//明細
export function outsourceQuery(data) { 
  return axios(
  {
      url: '/mmis/outsourcing/outsourcequery',
      method: 'post',
      data,
  }
)}
//新增
export function outsourceInsert(data) { 
  return axios(
  {
      url: '/mmis/outsourcing/outsourceinsert',
      method: 'post',
      data,
  }
)}
//刪除
export function outsourceDelete(data) { 
  return axios(
  {
      url: '/mmis/outsourcing/outsourcedelete',
      method: 'post',
      data,
  }
)}
//修改
export function outsourceUpdate(data) { 
  return axios(
  {
      url: '/mmis/outsourcing/outsourceupdate',
      method: 'post',
      data,
  }
)}