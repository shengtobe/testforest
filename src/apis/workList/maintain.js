// ------------ 維修、養護科工單 api -----------------

import axios from '@/apis/axiosSetting'

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

// 更新工單
export function updateListOrder(data) { return axios(
    {
        url: '/mmis/order/update',
        method: 'post',
        data,
    }
)}

// 派工
export function dispatchOrder(data) { return axios(
    {
        url: '/mmis/order/dispatch',
        method: 'post',
        data,
    }
)}

// 維修
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