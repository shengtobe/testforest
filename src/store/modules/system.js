import {
    SET_SYSTEM_DIALOG,
    SET_SYSTEM_MSGBAR,
    TOGGLE_SYSTEM_LOADING,
    SET_SYSTEM_VIEW_DIALOG
} from '../mutation-types'


// state
const state = {
    dialog: {  // 重要訊息 dialog (用於顯示單行文字內容，點右上x才能關視窗)
        show: false,  // 是否顯示
        msg: '',  // 文字訊息
    },
    msgbar: {  // 右上角小訊息 (用於題示動作是否成功)
        show: false,  // 是否顯示
        msg: '',  // 文字訊息
        color: 'green accent-4',  // 顏色
        icon: 'mdi-check-circle-outline',  // icon
    },
    loading: {  // loading 圖
        show: false  // 是否顯示
    },
    viewDialog: {  // 檢視內容 dialog (用於顯示 v-html 內容)
        show: false,  // 是否顯示
        content: '',  // 內容文字
    },
}

// getters
const getters = {

}

// mutations
const mutations = {
    // 設定重要訊息 dialog
    [SET_SYSTEM_DIALOG](state, payload) {
        state.dialog.show = payload.show  // dialog 是否顯示
        state.dialog.msg = (payload.msg == undefined) ? '' : payload.msg  // 沒內容就設為空字串
    },
    // 設定 messageBar
    [SET_SYSTEM_MSGBAR](state, payload) {
        // 依是否成功來判斷樣式
        state.msgbar.icon = (payload.success) ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline'
        state.msgbar.color = (payload.success) ? 'green accent-4' : 'red'
        state.msgbar.show = true  // 顯示 msgbar
        state.msgbar.msg = (payload.msg == undefined) ? '' : payload.msg  // 沒內容就設為空字串
    },
    // 切換 loading 圖顯示
    [TOGGLE_SYSTEM_LOADING](state, payload) {
        state.loading.show = payload.show
    },
    // 設定檢視內容 dialog
    [SET_SYSTEM_VIEW_DIALOG](state, payload) {
        state.viewDialog.show = payload.show  // 是否顯示
        state.viewDialog.content = (payload.content == undefined) ? '' : payload.content  // 沒內容就設為空字串
    },
}

// actions
const actions = {
    // 改變重要訊息 dialog 內容及顯示
    chDialog({ commit }, payload) {
        commit('SET_SYSTEM_DIALOG', payload)
    },
    // 改變 messageBar 內容
    chMsgbar({ commit }, payload) {
        commit('SET_SYSTEM_MSGBAR', payload)
    },
    // 切換 loading 圖顯示 是否顯示
    chLoadingShow({ commit }, payload) {
        commit('TOGGLE_SYSTEM_LOADING', payload)
    },
    // 改變檢視內容 dialog 內容及顯示
    chViewDialog({ commit }, payload) {
        commit('SET_SYSTEM_VIEW_DIALOG', payload)
    },
    // 關閉視窗 (用於關另開的分頁)
    closeWindow() {
        window.close()
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}