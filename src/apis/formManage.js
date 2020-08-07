// -------- 表單的 API --------

import axios from './axiosSetting'

// // 查詢圖片
// export function serveNewListExecl(data) { return axios(
//     {
//         url: '/user/excel/create',
//         method: 'post',
//         data,
//     }
// )}

// 上傳掃描圖表單的圖片
export function uploadImgForm(data) { return axios(
    {
        url: '/mmis/scan/upload',
        method: 'post',
        data: data.file,  // 檔案(blob)
        // axios 的 Content-Type 預設是 json，所以要改成 multipart/form-data
        headers: {
            Dep: data.dep,  // 科室
            Uid: data.uid,  // 使用者id
            Fid: data.fid,  // 表單id
            ClientReqTime: data.reqTime,  // 請求時間
            'Content-Type': 'multipart/form-data',
        }
    }
)}