/*
 * @Description: In User Settings Edit
 * @Author: sailei
 * @Date: 2018-12-12 20:04:29
 */
import Vue from 'vue'
import Router from 'vue-router'

//路由组件按需加载

const Home = () => import('./views/Home.vue')
const Login = () => import('./views/Login.vue')

const SignIner = () => import('./components/common/SignIn.vue') //安全签到  
const Instructioner = () => import('./components/common/instructioner.vue') //签到介绍 
const SignIner1 = () => import('./components/common/SignIn1.vue') //上班签到
const Bodyment = () => import('./components/common/bodyment.vue') //身体检测
const CarPosition = () => import('./components/common/CarPosition.vue') //车辆位置
const trajectory = () => import('./components/common/trajectory.vue') //车辆位置
const WorkScheduleRule = () => import('./components/common/WorkScheduleRule.vue') //排班计划
const MyAddress = () => import('./components/common/MyAddress.vue') //

const PhoneShow = () => import('./components/common/PhoneShow.vue') //照片查看


const VehicleIndex = () => import('./components/common/FleetSelection/VehicleIndex.vue')
const FleetSelection = () => import('./components/common/FleetSelection/children/FleetSelection.vue') //车队选择
const VehicleSelection = () => import('./components/common/FleetSelection/children/VehicleSelection.vue') //车辆选择
const TemporaryVehicleSelection = () => import('./components/common/FleetSelection/children/TemporaryVehicleSelection.vue') //临时车辆选择
/////
/* --------品控员--------- */
const ShopTest = () => import('./components/pingkunMent/productionTesting/shopTest.vue') //生产检验
const ShopTestShow = () => import('./components/pingkunMent/productionTesting/shopTestShow.vue') //生产货品详情
const IntgoodTest = () => import('./components/pingkunMent/intgoodTesting/intgoodTest.vue') //来货检验
const IntgoodTestShow = () => import('./components/pingkunMent/intgoodTesting/intgoodTestShow.vue') //来货货品详情
const RevolveTest = () => import('./components/pingkunMent/revolveTesting/revolveTest.vue') //周转包材检验
const RevolveTestShow = () => import('./components/pingkunMent/revolveTesting/revolveTestShow.vue') //周转包材货品详情
const OldgoodTest = () => import('./components/pingkunMent/oldgoodTesting/oldgoodTest.vue') //原材料检验
const OldgoodTestShow = () => import('./components/pingkunMent/oldgoodTesting/oldgoodTestShow.vue') //原材料货品详情

/* --------生产员--------- */

const ProducingAnomaly = () => import('./components/manufacturingWorker/producingAnomaly/index.vue') //生产异常
const ExceptionRecord = () => import('./components/manufacturingWorker/exceptionRecord/index.vue') //异常记录
const Daily = () => import('./components/manufacturingWorker/exceptionRecord/children/daily.vue') //日统计
const Monthly = () => import('./components/manufacturingWorker/exceptionRecord/children/monthly.vue') //月统计
const Year = () => import('./components/manufacturingWorker/exceptionRecord/children/year.vue') //年统计


const OutputStatistics = () => import('./components/manufacturingWorker/outputStatistics/index.vue') //产量统计
const Cbanoutput = () => import('./components/manufacturingWorker/outputStatistics/children/banoutput.vue') //班产量
const Cdaily = () => import('./components/manufacturingWorker/outputStatistics/children/outdaily.vue') //日统计
const Cmonthly = () => import('./components/manufacturingWorker/outputStatistics/children/outmonthly.vue') //月统计

/* --------酒精测试员--------- */
const AlcoholTester = () => import('./components/AlcoholTester/index.vue') //酒精测试员
const Employee = () => import('./components/AlcoholTester/children/employee.vue') //员工
const Motorman = () => import('./components/AlcoholTester/children/motorman.vue') //司机

/* --------装卸员--------- */
const ManageMent = () => import('./components/loadMent/manageMent/index.vue') //装卸员

//上线工作
const OnlineJob = () => import('./components/loadMent/onlineJob/index.vue') //上线工作
const DistributionTask = () => import('./components/loadMent/onlineJob/distributionTask.vue') //装卸任务
const LoadGuide = () => import('./components/loadMent/onlineJob/loadGuide.vue') //装卸指引
const Rest = () => import('./components/loadMent/onlineJob/rest.vue') //用餐休息
const Leave = () => import('./components/loadMent/onlineJob/leave.vue') //请假
const LoadDamage = () => import('./components/loadMent/onlineJob/loadDamage.vue') //装卸破损
const TrayDamage = () => import('./components/loadMent/onlineJob/trayDamage.vue') //托盘破损
const BrokenNumber = () => import('./components/loadMent/onlineJob/brokenNumber.vue') //破损数量
const GoodsStandard = () => import('./components/loadMent/onlineJob/goodStandard.vue') //码货标准
const WorkWork = () => import('./components/loadMent/onlineJob/workWork.vue') //下班工作

//辅材管理
const Outbound = () => import('./components/loadMent/manageMent/children/outbound.vue') //冰箱出库
const MarketSupplies = () => import('./components/loadMent/manageMent/children/marketSupplies.vue') //市场物资
const CartonRecipients = () => import('./components/loadMent/manageMent/children/cartonRecipients.vue') //纸箱领用
const Intobound = () => import('./components/loadMent/manageMent/intobound.vue') //冰箱入库
const InStock = () => import('./components/loadMent/manageMent/inStock.vue') //市场物资入库

//工作统计
const JobRecord = () => import('./components/loadMent/jobRecord/index.vue') //工作统计
const WookStatistics = () => import('./components/loadMent/jobRecord/children/wookStatistics.vue') //工作统计
const AttendanceRecord = () => import('./components/loadMent/jobRecord/children/attendanceRecord.vue') //考勤记录
const CriminalRecords = () => import('./components/loadMent/jobRecord/children/criminalRecords.vue') //违规记录
const PhotoDetail = () => import('./components/loadMent/jobRecord/photoDetail.vue') //吸烟违规
const BrokenRecord = () => import('./components/loadMent/jobRecord/children/brokenRecord.vue') //破损记录
const DamagedDetail = () => import('./components/loadMent/jobRecord/damagedDetail.vue') //破损明细

/////




/* --------车辆调度员--------- */
const LoadingManagement = () => import('./components/vehicleDispatcher/loadingManagement/index.vue')
const TimeReselect = () => import('./components/vehicleDispatcher/loadingManagement/TimeReselect.vue') //时间重选 
const AboutCar = () => import('./components/vehicleDispatcher/loadingManagement/children/aboutCar.vue') //选单派车
const CarManage = () => import('./components/vehicleDispatcher/loadingManagement/children/carManage.vue') //车辆管理
const MenuCar = () => import('./components/vehicleDispatcher/loadingManagement/children/menuCar.vue') //已约车辆
const SiteManage = () => import('./components/vehicleDispatcher/loadingManagement/children/siteManage.vue') //载重设定 
const LoadSetting = () => import('./components/vehicleDispatcher/loadingManagement/LoadSetting.vue') //现场管理
const Photograph = () => import('./components/vehicleDispatcher/loadingManagement/Photograph.vue') //拍照
const Detailed = () => import('./components/vehicleDispatcher/loadingManagement/Detailed.vue') //明细
const PaidPriceAdjustment = () => import('./components/vehicleDispatcher/loadingManagement/PaidPriceAdjustment.vue') //明细
const CompartmentPhotos = () => import('./components/vehicleDispatcher/loadingManagement/CompartmentPhotos.vue') //车厢照片
const StandardTest = () => import('./components/vehicleDispatcher/loadingManagement/StandardTest.vue') //标准检测
const CarArrester = () => import('./components/vehicleDispatcher/loadingManagement/CarArrester.vue') //标准检测
const ProtectionSafety = () => import('./components/vehicleDispatcher/loadingManagement/ProtectionSafety.vue') //标准检测
const ViolationRecord = () => import('./components/vehicleDispatcher/loadingManagement/ViolationRecord.vue') //标准检测

const deliveryManagement = () => import('./components/vehicleDispatcher/deliveryManagement/index.vue')
const VehicleCondition = () => import('./components/vehicleDispatcher/deliveryManagement/children/VehicleCondition.vue') //车辆状态
const SigningManagement = () => import('./components/vehicleDispatcher/deliveryManagement/children/SigningManagement.vue') //签单管理
const ResourceCollection = () => import('./components/vehicleDispatcher/deliveryManagement/children/ResourceCollection.vue') //资源收集
const UnloadingPhotos = () => import('./components/vehicleDispatcher/deliveryManagement/UnloadingPhotos.vue') //卸货照片
const BeDamaged = () => import('./components/vehicleDispatcher/deliveryManagement/BeDamaged.vue') //破损照片
const ContractVehicleList = () => import('./components/vehicleDispatcher/deliveryManagement/ContractVehicleList.vue') //合约车辆
const FleetSelectionList = () => import('./components/vehicleDispatcher/deliveryManagement/FleetSelectionList.vue') //车队选择


const DocumentSort = () => import('./components/vehicleDispatcher/billManagement/documentSort.vue') //人工拼车
const billManagement = () => import('./components/vehicleDispatcher/billManagement/index.vue')
const CollectionOfDocuments = () => import('./components/vehicleDispatcher/billManagement/children/CollectionOfDocuments.vue') //单据整理
const MoreThanOneCar = () => import('./components/vehicleDispatcher/billManagement/children/MoreThanOneCar.vue') //一车多单
const OneCarAndManyLibraries = () => import('./components/vehicleDispatcher/billManagement/children/OneCarAndManyLibraries.vue') //一车多库
const overweight = () => import('./components/vehicleDispatcher/billManagement/overweight.vue') //超重
const Shortage = () => import('./components/vehicleDispatcher/billManagement/Shortage.vue') //缺货
const SlowDelivery = () => import('./components/vehicleDispatcher/billManagement/SlowDelivery.vue') //缓送
const Supplement = () => import('./components/vehicleDispatcher/billManagement/Supplement.vue') //补重 
const SupplementWeight = () => import('./components/vehicleDispatcher/billManagement/SupplementWeight.vue') //补录
const DeliveryBillClient = () => import('./components/vehicleDispatcher/billManagement/DeliveryBillClient.vue') //补录
const DeliveryBillGoods = () => import('./components/vehicleDispatcher/billManagement/DeliveryBillGoods.vue') //补录
const ShippingOrder = () => import('./components/vehicleDispatcher/billManagement/ShippingOrder.vue') //补录 
const Communicate = () => import('./components/vehicleDispatcher/billManagement/Communicate.vue') //沟通 
const AssemblyWaybill = () => import('./components/vehicleDispatcher/billManagement/AssemblyWaybill.vue') //组成装运单  
const GoodsLoadingWarehouse = () => import('./components/vehicleDispatcher/billManagement/GoodsLoadingWarehouse.vue') //装货仓库
const Storehouse = () => import('./components/vehicleDispatcher/billManagement/Storehouse.vue') //装货仓库


/* --------调度统计员--------- */

const DocumentSortDis = () => import('./components/dispatchStatistician/billManagement/documentSort.vue') //人工拼车
const billManagementDis = () => import('./components/dispatchStatistician/billManagement/index.vue')
const CollectionOfDocumentsDis = () => import('./components/dispatchStatistician/billManagement/children/CollectionOfDocuments.vue') //单据整理
const MoreThanOneCarDis = () => import('./components/dispatchStatistician/billManagement/children/MoreThanOneCar.vue') //一车多单
const OneCarAndManyLibrariesDis = () => import('./components/dispatchStatistician/billManagement/children/OneCarAndManyLibraries.vue') //一车多库
const overweightDis = () => import('./components/dispatchStatistician/billManagement/overweight.vue') //超重
const ShortageDis = () => import('./components/dispatchStatistician/billManagement/Shortage.vue') //缺货
const SlowDeliveryDis = () => import('./components/dispatchStatistician/billManagement/SlowDelivery.vue') //缓送
const SupplementDis = () => import('./components/dispatchStatistician/billManagement/Supplement.vue') //补重 
const SupplementWeightDis = () => import('./components/dispatchStatistician/billManagement/SupplementWeight.vue') //补录
const DeliveryBillClientDis = () => import('./components/dispatchStatistician/billManagement/DeliveryBillClient.vue') //补录
const DeliveryBillGoodsDis = () => import('./components/dispatchStatistician/billManagement/DeliveryBillGoods.vue') //补录
const ShippingOrderDis = () => import('./components/dispatchStatistician/billManagement/ShippingOrder.vue') //补录 
const CommunicateDis = () => import('./components/dispatchStatistician/billManagement/Communicate.vue') //沟通 
const AssemblyWaybillDis = () => import('./components/dispatchStatistician/billManagement/AssemblyWaybill.vue') //组成装运单  
const GoodsLoadingWarehouseDis = () => import('./components/dispatchStatistician/billManagement/GoodsLoadingWarehouse.vue') //装货仓库
const StorehouseDis = () => import('./components/dispatchStatistician/billManagement/Storehouse.vue') //装货仓库

const sendCarWithTimeDis = () => import('./components/dispatchStatistician/sendCarWithTime/index.vue')
const TimeReselectDis = () => import('./components/dispatchStatistician/sendCarWithTime/TimeReselect.vue') //时间重选 
const AboutCarDis = () => import('./components/dispatchStatistician/sendCarWithTime/children/aboutCar.vue') //选单派车
const CarManageDis = () => import('./components/dispatchStatistician/sendCarWithTime/children/carManage.vue') //车辆管理
const MenuCarDis = () => import('./components/dispatchStatistician/sendCarWithTime/children/menuCar.vue') //已约车辆
const SiteManageDis = () => import('./components/dispatchStatistician/sendCarWithTime/children/siteManage.vue') //载重设定 
const LoadSettingDis = () => import('./components/dispatchStatistician/sendCarWithTime/LoadSetting.vue') //现场管理
const PhotographDis = () => import('./components/dispatchStatistician/sendCarWithTime/Photograph.vue') //拍照
const DetailedDis = () => import('./components/dispatchStatistician/sendCarWithTime/Detailed.vue') //明细
const PaidPriceAdjustmentDis = () => import('./components/dispatchStatistician/sendCarWithTime/PaidPriceAdjustment.vue') //明细
const CompartmentPhotosDis = () => import('./components/dispatchStatistician/sendCarWithTime/CompartmentPhotos.vue') //车厢照片
const StandardTestDis = () => import('./components/dispatchStatistician/sendCarWithTime/StandardTest.vue') //标准检测
const CarArresterDis = () => import('./components/dispatchStatistician/sendCarWithTime/CarArrester.vue') //
const ProtectionSafetyDis = () => import('./components/dispatchStatistician/sendCarWithTime/ProtectionSafety.vue') //
const ViolationRecordDis = () => import('./components/dispatchStatistician/sendCarWithTime/ViolationRecord.vue') //
const AlreadySent = () => import('./components/dispatchStatistician/sendCarWithTime/AlreadySent.vue') //
const Unissued = () => import('./components/dispatchStatistician/sendCarWithTime/Unissued.vue') //未发车辆明细
const CarShortage = () => import('./components/dispatchStatistician/sendCarWithTime/CarShortage.vue') //缺车信息
const DetailsOfGoods = () => import('./components/dispatchStatistician/sendCarWithTime/DetailsOfGoods.vue') //货品明细
const OwnedVehicle = () => import('./components/dispatchStatistician/sendCarWithTime/OwnedVehicle.vue') //货品明细




const siteManagementDis = () => import('./components/dispatchStatistician/siteManagement/index.vue')
const VehicleConditionDis = () => import('./components/dispatchStatistician/siteManagement/children/VehicleCondition.vue') //车辆状态
const SigningManagementDis = () => import('./components/dispatchStatistician/siteManagement/children/SigningManagement.vue') //签单管理
const ResourceCollectionDis = () => import('./components/dispatchStatistician/siteManagement/children/ResourceCollection.vue') //资源收集
const UnloadingPhotosDis = () => import('./components/dispatchStatistician/siteManagement/UnloadingPhotos.vue') //卸货照片
const BeDamagedDis = () => import('./components/dispatchStatistician/siteManagement/BeDamaged.vue') //破损照片
const ContractVehicleListDis = () => import('./components/dispatchStatistician/siteManagement/ContractVehicleList.vue') //合约车辆
const FleetSelectionListDis = () => import('./components/dispatchStatistician/siteManagement/FleetSelectionList.vue') //车队选择

const deliveryManagementDis = () => import('./components/dispatchStatistician/deliveryManagement/index.vue')
const DischargeCargo = () => import('./components/dispatchStatistician/deliveryManagement/children/DischargeCargo.vue') //车辆状态
const DrivingRecord = () => import('./components/dispatchStatistician/deliveryManagement/children/DrivingRecord.vue') //签单管理
const customerService = () => import('./components/dispatchStatistician/deliveryManagement/children/customerService.vue') //资源收集
const TraceBackTo = () => import('./components/dispatchStatistician/deliveryManagement/children/TraceBackTo.vue') //资源收集
const UnloadingPhotoss = () => import('./components/dispatchStatistician/deliveryManagement/UnloadingPhotoss.vue') //卸货照片



/* --------经销商收货--------- */
// 仓库管理
const WarehouseManagement = () => import('./components/dealerReceipt/warehouseManagement/index.vue')
const Accept = () => import('./components/dealerReceipt/warehouseManagement/accept.vue') //通知来货
const Arrival = () => import('./components/dealerReceipt/warehouseManagement/arrival.vue') //入库验收
const Sign = () => import('./components/dealerReceipt/warehouseManagement/sign.vue') //货物签收
const Tray = () => import('./components/dealerReceipt/warehouseManagement/tray.vue') //托盘交收
const DeliveryDetails = () => import('./components/dealerReceipt/warehouseManagement/children/deliveryDetails.vue') //送货单明细
const ReceiptConfirm = () => import('./components/dealerReceipt/warehouseManagement/children/receiptConfirm.vue') //收货确认
const BrokenClaim = () => import('./components/dealerReceipt/warehouseManagement/children/brokenClaim.vue') //破损处理
const ReceiptComplete = () => import('./components/dealerReceipt/warehouseManagement/children/receiptComplete.vue') //收货完成
const CustomerReceipt = () => import('./components/dealerReceipt/warehouseManagement/children/customerReceipt.vue') //客户签收
//包材管理
const PackageManagement = () => import('./components/dealerReceipt/packageManagement/index.vue')
const PackageTray = () => import('./components/dealerReceipt/packageManagement/tray.vue') //托盘管理
const BottleBox = () => import('./components/dealerReceipt/packageManagement/box.vue') //瓶箱管理
const WithdrawApplication = () => import('./components/dealerReceipt/packageManagement/children/withdrawAct.vue') //退托申请
const ExpirationDetails = () => import('./components/dealerReceipt/packageManagement/children/expirationDetails.vue') //退托申请

/* --------大货车司机--------- */
const DetailsOfGoodss = () => import('./components/bigTruckDriver/DetailsOfGoodss.vue') //货品详情
const OrderConfirm = () => import('./components/bigTruckDriver/orderConfirm.vue') //接单确认
const ArrivalTime = () => import('./components/bigTruckDriver/ArrivalTime.vue') //接单确认
const JobDetails = () => import('./components/bigTruckDriver/jobDetails.vue') //作业明细
const Freight = () => import('./components/bigTruckDriver/freight.vue') //运费信息
const LoadNav = () => import('./components/bigTruckDriver/loadNav.vue') //装货导航
const CabinHygiene = () => import('./components/bigTruckDriver/cabinHygiene.vue') //车厢卫生
const SignIn = () => import('./components/bigTruckDriver/signIn.vue') //安全签到
const Instruction = () => import('./components/bigTruckDriver/instruction.vue') //入厂需知
const Queue = () => import('./components/bigTruckDriver/queue.vue') //排队入厂  
const IntoFacNav = () => import('./components/bigTruckDriver/intoFacNav.vue') //入厂导航
const IntoFacNav1 = () => import('./components/bigTruckDriver/intoFacNav1.vue') //入厂导航1

const BlockerPhotograph = () => import('./components/bigTruckDriver/BlockerPhotograph.vue') //入厂导航
const LoadWork = () => import('./components/bigTruckDriver/loadWork.vue') //装货工作
const LoadWork1 = () => import('./components/bigTruckDriver/loadWork1.vue') //装货工作

const ServiceComment = () => import('./components/bigTruckDriver/serviceComment.vue') //服务评价
const Contract = () => import('./components/bigTruckDriver/contract.vue') //运输合同
const OutFacMng = () => import('./components/bigTruckDriver/outFacMng.vue') //出厂管理
const DeliveryNav = () => import('./components/bigTruckDriver/deliveryNav.vue') //送货导航
const Process = () => import('./components/bigTruckDriver/process.vue') //客户交货流程说明
const ReturnTray = () => import('./components/bigTruckDriver/returnTray.vue') //还回托盘
const Returntrays = () => import('./components/bigTruckDriver/Returntrays.vue') //还回托盘1
const Palletbacktofactory = () => import('./components/bigTruckDriver/Palletbacktofactory.vue') //托盘回厂




const RecyclingDetails = () => import('./components/bigTruckDriver/RecyclingDetails.vue') //还回托盘详情
const task = () => import('./components/bigTruckDriver/task.vue') //任务
const PalletRecycling = () => import('./components/bigTruckDriver/PalletRecycling.vue') //还回托盘
const Palletdelivery = () => import('./components/bigTruckDriver/Palletdelivery.vue') //托盘交货
const complete = () => import('./components/bigTruckDriver/complete.vue') //完成






//卸货
const Unload = () => import('./components/bigTruckDriver/unload/index.vue')
const unloadDischarge = () => import('./components/bigTruckDriver/unload/discharge.vue') //卸货拍照
const UnloadOrder = () => import('./components/bigTruckDriver/unload/order.vue') //送货单
const UnloadorderNew = () => import('./components/bigTruckDriver/unload/orderNew.vue') //送货单

const order1 = () => import('./components/bigTruckDriver/order1.vue') //送货单

const UnloadConfirm = () => import('./components/bigTruckDriver/unload/children/unloadConfirm.vue') //卸货确认
const DeliveryService = () => import('./components/bigTruckDriver/unload/children/deliveryService.vue') //交货服务
const SignSettle = () => import('./components/bigTruckDriver/unload/children/sign.vue') //签单结算
const TrayIntoFac = () => import('./components/bigTruckDriver/unload/children/returnTray.vue') //带托盘回厂
const PalletReturn = () => import('./components/bigTruckDriver/unload/children/palletReturn.vue') //托盘交回
//车辆费用
const CarCost = () => import('./components/bigTruckDriver/carCost/index.vue')
const CCCar = () => import('./components/bigTruckDriver/carCost/car.vue') //行车费用
const CCRepair = () => import('./components/bigTruckDriver/carCost/repair.vue') //维修费用
const CCDay = () => import('./components/bigTruckDriver/carCost/day.vue') //日常报销
const CCCost = () => import('./components/bigTruckDriver/carCost/cost.vue') //费用查询
const ChangeTirePosition = () => import('./components/bigTruckDriver/carCost/children/changeTirePosition.vue') //换轮胎位置
const ApprovalLog = () => import('./components/bigTruckDriver/carCost/children/log.vue') //审批日志
//费用管理
const FreightManagement = () => import('./components/bigTruckDriver/costManagement/index.vue')
const CMFare = () => import('./components/bigTruckDriver/costManagement/fare.vue') //运费明细
const CMProfit = () => import('./components/bigTruckDriver/costManagement/profit.vue') //利润分析
const CMDetails = () => import('./components/bigTruckDriver/costManagement/children/details.vue') //费用明细

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // { path: '*', component: Login },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/MyAddress',
      name: 'MyAddress',
      component: MyAddress
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    //安全签到
    {
      path: '/SignIn',
      name: 'SignIner',
      component: SignIner,
    },
    //上班签到
    {
      path: '/SignIns',
      name: 'SignIner1',
      component: SignIner1,
    },
    //身体检测
    {
      path: '/bodyment',
      name: 'Bodyment',
      component: Bodyment,
    },
    //照片查看
    {
      path: '/phoneShow',
      name: 'PhoneShow',
      component: PhoneShow,
    },
    {
      path: '/structioner',
      name: 'structioner',
      component: Instructioner,
    },
    {
      path: '/WorkScheduleRule',
      name: 'WorkScheduleRule',
      component: WorkScheduleRule,
    },
    /////
    //----------------------------------------------品控员
    //生产检验
    {
      path: '/pingkunMent/productionTesting',
      name: "shopTest",
      component: ShopTest,
    },
    //生产货品详情
    {
      path: '/pingkunMent/shopTestShow',
      name: "shopTestShow",
      component: ShopTestShow,
    },
    //进货检验
    {
      path: '/pingkunMent/intgoodTesting',
      name: "intgoodTest",
      component: IntgoodTest,
    },
    //进货货品详情
    {
      path: '/pingkunMent/intgoodTestShow',
      name: "intgoodTestShow",
      component: IntgoodTestShow,
    },
    //周转包材检验
    {
      path: '/pingkunMent/revolveTesting',
      name: "revolveTest",
      component: RevolveTest,
    },
    //周转包材货品详情
    {
      path: '/pingkunMent/revolveTestShow',
      name: "revolveTestShow",
      component: RevolveTestShow,
    },
    //原材料检验
    {
      path: '/pingkunMent/oldgoodTesting',
      name: "oldgoodTest",
      component: OldgoodTest,
    },
    //原材料货品详情
    {
      path: '/pingkunMent/oldgoodTestShow',
      name: "oldgoodTestShow",
      component: OldgoodTestShow,
    },
    //----------------------------------------生产员
    //生产异常
    {
      path: '/manufacturingWorker/producingAnomaly',
      name: "producingAnomaly",
      component: ProducingAnomaly,
    },
    //异常记录
    {
      path: '/manufacturingWorker/exceptionRecord',
      name: 'exceptionRecord',
      component: ExceptionRecord,
      redirect: '/manufacturingWorker/exceptionRecord/daily',
      children: [{
          path: '/manufacturingWorker/exceptionRecord/daily',
          name: 'daily',
          component: Daily
        },
        {
          path: '/manufacturingWorker/exceptionRecord/monthly',
          name: 'monthly',
          component: Monthly
        },
        {
          path: '/manufacturingWorker/exceptionRecord/year',
          name: 'year',
          component: Year
        },
      ]
    },
    //产量统计
    {
      path: '/manufacturingWorker/outputStatistics',
      name: 'outputStatistics',
      component: OutputStatistics,
      redirect: '/manufacturingWorker/outputStatistics/banoutput',
      children: [{
          path: '/manufacturingWorker/outputStatistics/banoutput',
          name: 'banoutput',
          component: Cbanoutput
        },
        {
          path: '/manufacturingWorker/outputStatistics/outdaily',
          name: 'outdaily',
          component: Cdaily
        },
        {
          path: '/manufacturingWorker/outputStatistics/outmonthly',
          name: 'outmonthly',
          component: Cmonthly
        },
      ]
    },
    //----------------------------------------------酒精测试员
    {
      path: '/AlcoholTester',
      name: 'AlcoholTester',
      component: AlcoholTester,
      redirect: '/AlcoholTester/employee',
      children: [{
          path: '/AlcoholTester/employee',
          name: 'employee',
          component: Employee
        },
        {
          path: '/AlcoholTester/motorman',
          name: 'motorman',
          component: Motorman
        }
      ]
    },
    //-----------------------------------------------装卸员
    //装卸员---上线工作
    {
      path: '/loadMent/onlineJob',
      name: 'onlineJob',
      component: OnlineJob,
    },
    //装卸任务
    {
      path: '/loadMent/onlineJob/distributionTask',
      name: 'distributionTask',
      component: DistributionTask
    },
    //装卸指引
    {
      path: '/loadMent/onlineJob/loadGuide',
      name: 'loadGuide',
      component: LoadGuide
    },
    //用餐休息
    {
      path: '/loadMent/onlineJob/rest',
      name: 'rest',
      component: Rest
    },
    //请假
    {
      path: '/loadMent/onlineJob/leave',
      name: 'leave',
      component: Leave
    },
    //装卸破损
    {
      path: '/loadMent/onlineJob/loadDamage',
      name: 'loadDamage',
      component: LoadDamage
    },
    //托盘破损
    {
      path: '/loadMent/onlineJob/trayDamage',
      name: 'trayDamage',
      component: TrayDamage
    },
    //破损数量
    {
      path: '/loadMent/onlineJob/brokenNumber',
      name: 'brokenNumber',
      component: BrokenNumber
    },
    //码货标准
    {
      path: '/loadMent/onlineJob/goodsStandard',
      name: 'goodsStandard',
      component: GoodsStandard
    },
    //下班工作
    {
      path: '/loadMent/onlineJob/workWork',
      name: 'workWork',
      component: WorkWork
    },
    //装卸员---辅材管理
    {
      path: '/loadMent/manageMent',
      name: 'manageMent',
      component: ManageMent,
      redirect: '/loadMent/manageMent/outbound',
      children: [{
          path: '/loadMent/manageMent/outbound',
          name: 'outbound',
          component: Outbound
        },
        {
          path: '/loadMent/manageMent/marketSupplies',
          name: 'marketSupplies',
          component: MarketSupplies
        },
        {
          path: '/loadMent/manageMent/cartonRecipients',
          name: 'cartonRecipients',
          component: CartonRecipients
        }
      ]
    },
    {
      path: '/loadMent/manageMent/intobound',
      name: 'intobound',
      component: Intobound
    },
    {
      path: '/loadMent/manageMent/inStock',
      name: 'inStock',
      component: InStock
    },
    //装卸员---工作统计
    {
      path: '/loadMent/jobRecord',
      name: 'jobRecord',
      component: JobRecord,
      redirect: '/loadMent/jobRecord/wookStatistics',
      children: [{
          path: '/loadMent/jobRecord/wookStatistics',
          name: 'wookStatistics',
          component: WookStatistics
        },
        {
          path: '/loadMent/jobRecord/attendanceRecord',
          name: 'attendanceRecord',
          component: AttendanceRecord
        },
        {
          path: '/loadMent/jobRecord/criminalRecords',
          name: 'criminalRecords',
          component: CriminalRecords
        },
        {
          path: '/loadMent/jobRecord/brokenRecord',
          name: 'brokenRecord',
          component: BrokenRecord
        }
      ]
    },
    //破损明细
    {
      path: '/loadMent/jobRecord/damagedDetail',
      name: 'damagedDetail',
      component: DamagedDetail
    },
    //吸烟违规
    {
      path: '/loadMent/jobRecord/photoDetail',
      name: 'photoDetail',
      component: PhotoDetail
    },
    /////
    // 车队选择
    {
      path: '/common/FleetSelection',
      name: 'FleetSelection',
      component: VehicleIndex,
      redirect: '/common/FleetSelection/FleetSelection',
      children: [{
          path: '/common/FleetSelection/FleetSelection',
          name: 'FleetSelection',
          component: FleetSelection
        },
        {
          path: '/common/FleetSelection/VehicleSelection',
          name: 'VehicleSelection',
          component: VehicleSelection
        },
        {
          path: '/common/FleetSelection/TemporaryVehicleSelection',
          name: 'TemporaryVehicleSelection',
          component: TemporaryVehicleSelection
        }
      ]
    },

    //车辆调度员 
    // 装货管理
    {
      path: '/vehicleDispatcher/loadingManagement',
      name: 'loadingManagement',
      component: LoadingManagement,
      redirect: '/vehicleDispatcher/loadingManagement/aboutCar',
      children: [{
          path: '/vehicleDispatcher/loadingManagement/aboutCar',
          name: 'aboutCar',
          component: AboutCar
        },
        {
          path: '/vehicleDispatcher/loadingManagement/carManage',
          name: 'carManage',
          component: CarManage
        },
        {
          path: '/vehicleDispatcher/loadingManagement/menuCar',
          name: 'menuCar',
          component: MenuCar
        },
        {
          path: '/vehicleDispatcher/loadingManagement/siteManage',
          name: 'siteManage',
          component: SiteManage
        },
      ]
    },
    {
      path: '/vehicleDispatcher/loadingManagement/timeReselect',
      name: 'timeReselect',
      component: TimeReselect
    },
    {
      path: '/vehicleDispatcher/loadingManagement/LoadSetting',
      name: 'LoadSetting',
      component: LoadSetting
    }, {
      path: '/vehicleDispatcher/loadingManagement/Photograph',
      name: 'Photograph',
      component: Photograph
    }, {
      path: '/vehicleDispatcher/loadingManagement/Detailed',
      name: 'Detailed',
      component: Detailed
    },
    {
      path: '/vehicleDispatcher/loadingManagement/PaidPriceAdjustment',
      name: 'PaidPriceAdjustment',
      component: PaidPriceAdjustment
    }, {
      path: '/common/CarPosition',
      name: 'CarPosition',
      component: CarPosition
    }, {
      path: '/common/trajectory',
      name: 'trajectory',
      component: trajectory
    }, {
      path: '/vehicleDispatcher/loadingManagement/CompartmentPhotos',
      name: 'CompartmentPhotos',
      component: CompartmentPhotos
    }, {
      path: '/vehicleDispatcher/loadingManagement/StandardTest',
      name: 'StandardTest',
      component: StandardTest
    }, {
      path: '/vehicleDispatcher/loadingManagement/CarArrester',
      name: 'CarArrester',
      component: CarArrester
    }, {
      path: '/vehicleDispatcher/loadingManagement/ProtectionSafety',
      name: 'ProtectionSafety',
      component: ProtectionSafety
    }, {
      path: '/vehicleDispatcher/loadingManagement/ViolationRecord',
      name: 'ViolationRecord',
      component: ViolationRecord
    },

    // 送货管理
    {
      path: '/vehicleDispatcher/deliveryManagement',
      name: 'deliveryManagement',
      component: deliveryManagement,
      redirect: '/vehicleDispatcher/deliveryManagement/VehicleCondition',
      children: [{
          path: '/vehicleDispatcher/deliveryManagement/VehicleCondition',
          name: 'VehicleCondition',
          component: VehicleCondition
        },
        {
          path: '/vehicleDispatcher/deliveryManagement/SigningManagement',
          name: 'SigningManagement',
          component: SigningManagement
        },
        {
          path: '/vehicleDispatcher/deliveryManagement/ResourceCollection',
          name: 'ResourceCollection',
          component: ResourceCollection
        },
      ]
    },
    {
      path: '/vehicleDispatcher/deliveryManagement/UnloadingPhotos',
      name: 'UnloadingPhotos',
      component: UnloadingPhotos
    }, {
      path: '/vehicleDispatcher/deliveryManagement/BeDamaged',
      name: 'BeDamaged',
      component: BeDamaged
    }, {
      path: '/vehicleDispatcher/deliveryManagement/ContractVehicleList',
      name: 'ContractVehicleList',
      component: ContractVehicleList
    }, {
      path: '/vehicleDispatcher/deliveryManagement/FleetSelectionList',
      name: 'FleetSelectionList',
      component: FleetSelectionList
    },
    // 单据管理  TimeReselect
    {
      path: '/vehicleDispatcher/documentSort',
      name: 'billManagement',
      component: billManagement,
      redirect: '/vehicleDispatcher/billManagement/CollectionOfDocuments',
      children: [{
          path: '/vehicleDispatcher/billManagement/CollectionOfDocuments',
          name: 'CollectionOfDocuments',
          component: CollectionOfDocuments
        },
        {
          path: '/vehicleDispatcher/billManagement/MoreThanOneCar',
          name: 'MoreThanOneCar',
          component: MoreThanOneCar
        },
        {
          path: '/vehicleDispatcher/billManagement/OneCarAndManyLibraries',
          name: 'OneCarAndManyLibraries',
          component: OneCarAndManyLibraries
        },
      ]
    },
    {
      path: '/vehicleDispatcher/billManagement/overweight',
      name: 'overweight',
      component: overweight
    }, {
      path: '/vehicleDispatcher/billManagement/Shortage',
      name: 'Shortage',
      component: Shortage
    }, {
      path: '/vehicleDispatcher/billManagement/SlowDelivery',
      name: 'SlowDelivery',
      component: SlowDelivery
    }, {
      path: '/vehicleDispatcher/billManagement/Supplement',
      name: 'Supplement',
      component: Supplement
    }, {
      path: '/vehicleDispatcher/billManagement/SupplementWeight',
      name: 'SupplementWeight',
      component: SupplementWeight
    }, {
      path: '/vehicleDispatcher/billManagement/ShippingOrder',
      name: 'ShippingOrder',
      component: ShippingOrder
    }, {
      path: '/vehicleDispatcher/billManagement/DeliveryBillClient',
      name: 'DeliveryBillClient',
      component: DeliveryBillClient
    }, {
      path: '/vehicleDispatcher/billManagement/DeliveryBillGoods',
      name: 'DeliveryBillGoods',
      component: DeliveryBillGoods
    }, {
      path: '/vehicleDispatcher/billManagement/DocumentSort',
      name: 'DocumentSort',
      component: DocumentSort
    }, {
      path: '/vehicleDispatcher/billManagement/Communicate',
      name: 'Communicate',
      component: Communicate
    }, {
      path: '/vehicleDispatcher/billManagement/AssemblyWaybill',
      name: 'AssemblyWaybill',
      component: AssemblyWaybill
    }, {
      path: '/vehicleDispatcher/billManagement/GoodsLoadingWarehouse',
      name: 'GoodsLoadingWarehouse',
      component: GoodsLoadingWarehouse
    }, {
      path: '/vehicleDispatcher/billManagement/Storehouse',
      name: 'Storehouse',
      component: Storehouse
    },

    //调度统计员 

    {
      path: '/dispatchStatistician/documentSort',
      name: 'billManagementDis',
      component: billManagementDis,
      redirect: '/dispatchStatistician/billManagement/CollectionOfDocuments',
      children: [{
          path: '/dispatchStatistician/billManagement/CollectionOfDocuments',
          name: 'CollectionOfDocumentsDis',
          component: CollectionOfDocumentsDis
        },
        {
          path: '/dispatchStatistician/billManagement/MoreThanOneCar',
          name: 'MoreThanOneCarDis',
          component: MoreThanOneCarDis
        },
        {
          path: '/dispatchStatistician/billManagement/OneCarAndManyLibraries',
          name: 'OneCarAndManyLibrariesDis',
          component: OneCarAndManyLibrariesDis
        },
      ]
    },
    {
      path: '/dispatchStatistician/billManagement/overweight',
      name: 'overweightDis',
      component: overweightDis
    }, {
      path: '/dispatchStatistician/billManagement/Shortage',
      name: 'ShortageDis',
      component: ShortageDis
    }, {
      path: '/dispatchStatistician/billManagement/SlowDelivery',
      name: 'SlowDeliveryDis',
      component: SlowDeliveryDis
    }, {
      path: '/dispatchStatistician/billManagement/Supplement',
      name: 'SupplementDis',
      component: SupplementDis
    }, {
      path: '/dispatchStatistician/billManagement/SupplementWeight',
      name: 'SupplementWeightDis',
      component: SupplementWeightDis
    }, {
      path: '/dispatchStatistician/billManagement/ShippingOrder',
      name: 'ShippingOrderDis',
      component: ShippingOrderDis
    }, {
      path: '/dispatchStatistician/billManagement/DeliveryBillClient',
      name: 'DeliveryBillClientDis',
      component: DeliveryBillClientDis
    }, {
      path: '/dispatchStatistician/billManagement/DeliveryBillGoods',
      name: 'DeliveryBillGoodsDis',
      component: DeliveryBillGoodsDis
    }, {
      path: '/dispatchStatistician/billManagement/DocumentSort',
      name: 'DocumentSortDis',
      component: DocumentSortDis
    }, {
      path: '/dispatchStatistician/billManagement/Communicate',
      name: 'CommunicateDis',
      component: CommunicateDis
    }, {
      path: '/dispatchStatistician/billManagement/AssemblyWaybill',
      name: 'AssemblyWaybillDis',
      component: AssemblyWaybillDis
    }, {
      path: '/dispatchStatistician/billManagement/GoodsLoadingWarehouse',
      name: 'GoodsLoadingWarehouseDis',
      component: GoodsLoadingWarehouseDis
    }, {
      path: '/dispatchStatistician/billManagement/Storehouse',
      name: 'StorehouseDis',
      component: StorehouseDis
    },



    {
      path: '/dispatchStatistician/sendCarWithTime',
      name: 'sendCarWithTimeDis',
      component: sendCarWithTimeDis,
      redirect: '/dispatchStatistician/sendCarWithTime/aboutCar',
      children: [{
          path: '/dispatchStatistician/sendCarWithTime/aboutCar',
          name: 'aboutCarDis',
          component: AboutCarDis
        },
        {
          path: '/dispatchStatistician/sendCarWithTime/carManage',
          name: 'carManageDis',
          component: CarManageDis
        },
        {
          path: '/dispatchStatistician/sendCarWithTime/menuCar',
          name: 'menuCarDis',
          component: MenuCarDis
        },
        {
          path: '/dispatchStatistician/sendCarWithTime/siteManage',
          name: 'siteManageDis',
          component: SiteManageDis
        },
      ]
    },
    {
      path: '/dispatchStatistician/sendCarWithTime/timeReselect',
      name: 'timeReselectDis',
      component: TimeReselectDis
    },
    {
      path: '/dispatchStatistician/sendCarWithTime/LoadSetting',
      name: 'LoadSettingDis',
      component: LoadSettingDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/Photograph',
      name: 'PhotographDis',
      component: PhotographDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/Detailed',
      name: 'DetailedDis',
      component: DetailedDis
    },
    {
      path: '/dispatchStatistician/sendCarWithTime/PaidPriceAdjustment',
      name: 'PaidPriceAdjustmentDis',
      component: PaidPriceAdjustmentDis
    }, {
      path: '/common/CarPosition',
      name: 'CarPosition',
      component: CarPosition
    }, {
      path: '/dispatchStatistician/sendCarWithTime/CompartmentPhotos',
      name: 'CompartmentPhotosDis',
      component: CompartmentPhotosDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/StandardTest',
      name: 'StandardTestDis',
      component: StandardTestDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/CarArrester',
      name: 'CarArresterDis',
      component: CarArresterDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/ProtectionSafety',
      name: 'ProtectionSafetyDis',
      component: ProtectionSafetyDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/ViolationRecord',
      name: 'ViolationRecordDis',
      component: ViolationRecordDis
    }, {
      path: '/dispatchStatistician/sendCarWithTime/AlreadySent',
      name: 'AlreadySent',
      component: AlreadySent
    }, {
      path: '/dispatchStatistician/sendCarWithTime/Unissued',
      name: 'Unissued',
      component: Unissued
    }, {
      path: '/dispatchStatistician/sendCarWithTime/CarShortage',
      name: 'CarShortage',
      component: CarShortage
    }, {
      path: '/dispatchStatistician/sendCarWithTime/DetailsOfGoods',
      name: 'DetailsOfGoods',
      component: DetailsOfGoods
    }, {
      path: '/dispatchStatistician/sendCarWithTime/OwnedVehicle',
      name: 'OwnedVehicle',
      component: OwnedVehicle
    },
    // 到车管理
    {
      path: '/dispatchStatistician/siteManagement',
      name: 'siteManagementDis',
      component: siteManagementDis,
      redirect: '/dispatchStatistician/siteManagement/VehicleCondition',
      children: [{
          path: '/dispatchStatistician/siteManagement/VehicleCondition',
          name: 'VehicleConditionDis',
          component: VehicleConditionDis
        },
        {
          path: '/dispatchStatistician/siteManagement/SigningManagement',
          name: 'SigningManagementDis',
          component: SigningManagementDis
        },
        {
          path: '/dispatchStatistician/siteManagement/ResourceCollection',
          name: 'ResourceCollectionDis',
          component: ResourceCollectionDis
        },
      ]
    },
    {
      path: '/dispatchStatistician/siteManagement/UnloadingPhotos',
      name: 'UnloadingPhotosDis',
      component: UnloadingPhotosDis
    }, {
      path: '/dispatchStatistician/siteManagement/BeDamaged',
      name: 'BeDamagedDis',
      component: BeDamagedDis
    }, {
      path: '/dispatchStatistician/siteManagement/ContractVehicleList',
      name: 'ContractVehicleListDis',
      component: ContractVehicleListDis
    }, {
      path: '/dispatchStatistician/siteManagement/FleetSelectionList',
      name: 'FleetSelectionListDis',
      component: FleetSelectionListDis
    },



    {
      path: '/dispatchStatistician/deliveryManagement',
      name: 'deliveryManagementDis',
      component: deliveryManagementDis,
      redirect: '/dispatchStatistician/deliveryManagement/DischargeCargo',
      children: [{
          path: '/dispatchStatistician/deliveryManagement/DischargeCargo',
          name: 'DischargeCargo',
          component: DischargeCargo
        },
        {
          path: '/dispatchStatistician/deliveryManagement/DrivingRecord',
          name: 'DrivingRecord',
          component: DrivingRecord
        },
        {
          path: '/dispatchStatistician/deliveryManagement/customerService',
          name: 'customerService',
          component: customerService
        },
        {
          path: '/dispatchStatistician/deliveryManagement/TraceBackTo',
          name: 'TraceBackTo',
          component: TraceBackTo
        },
      ]
    },
    {
      path: '/dispatchStatistician/deliveryManagement/UnloadingPhotoss',
      name: 'UnloadingPhotoss',
      component: UnloadingPhotoss
    },
    //经销商收货 
    //仓库管理
    {
      path: '/dealerReceipt/warehouseManagement',
      name: 'warehouseManagement',
      component: WarehouseManagement,
      redirect: '/dealerReceipt/warehouseManagement/arrival',
      children: [{
          path: '/dealerReceipt/warehouseManagement/arrival',
          name: 'arrival',
          component: Arrival
        },
        {
          path: '/dealerReceipt/warehouseManagement/accept',
          name: 'accept',
          component: Accept
        },
        {
          path: '/dealerReceipt/warehouseManagement/sign',
          name: 'sign',
          component: Sign
        },
        {
          path: '/dealerReceipt/warehouseManagement/tray',
          name: 'tray',
          component: Tray
        },
      ]
    },
    {
      path: '/dealerReceipt/deliveryDetails',
      name: 'deliveryDetails',
      component: DeliveryDetails
    },
    {
      path: '/dealerReceipt/receiptConfirm',
      name: 'receiptConfirm',
      component: ReceiptConfirm
    },
    {
      path: '/dealerReceipt/brokenClaim',
      name: 'brokenClaim',
      component: BrokenClaim
    },
    {
      path: '/dealerReceipt/receiptComplete',
      name: 'receiptComplete',
      component: ReceiptComplete
    },
    {
      path: '/dealerReceipt/customerReceipt',
      name: 'customerReceipt',
      component: CustomerReceipt
    },
    //包材管理
    {
      path: '/dealerReceipt/packageManagement',
      name: 'packageManagement',
      component: PackageManagement,
      redirect: '/dealerReceipt/packageManagement/tray',
      children: [{
          path: '/dealerReceipt/packageManagement/tray',
          name: 'packagetray',
          component: PackageTray
        },
        {
          path: '/dealerReceipt/packageManagement/box',
          name: 'bottlebox',
          component: BottleBox
        },
      ]
    },
    {
      path: '/dealerReceipt/withdrawApplication',
      name: 'withdrawApplication',
      component: WithdrawApplication
    },
    {
      path: '/dealerReceipt/expirationDetails',
      name: 'expirationDetails',
      component: ExpirationDetails
    },
    //大货车司机
    {
      path: '/bigTruckDriver/onlineOrder',
      name: 'onlineOrder',
      component: OrderConfirm
    },
    {
      path: '/bigTruckDriver/onlineOperate',
      name: 'onlineOperate',
      component: JobDetails
    },
    {
      path: '/bigTruckDriver/freight',
      name: 'freight',
      component: Freight
    },
    {
      path: '/bigTruckDriver/loadNav',
      name: 'loadNav',
      component: LoadNav
    },
    {
      path: '/bigTruckDriver/ArrivalTime',
      name: 'ArrivalTime',
      component: ArrivalTime
    },
    {
      path: '/bigTruckDriver/cabinHygiene',
      name: 'cabinHygiene',
      component: CabinHygiene
    },
    {
      path: '/bigTruckDriver/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/bigTruckDriver/DetailsOfGoodss',
      name: 'DetailsOfGoodss',
      component: DetailsOfGoodss
    },
    {
      path: '/bigTruckDriver/instruction',
      name: 'instruction',
      component: Instruction
    },
    {
      path: '/bigTruckDriver/queue',
      name: 'queue',
      component: Queue
    },
    {
      path: '/bigTruckDriver/intoFacNav',
      name: 'intoFacNav',
      component: IntoFacNav
    },
    {
      path: '/bigTruckDriver/intoFacNav1',
      name: 'intoFacNav1',
      component: IntoFacNav1
    },
    {
      path: '/bigTruckDriver/loadWork',
      name: 'loadWork',
      component: LoadWork
    },
    {
      path: '/bigTruckDriver/loadWork1',
      name: 'loadWork1',
      component: LoadWork1
    },
    {
      path: '/bigTruckDriver/serviceComment',
      name: 'serviceComment',
      component: ServiceComment
    },
    {
      path: '/bigTruckDriver/contract',
      name: 'contract',
      component: Contract
    },
    {
      path: '/bigTruckDriver/outFacMng',
      name: 'outFacMng',
      component: OutFacMng
    },
    {
      path: '/bigTruckDriver/deliveryNav',
      name: 'deliveryNav',
      component: DeliveryNav
    },
    {
      path: '/bigTruckDriver/process',
      name: 'process',
      component: Process
    },
    //卸货
    {
      path: '/bigTruckDriver/unload',
      name: 'unload',
      component: Unload,
      redirect: '/bigTruckDriver/unload/discharge',
      children: [{
          path: '/bigTruckDriver/unload/discharge',
          name: 'unloadDischarge',
          component: unloadDischarge
        },
        {
          path: '/bigTruckDriver/unload/order',
          name: 'unloadOrder',
          component: UnloadOrder
        },
        {
          path: '/bigTruckDriver/unload/orderNew',
          name: 'UnloadorderNew',
          component: UnloadorderNew
        },
      ],
    },
    {
      path: '/bigTruckDriver/unloadConfirm',
      name: 'unloadConfirm',
      component: UnloadConfirm
    },
    {
      path: '/bigTruckDriver/order1',
      name: 'order1',
      component: order1
    },
    {
      path: '/bigTruckDriver/deliveryService',
      name: 'deliveryService',
      component: DeliveryService
    },
    {
      path: '/bigTruckDriver/signSettle',
      name: 'signSettle',
      component: SignSettle
    }, {
      path: '/bigTruckDriver/sign',
      name: 'SignSettle',
      component: SignSettle
    },
    {
      path: '/bigTruckDriver/trayIntoFac',
      name: 'trayIntoFac',
      component: TrayIntoFac
    },
    {
      path: '/bigTruckDriver/BlockerPhotograph',
      name: 'BlockerPhotograph',
      component: BlockerPhotograph
    },
    {
      path: '/bigTruckDriver/palletReturn',
      name: 'palletReturn',
      component: PalletReturn
    },
    //车辆费用
    {
      path: '/bigTruckDriver/costManagement',
      name: 'costManagement',
      component: CarCost,
      redirect: '/bigTruckDriver/costManagement/car',
      children: [{
          path: '/bigTruckDriver/costManagement/car',
          name: 'cccar',
          component: CCCar
        },
        {
          path: '/bigTruckDriver/costManagement/repair',
          name: 'ccrepair',
          component: CCRepair
        },
        {
          path: '/bigTruckDriver/costManagement/day',
          name: 'ccday',
          component: CCDay
        },
        {
          path: '/bigTruckDriver/costManagement/cost',
          name: 'cccost',
          component: CCCost
        },
      ],
    },
    {
      path: '/bigTruckDriver/changeTirePosition',
      name: 'changeTirePosition',
      component: ChangeTirePosition
    },
    {
      path: '/bigTruckDriver/approvalLog',
      name: 'approvalLog',
      component: ApprovalLog
    },
    {
      path: '/bigTruckDriver/returnTray',
      name: 'returnTray',
      component: ReturnTray
    },
    {
      path: '/bigTruckDriver/Returntrays',
      name: 'Returntrays',
      component: Returntrays
    },
    {
      path: '/bigTruckDriver/Palletbacktofactory',
      name: 'Palletbacktofactory',
      component: Palletbacktofactory
    },

    
    {
      path: '/bigTruckDriver/RecyclingDetails',
      name: 'RecyclingDetails',
      component: RecyclingDetails
    }, {
      path: '/bigTruckDriver/task',
      name: 'task',
      component: task
    },
    {
      path: '/bigTruckDriver/PalletRecycling',
      name: 'PalletRecycling',
      component: PalletRecycling
    }, {
      path: '/bigTruckDriver/Palletdelivery',
      name: 'Palletdelivery',
      component: Palletdelivery
    }, {
      path: '/bigTruckDriver/complete',
      name: 'complete',
      component: complete
    },


    //费用管理
    {
      path: '/bigTruckDriver/freightManagement',
      name: 'freightManagement',
      component: FreightManagement,
      redirect: '/bigTruckDriver/freightManagement/fare',
      children: [{
          path: '/bigTruckDriver/freightManagement/fare',
          name: 'cmfare',
          component: CMFare
        },
        {
          path: '/bigTruckDriver/freightManagement/profit',
          name: 'cmprofit',
          component: CMProfit
        }
      ],
    },
    {
      path: '/bigTruckDriver/datails',
      name: 'cmdetails',
      component: CMDetails
    },
  ]
})