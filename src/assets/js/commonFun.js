// -------- 共通的函式 --------

// 取得目前時間(格式為 西元年-月-日 時:分:秒)
export function getNowFullTime() {
    let t = new Date()

    // 小於10的時間前面都補 0
    let o = {
        year: t.getFullYear(),
        month: (t.getMonth()+1 < 10)? '0'+(t.getMonth()+1) : t.getMonth()+1,
        day: (t.getDate() < 10)? '0'+ t.getDate() : t.getDate(),
        hour: (t.getHours() < 10)? '0'+ t.getHours() : t.getHours(),
        min: (t.getMinutes() < 10)? '0'+ t.getMinutes() : t.getMinutes(),
        sec: (t.getSeconds() < 10)? '0'+ t.getSeconds() : t.getSeconds(),
        ms: (t.getMilliseconds() < 10)? '00'+ t.getMilliseconds() : ((t.getMilliseconds() < 100)? '0'+ t.getMilliseconds() : t.getMilliseconds()),
    }
    // ISO 8601 時間格式
    return `${o.year}-${o.month}-${o.day} ${o.hour}:${o.min}:${o.sec}.${o.ms}`
}

// 表單欄位驗證
// 參數說明： arr 陣列
// 陣列元素為物件，範例：{ label: 欄位名稱, target: 欄位 v-model 綁定的變數, errTarget: data 中 errorIpt 物件綁定的錯誤欄位顏色屬性變數 }
export function verifyIptError(arr, vm) {
    let errArr = []

    arr.forEach(function(item) {
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
    console.log(unsafe)
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }