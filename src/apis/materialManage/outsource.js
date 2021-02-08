//維修外包管理
import axios from '@/apis/axiosSetting'

//清單
export function classQueryList(data) { 
    return axios(
    {
        url: '/mmis/routine/classquerylist',
        method: 'post',
        data,
    }
)}
//明細
export function classQuery(data) { 
  return axios(
  {
      url: '/mmis/routine/jobquery',
      method: 'post',
      data,
  }
)}
//新增
export function classInsert(data) { 
  return axios(
  {
      url: '/mmis/routine/jobinsert',
      method: 'post',
      data,
  }
)}
//刪除
export function classDelete(data) { 
  return axios(
  {
      url: '/mmis/routine/jobdelete',
      method: 'post',
      data,
  }
)}
//修改
export function classUpdate(data) { 
  return axios(
  {
      url: '/mmis/routine/jobupdate',
      method: 'post',
      data,
  }
)}