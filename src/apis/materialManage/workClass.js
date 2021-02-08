//工班
import axios from '@/apis/axiosSetting'

//清單
export function classQueryList(data) { 
    return axios(
    {
        url: '/mmis/workclass/classquerylist',
        method: 'post',
        data,
    }
)}
//明細
export function classQuery(data) { 
    return axios(
    {
        url: '/mmis/workclass/classquery',
        method: 'post',
        data,
    }
)}
//新增
export function classInsert(data) { 
    return axios(
    {
        url: '/mmis/workclass/classinsert',
        method: 'post',
        data,
    }
)}
//刪除
export function classDelete(data) { 
    return axios(
    {
        url: '/mmis/workclass/classdelete',
        method: 'post',
        data,
    }
)}
//修改
export function classUpdate(data) { 
    return axios(
    {
        url: '/mmis/workclass/classupdate',
        method: 'post',
        data,
    }
)}