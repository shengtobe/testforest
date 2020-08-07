// -------- 行車危害資料庫 -------

export const CarHarmdbRouter = [
    {
        linkText: '行車危害',  // 搜尋頁
        path: '/smis/car-harmdb/harms',
        component: () => import('@/views/smis/CarHarmDatabase/harms/Search.vue')
    },
    {
        linkText: '危害控制措施',
        path: '/smis/car-harmdb/control-measures',
        component: () => import('@/views/smis/CarHarmDatabase/controlMeasures/Search.vue')
    },
]