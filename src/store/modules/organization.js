import { 
    SET_ORGANIZE_SHOW,
    SET_ORGANIZE_CHOSE,
    SET_ORGANIZE_ALL,
} from '../mutation-types'

// state
const state = {
    show: false,  // dialog 是否顯示
    all: {},  // 所有資料
    chose: {  // 所選的員工資料
        uid: '',  // uid
        name: '',  // 姓名
    },
}

// getters
const getters = {
    
}

// mutations
const mutations = {
    // 設定 show
    [SET_ORGANIZE_SHOW] (state) {
        state.show = !state.show
    },
    // 設定選擇的員工資料
    [SET_ORGANIZE_CHOSE] (state, payload) {
        state.chose = { ...payload }
    },
    // 設定向後端取得的所有資料
    [SET_ORGANIZE_ALL] (state, payload) {
        state.all = {
            depart1: payload.user_depart_list_group_1,
            depart2: payload.user_depart_list_group_2,
            depart3: payload.user_depart_list_group_3,
            users: payload.user_list_group_4,
        }
    },
}

// actions
const actions = {
    // toggle show 的顯示
    toggleShow ({ commit }) {
        commit('SET_ORGANIZE_SHOW')
    },
    // 改變所選的員工資料
    chChose({ commit }, payload) {
        commit('SET_ORGANIZE_CHOSE', payload)  // 設定選擇的員工資料
    },
    // 設定所有資料
    setAllData({ commit }, payload) {
        commit('SET_ORGANIZE_ALL', payload)  // 設定向後端取得的所有資料
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

/*
API response 範例：

user_depart_list_group_1: [
    {
        DepartChild: "F"
        DepartCode: "SYSTEM"
        DepartName: "系統部門"
        DepartParentCode: "1"
        DepartParentName: "阿里山林業鐵路及文化資產管理處"
        UserId: null
        UserName: null
    }
]

user_depart_list_group_2: [
    {
        DepartChild: "F"
        DepartCode: "ARCO006"
        DepartName: "北門車站"
        DepartParentCode: "9"
        DepartParentName: "鐵路服務科"
        UserId: null
        UserName: null
    }
]

user_depart_list_group_3: [
    {
        DepartChild: "F"
        DepartCode: "ARCO028"
        DepartName: "第1道班(北門)"
        DepartParentCode: "21"
        DepartParentName: "竹崎監工區"
        UserId: null
        UserName: null
    }
]

user_list_group_4: [
    {
        DepartChild: null
        DepartCode: "ARCO021"
        DepartName: "嘉義車庫"
        DepartParentCode: null
        DepartParentName: null
        UserId: "16413"
        UserName: "林國煌"
    }
]

*/