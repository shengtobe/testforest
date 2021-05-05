// -------- 危害通報管理 -------
import axios from '@/apis/axiosSetting'
import { checkEnter, canInUpdate } from '@/apis/access'
import store from '@/store/index'
import { getNowFullTime} from '@/assets/js/commonFun'


export const HarmnotifyRouter = [
    {
        linkText: '通報新增',  // 危害通報
        path: '/smis/harmnotify/notify', 
        component: () => import('@/views/smis/harmNotify/Form.vue'),
        beforeEnter: (to, from, next) => {
            console.log("通報新增beforeEnter")
            console.log("store3:" , store.state.user.groupData);
            const obb = {
                "FuncName":"SMS_2",
                ...store.state.user.groupData
                // "RoleLv1":store.state.user.groupData.RoleLv1,
                // "RoleLv2":store.state.user.groupData.RoleLv2,
                // "RoleLv3":store.state.user.groupData.RoleLv3,
                // "RoleLv4":store.state.user.groupData.RoleLv4,
                // "RoleLv5":store.state.user.groupData.RoleLv5
            }
            checkEnter(obb).then(res => {
                console.log("res.data: ", res.data);
                if (res.data.CanIn == 'False') next('/')
                else next()
            }).catch( err => {
                console.log(err)
                next('/')
            }).finally(() => {
            })
        }
        
    },
    {
        linkText: '通報查詢',
        path: '/smis/harmnotify/audit', 
        component: () => import('@/views/smis/harmNotify/Search.vue'),
        beforeEnter: (to, from, next) => {
            console.log("通報查詢beforeEnter")
            console.log("store3:" , store.state.user.groupData);
            const obb = {
                FuncName:"SMS_1",
                ...store.state.user.groupData,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                // "RoleLv1":store.state.user.groupData.RoleLv1,
                // "RoleLv2":store.state.user.groupData.RoleLv2,
                // "RoleLv3":store.state.user.groupData.RoleLv3,
                // "RoleLv4":store.state.user.groupData.RoleLv4,
                // "RoleLv5":store.state.user.groupData.RoleLv5
            }
            checkEnter(obb).then(res => {
                console.log("res.data: ", res.data);
                if (res.data.CanIn == 'False'){
                    canInUpdate({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: store.state.user.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                          console.log("🏆🏆res.data: ", res.data)
                        }
                    }).catch( err => {
                        console.log(err)
                    }).finally(() => {
                    })
                    next('/') // 回首頁
                }
                else next()
            }).catch( err => {
                console.log(err)
                next('/')
            }).finally(() => {
            })
        }
    },
    {
        linkText: '通報詳細內容',
        path: '/smis/harmnotify/:id/show', 
        component: () => import('@/views/smis/harmNotify/PageRouter.vue'),
        props: true,
    },
    {
        linkText: '立案類型統計圖',
        path: '/smis/harmnotify/case-type', 
        component: () => import('@/views/smis/harmNotify/CaseType.vue')
    },
    {
        linkText: '各部門通報次數趨勢',
        path: '/smis/harmnotify/department-notify', 
        component: () => import('@/views/smis/harmNotify/DepartNotify.vue')
    },
    {
        linkText: '各類通報趨勢圖',
        path: '/smis/harmnotify/type-notify', 
        component: () => import('@/views/smis/harmNotify/TypeNotify.vue')
    },
]