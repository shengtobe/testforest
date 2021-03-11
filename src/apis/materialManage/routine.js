//週期性工作
import axios from '@/apis/axiosSetting'

//清單
export function jobQueryList(data) { 
    return axios(
    {
        url: '/mmis/routine/jobquerylist',
        method: 'post',
        data,
    }
)}
//明細
export function jobQuery(data) { 
    return axios(
    {
        url: '/mmis/routine/jobquery',
        method: 'post',
        data,
    }
)}
//新增
export function jobInsert(data) { 
    return axios(
    {
        url: '/mmis/routine/jobinsert',
        method: 'post',
        data,
    }
)}
//刪除
export function jobDelete(data) { 
    return axios(
    {
        url: '/mmis/routine/jobdelete',
        method: 'post',
        data,
    }
)}
//修改
export function jobUpdate(data) { 
    return axios(
    {
        url: '/mmis/routine/jobupdate',
        method: 'post',
        data,
    }
)}