// -------- 共通的函式 --------

// 取得目前時間(格式為 西元年-月-日 時:分:秒)
export function getNowFullTime() {
    let t = new Date()

    // 小於10的時間前面都補 0
    let o = {
        year: t.getFullYear(),
        month: (t.getMonth() + 1 < 10) ? '0' + (t.getMonth() + 1) : t.getMonth() + 1,
        day: (t.getDate() < 10) ? '0' + t.getDate() : t.getDate(),
        hour: (t.getHours() < 10) ? '0' + t.getHours() : t.getHours(),
        min: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes(),
        sec: (t.getSeconds() < 10) ? '0' + t.getSeconds() : t.getSeconds(),
        ms: (t.getMilliseconds() < 10) ? '00' + t.getMilliseconds() : ((t.getMilliseconds() < 100) ? '0' + t.getMilliseconds() : t.getMilliseconds()),
    }
    // ISO 8601 時間格式
    return `${o.year}-${o.month}-${o.day} ${o.hour}:${o.min}:${o.sec}.${o.ms}`
}

// 表單欄位驗證
// 參數說明： arr 陣列
// 陣列元素為物件，範例：{ label: 欄位名稱, target: 欄位 v-model 綁定的變數, errTarget: data 中 errorIpt 物件綁定的錯誤欄位顏色屬性變數 }
export function verifyIptError(arr, vm) {
    let errArr = []

    arr.forEach(function (item) {
        if (item.target == '') {
            vm.errorIpt[item.errTarget] = 'red lighten-5'
            errArr.push(item.label)
        } else {
            vm.errorIpt[item.errTarget] = ''
        }
    })

    alert('送出失敗，請確認「' + errArr.join('、') + '」欄位是否填寫，格式是否正確')
}

// 表單防止SQL inject
//參數說明：不安全字串
//回傳值：安全字串
export function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

//表單-把防止的代換換回來
//參數說明：安全字串
//回傳值：不安全字串
export function unescapeHtml(safeString) {
    return safeString
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "\'")
}

//表單-把物件內部的參數只要是字串的都替換掉，防止inject
//參數說明：需要替換的物件物件
//回傳值：代換過的物件
export function encodeObject(unsafeObject) {
    let safeObject = {}
    const objectKeys = Object.keys(unsafeObject)
    objectKeys.forEach((element) => {
        if (typeof (unsafeObject[element]) == 'string') {
            safeObject[element] = escapeHtml(unsafeObject[element])
        } else if (typeof (unsafeObject[element]) == 'object') {
            safeObject[element] = encodeObject(unsafeObject[element])
        } else {
            safeObject[element] = unsafeObject[element]
        }
    })
    if (Array.isArray(unsafeObject)) {
        return objToArr(safeObject)
    } else {
        return safeObject
    }
}
//表單-把物件內部被替換過的字串換回來
//參數說明：被替換過的物件
//回傳值：原始物件
export function decodeObject(safeObject) {
    let unsafeObject = {}
    const objectKeys = Object.keys(safeObject)
    objectKeys.forEach((element) => {
        if (typeof (safeObject[element]) == 'string') {
            unsafeObject[element] = unescapeHtml(safeObject[element])
        } else if (typeof (safeObject[element]) == 'object') {
            unsafeObject[element] = decodeObject(safeObject[element])
        } else {
            unsafeObject[element] = safeObject[element]
        }
    })
    if (Array.isArray(safeObject)) {
        return objToArr(unsafeObject)
    } else {
        return unsafeObject
    }
}
//將傳入值從物件變成依照key值排序過的array
//參數說明：要轉換的物件
//回傳值：陣列
export function objToArr(obj) {
    let resArray = []
    const objectKeys = Object.keys(obj)
    objectKeys.sort()
    objectKeys.forEach((element) => resArray.push(obj[element]))
    return resArray
}

export function getTodayDateString() {
    //更新時間
    var today = new Date();
    let mStr = today.getMonth() + 1;
    let dStr = today.getDate();
    if (mStr < 10) {
        mStr = "0" + mStr;
    }
    if (dStr < 10) {
        dStr = "0" + dStr;
    }
    return today.getFullYear() + "-" + mStr + "-" + dStr;
}

export function unique(list) {
    var arr = [];
    let b = false;
    let id = 0;
    for (var i = 0; i < list.length; i++) {
        if (i == 0) {
            list[i].PageNo = ++id;
            arr.push(list[i]);
        }
        b = false;
        if (arr.length > 0 && i > 0) {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].RPFlowNo == list[i].RPFlowNo) {
                    b = true;
                    //break;
                }
            }
            if (!b) {
                list[i].PageNo = ++id;
                arr.push(list[i]);
            }
        }
    }
    return arr;
}