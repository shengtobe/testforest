import { 
    SET_USER_PROFILE,
    SET_USER_GROUP,
    SET_FUNCID_LIST
} from '../mutation-types'

// state
const state = {
    userData: null,  // 使用者基本資料
    groupData: null,  // 使用者權限(群組)資料
    funcIdList: [], // 可訪問功能之清單
    key: [ 15, 21, 3, 45, 5, 206, 137, 98, 59, 110, 121, 212, 13, 14, 215, 176 ],  // 128 位元的金鑰(數字限制 0~255)
}

// getters
const getters = {
    
}

// mutations
const mutations = {
    // 設定使用者基本資料
    [SET_USER_PROFILE] (state, payload) {
        state.userData = payload  //是否顯示
    },
    // 設定使用者權限(群組)資料
    [SET_USER_GROUP] (state, payload) {
        state.groupData = payload  //是否顯示
    },
    // 設定可訪問功能之清單
    [SET_FUNCID_LIST] (state, payload) {
        state.funcIdList = payload  //是否顯示
    },
}

// actions
const actions = {
    // 儲存使用者基本資料
    saveUserProfile ({ commit }, payload) {
        commit('SET_USER_PROFILE', payload)
    },
    // 儲存使用者權限(群組)資料
    saveUserGroup ({ commit }, payload) {
        commit('SET_USER_GROUP', payload)
    },
    // 儲存可訪問功能之清單
    saveFuncIdList ({ commit }, payload) {
        commit('SET_FUNCID_LIST', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}


// -------- 使用者登入時回傳的資料範例 ---------
/*
{
    "ErrorCode": 0,
    "Msg": null,
    "GroupData": {
        "RoleLv1": "T",
        "RoleLv2": "T",
        "RoleLv3": "F",
        "RoleLv4": "F",
        "RoleLv5": "F"
    },
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...",
    "UserData": {
        "BackendPrivilege": 0,
        "DeptList": [
            {
                "DeptDesc": "鐵路服務科",
                "DeptId": "ARCO004"
            }
        ],
        "Email": "",
        "JobCode": "19",
        "JobName": "科長",
        "JobStatue": "1",
        "PeopleBirthday": "1970/1/15 上午 12:00:00",
        "PeopleSex": "2",
        "TypeCode": "01",
        "TypeName": "正式人員",
        "UserId": "01009",
        "UserName": "洪淑霞",
        "Version": "0.0.1",
    },
    "UserDataSample": null
}
*/