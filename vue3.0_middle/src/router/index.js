import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                //
                {
                    //客户管理
                    path: '/khmanagement',
                    component: resolve => require(['../components/page/customerMent/khmanagement.vue'], resolve),
                    meta: { title: '客户管理' }
                },
                {
                    //客户详情
                    path: '/customerdetails',
                    component: resolve => require(['../components/page/customerMent/customerdetails.vue'], resolve),
                    meta: { title: '客户详情' }
                },
                {
                    //添加客户
                    path: '/addcustomer',
                    component: resolve => require(['../components/page/customerMent/addcustomer.vue'], resolve),
                    meta: { title: '添加客户' }
                },
                {
                    //编辑客户
                    path: '/updatecustomer',
                    component: resolve => require(['../components/page/customerMent/updatecustomer.vue'], resolve),
                    meta: { title: '编辑客户' }
                },
                {
                    //导入客户
                    path: '/importcustomer',
                    component: resolve => require(['../components/page/customerMent/importcustomer.vue'], resolve),
                    meta: { title: '导入客户' }
                },
                {
                    //承运管理 --车辆管理
                    path: '/vehiclement',
                    component: resolve => require(['../components/page/carriageMent/vehiclement.vue'], resolve),
                    meta: { title: '车辆管理' }
                },
                {
                    //承运管理 --添加车辆
                    path: '/addvehicle',
                    component: resolve => require(['../components/page/carriageMent/addvehicle.vue'], resolve),
                    meta: { title: '添加车辆' }
                },
                {
                    //承运管理 --车队管理
                    path: '/fleetement',
                    component: resolve => require(['../components/page/carriageMent/fleetement.vue'], resolve),
                    meta: { title: '车队管理' }
                },
                {
                    //承运管理 --车队详情
                    path: '/fleetdetail',
                    component: resolve => require(['../components/page/carriageMent/fleetdetail.vue'], resolve),
                    meta: { title: '车队详情' }
                },
                {
                    //承运管理 --路线管理
                    path: '/routement',
                    component: resolve => require(['../components/page/carriageMent/routement.vue'], resolve),
                    meta: { title: '路线管理' }
                },
                {
                    //承运管理 --路线详情
                    path: '/routedetail',
                    component: resolve => require(['../components/page/carriageMent/routedetail.vue'], resolve),
                    meta: { title: '路线详情' }
                },
                {
                    //仓库管理 --仓库管理
                    path: '/housement',
                    component: resolve => require(['../components/page/houseMent/housement.vue'], resolve),
                    meta: { title: '仓库管理' }
                },
                {
                    //仓库管理 --仓库详情
                    path: '/housedetail',
                    component: resolve => require(['../components/page/houseMent/housedetail.vue'], resolve),
                    meta: { title: '仓库详情' }
                },
                {
                    //仓库管理 --库房详情
                    path: '/roomdetail',
                    component: resolve => require(['../components/page/houseMent/roomdetail.vue'], resolve),
                    meta: { title: '库房详情' }
                },
                {
                    //仓库管理 --库区详情
                    path: '/areadetail',
                    component: resolve => require(['../components/page/houseMent/areadetail.vue'], resolve),
                    meta: { title: '库区详情' }
                },
                {
                    //仓库管理 --添加库位
                    path: '/addbin',
                    component: resolve => require(['../components/page/houseMent/addbin.vue'], resolve),
                    meta: { title: '添加库位' }
                },
                {
                    //仓库管理 --批量添加库位
                    path: '/bathaddbin',
                    component: resolve => require(['../components/page/houseMent/bathaddbin.vue'], resolve),
                    meta: { title: '批量添加库位' }
                },
                {
                    //仓库管理 --库位详情
                    path: '/bindetail',
                    component: resolve => require(['../components/page/houseMent/bindetail.vue'], resolve),
                    meta: { title: '库位详情' }
                },
                {
                    //仓库管理 --编辑库位
                    path: '/editbin',
                    component: resolve => require(['../components/page/houseMent/editbin.vue'], resolve),
                    meta: { title: '编辑库位' }
                },
                {
                    //仓库管理 --停车位管理
                    path: '/parkingment',
                    component: resolve => require(['../components/page/houseMent/parkingment.vue'], resolve),
                    meta: { title: '停车位管理' }
                },
                {
                    //仓库管理 --班次管理
                    path: '/shiftsment',
                    component: resolve => require(['../components/page/houseMent/shiftsment.vue'], resolve),
                    meta: { title: '班次管理' }
                },
                {
                    //仓库管理 --码货标准
                    path: '/codegoods',
                    component: resolve => require(['../components/page/houseMent/codegoods.vue'], resolve),
                    meta: { title: '码货标准' }
                },
                {
                    //生产线管理 --生产线管理
                    path: '/linement',
                    component: resolve => require(['../components/page/lineMent/linement.vue'], resolve),
                    meta: { title: '生产线管理' }
                },
                {
                    //生产线管理 --添加生产线
                    path: '/addline',
                    component: resolve => require(['../components/page/lineMent/addline.vue'], resolve),
                    meta: { title: '添加生产线' }
                },
                {
                    //生产线管理 --编辑生产线
                    path: '/editline',
                    component: resolve => require(['../components/page/lineMent/editline.vue'], resolve),
                    meta: { title: '编辑生产线' }
                },
                {
                    //生产线管理 --产能管理
                    path: '/capacityment',
                    component: resolve => require(['../components/page/lineMent/capacityment.vue'], resolve),
                    meta: { title: '产能管理' }
                },
                {
                    //生产线管理 --订单排产
                    path: '/orderscheduling',
                    component: resolve => require(['../components/page/lineMent/orderscheduling.vue'], resolve),
                    meta: { title: '订单排产' }
                },
                {
                    //生产线管理 --添加排产计划
                    path: '/addorder',
                    component: resolve => require(['../components/page/lineMent/addorder.vue'], resolve),
                    meta: { title: '添加排产计划' }
                },
                {
                    //生产线管理 --选择生产线
                    path: '/selectline',
                    component: resolve => require(['../components/page/lineMent/selectline.vue'], resolve),
                    meta: { title: '选择生产线' }
                },
                {
                    //生产线管理 --预览计划
                    path: '/seeplan',
                    component: resolve => require(['../components/page/lineMent/seeplan.vue'], resolve),
                    meta: { title: '预览计划' }
                },
                {
                    //人员管理 --组织结构
                    path: '/structure',
                    component: resolve => require(['../components/page/personnelMent/structure.vue'], resolve),
                    meta: { title: '组织结构' }
                },
                {
                    //人员管理 --人员管理
                    path: '/personnel',
                    component: resolve => require(['../components/page/personnelMent/personnel.vue'], resolve),
                    meta: { title: '人员管理' }
                },
                {
                    //人员管理 --职位权限
                    path: '/authority',
                    component: resolve => require(['../components/page/personnelMent/authority.vue'], resolve),
                    meta: { title: '职位权限' }
                },
                // 
                {
                    path: '/articleRun',
                    component: resolve => require(['../components/page/article/articleRun.vue'], resolve),
                    meta: { title: '物品列表' }
                },
                {
                    path: '/addarticel',
                    component: resolve => require(['../components/page/article/addarticel.vue'], resolve),
                    meta: { title: '添加物品' }
                },
                {
                    path: '/sendForm',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '采购单' }
                },
                {
                    path: '/delivery',
                    component: resolve => require(['../components/page/delivery.vue'], resolve),
                    meta: { title: '送货单' }
                },
                {
                    path: '/deliveryNote',
                    component: resolve => require(['../components/page/deliveryNote.vue'], resolve),
                    meta: { title: '送货单详情' }
                },
                {
                    path: '/addoderList',
                    component: resolve => require(['../components/page/addoderList.vue'], resolve),
                    meta: { title: '新建送货单' }
                },
                {
                    path: '/addbill',
                    component: resolve => require(['../components/page/addbill.vue'], resolve),
                    meta: { title: '新建采购单' }
                },
                {
                    path: '/billDetail',
                    component: resolve => require(['../components/page/billDetail.vue'], resolve),
                    meta: { title: '采购单详情' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/pickForm',
                    component: resolve => require(['../components/page/pickForm.vue'], resolve),
                    meta: { title: '采购单拆单' }
                },
                {
                    // 图片上传组件
                    path: '/demolition',
                    component: resolve => require(['../components/page/demolition.vue'], resolve),
                    meta: { title: '拆单详情' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
