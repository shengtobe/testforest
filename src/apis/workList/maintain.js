// ------------ 維修、養護科工單 API -----------------

import axios from '@/apis/axiosSetting'

// 匯出工單
export function exportWorkList(data) { return axios(
    {
        url: '/mmis/order/export_excel',
        method: 'post',
        data,
    }
)}

// 請求廠商名單
export function fetchFirmList(data) { return axios(
    {
        url: '/global/outsourcedata/querylist',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv1
export function fetchEqCodeLv1(data) { return axios(
    {
        url: '/global/dev/querylv1',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv2
export function fetchEqCodeLv2(data) { return axios(
    {
        url: '/global/dev/querylv2',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv3
export function fetchEqCodeLv3(data) { return axios(
    {
        url: '/global/dev/querylv3',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv4
export function fetchEqCodeLv4(data) { return axios(
    {
        url: '/global/dev/querylv4',
        method: 'post',
        data,
    }
)}

// 工單搜尋
export function fetchOrderList(data) { return axios(
    {
        url: '/mmis/order/queryarray',
        method: 'post',
        data,
    }
)}

// 工單建立
export function createWorkOrder(data) { return axios(
    {
        url: '/mmis/order/create',
        method: 'post',
        data,
    }
)}

// 刪除工單
export function deleteOrder(data) { return axios(
    {
        url: '/mmis/order/delete',
        method: 'delete',
        data,
    }
)}

// 取得單一筆工單詳細資料
export function fetchWorkOrderOne(data) { return axios(
    {
        url: '/mmis/order/querydetail',
        method: 'post',
        data,
    }
)}

// 取得證照人員資料
export function fetchLicenseManData(data) { return axios(
    {
        url: '/global/licensedata/querylist',
        method: 'post',
        data,
    }
)}

// 更新工單
export function updateListOrder(data) { return axios(
    {
        url: '/mmis/order/update',
        method: 'post',
        data,
    }
)}

// 派工頁送出
export function dispatchOrder(data) { return axios(
    {
        url: '/mmis/order/dispatch',
        method: 'post',
        data,
    }
)}

// 維修頁送出
export function maintainOrder(data) { return axios(
    {
        url: '/mmis/order/maintain',
        method: 'post',
        data,
    }
)}

// 查詢工作項
export function fetchJobName(data) { return axios(
    {
        url: '/global/dev/jobname',
        method: 'post',
        data,
    }
)}

// 驗收頁送出
export function acceptanceOrder(data) { return axios(
    {
        url: '/mmis/order/acceptance',
        method: 'post',
        data,
    }
)}

// 結案送出
export function closeOrder(data) { return axios(
    {
        url: '/mmis/order/close',
        method: 'post',
        data,
    }
)}

// 退回
export function withdrawOrder(data) { return axios(
    {
        url: '/mmis/order/return',
        method: 'put',
        data,
    }
)}

// 徹銷
export function cancelOrder(data) { return axios(
    {
        url: '/mmis/order/cancel',
        method: 'delete',
        data,
    }
)}

//  延後驗收
export function delayOrder(data) { return axios(
    {
        url: '/mmis/order/delay',
        method: 'put',
        data,
    }
)}

//  平交道項目清單
export function railroadrepairList(data) { return axios(
    {
        url: '/mmis/order/railroadrepair/query',
        method: 'post',
        data,
    }
)}

//  查詢員工所屬的部門主管資料
export function fetchSupervisor(data) { return axios(
    {
        url: '/global/depart/supervisor',
        method: 'post',
        data,
    }
)}

