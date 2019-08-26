<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logos" :class="collapsed?'logo-collapse-width':'logo-width'">
        <div class="imgBox">
          <img class="imgItem" :src="logoImgNew">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="carPio">{{title}}</div>
      </el-col>
      <el-col :span="14
      " class="line">
        <el-col :span="3" class="line-con" v-for="(item,index) in headList" :key="index">
          <el-col :span="6">
            <div class="line-statu" :class="item.class"></div>
          </el-col>
          <el-col :span="18">
            <el-row class="line_right line_top">
              <el-col :span="24">
                <div class="line-font">{{item.name}}</div>
              </el-col>
            </el-row>
            <el-row class="line_right">
              <el-col :span="24">
                <div class="line-num">{{item.num}}{{item.sty}}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <div id="container"></div>
      <div class="content-container">
        <div class="search" @click="search">
          <span class="iconfont icon-sousuo"></span>
          <span>点击搜索历史单据</span>
        </div>

        <div class="tab-head">
          <div class="transition_top">
            <transition name="draw" @after-leave="afterLeave0">
              <div class="changeStatus" v-show="tabHeadShow">
                <ul>
                  <li @click="carStatus(4)" :class="{ actives : ind === 4 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/car0.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">今日应发</span>
                      <span>{{StatusNum.totalNum}}辆</span>
                    </span>
                  </li>
                  <li @click="carStatus(0)" :class="{ actives : ind === 0 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/car1.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">来车装货</span>
                      <span>{{StatusNum.shipmentNum}}辆</span>
                    </span>
                  </li>
                  <li @click="carStatus(1)" :class="{ actives : ind === 1 }">
                    <span class="left_img left_mar">
                      <img class="img_sty" src="../assets/car4.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">厂外排队</span>
                      <span>{{StatusNum.outNum}}辆</span>
                    </span>
                  </li>
                  <li @click="carStatus(2)" :class="{ actives : ind === 2 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/car3.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">厂内车辆</span>
                      <span>{{StatusNum.inNum}}辆</span>
                    </span>
                  </li>
                  <li @click="carStatus(3)" :class="{ actives : ind === 3 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/car2.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">送货车辆</span>
                      <span>{{StatusNum.sendNum}}辆</span>
                    </span>
                  </li>
                  <li @click="carStatus(5)" :class="{ actives : ind === 5 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/car5.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">完成车辆</span>
                      <span>{{StatusNum.endNum}}辆</span>
                    </span>
                  </li>
                </ul>
              </div>
            </transition>
            <transition name="draw" @after-leave="afterLeave1">
              <div
                class="changeStatus changeStatuss"
                v-show="tabHeadShows"
                @click="tabHeadShows = false"
              >
                <ul>
                  <li class="actives">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/carstatu.png" alt>
                    </span>
                    <span class="right-name">
                      <span class="right-top right-big">车辆状态</span>
                      <span>{{StatusNum.totalNum}}辆</span>
                    </span>
                  </li>
                </ul>
              </div>
            </transition>

            <div v-if="tabHeadShows" class="open_cloce" @click="tabHeadShows = false">
              <div class="imgCloce">
                <img class="img_sty" src="../assets/lachu.png" alt>
              </div>
            </div>
            <div v-else class="open_cloce" @click="tabHeadShow = false,ind=-1">
              <div class="imgCloce">
                <img class="img_sty" src="../assets/shouhui.png" alt>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="tab-head tab-heads">
          <div class="transition_top">
            <transition name="draw" @after-leave="afterLeave2">
              <div class="changeStatus" v-show="tabBottomShow">
                <ul>
                  <li @click="carStatus(6)" :class="{ actives : ind === 6 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/cars.png" alt>
                    </span>
                    <span class="right-name right-names">
                      <span class="right-top right-big">来货管理</span>
                    </span>
                  </li>
                  <li @click="carStatus(7)" :class="{ actives : ind === 7 }">
                    <span class="left_img left_mar">
                      <img class="img_sty" src="../assets/feiyong.png" alt>
                    </span>
                    <span class="right-name right-names">
                      <span class="right-top right-big">物流商管理</span>
                    </span>
                  </li>
                  <li @click="carStatus(8)" :class="{ actives : ind === 8 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/yunfei.png" alt>
                    </span>
                    <span class="right-name right-names">
                      <span class="right-top right-big">管理报表</span>
                    </span>
                  </li>
                  <li @click="carStatus(9)" :class="{ actives : ind === 9 }">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/guanli.png" alt>
                    </span>
                    <span class="right-name right-names">
                      <span class="right-top right-big">费用管理</span>
                    </span>
                  </li>
                </ul>
              </div>
            </transition>
            <transition name="draw" @after-leave="afterLeave3">
              <div
                class="changeStatus changeStatuss"
                v-show="tabBottomShows"
                @click="tabBottomShows = false"
              >
                <ul>
                  <li class="actives">
                    <span class="left_img">
                      <img class="img_sty" src="../assets/zonghe.png" alt>
                    </span>
                    <span class="right-name right-names">
                      <span class="right-top right-big">综合查询</span>
                    </span>
                  </li>
                </ul>
              </div>
            </transition>

            <div v-if="tabBottomShows" class="open_cloce" @click="tabBottomShows = false">
              <img class="img_sty" src="../assets/lachu.png" alt>
            </div>
            <div v-else class="open_cloce" @click="tabBottomShow = false">
              <img class="img_sty" src="../assets/shouhui.png" alt>
            </div>
          </div>
        </div>-->
        <div class="box tableHeader">
          <div class="tableList tableList0" v-if="ind === 0" key="0">
            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              size="small"
              empty-text
              border
              :row-class-name="tableRowClassNameL"
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              ref="multipleTable"
              @row-click="DeliveryNote"
            >
              <el-table-column
                align="center"
                type="index"
                :index="indexMethod"
                label="排序"
                min-width="30"
              ></el-table-column>
              <el-table-column align="center" prop="vehgrpnam" label="承运商" min-width="70"></el-table-column>
              <el-table-column align="center" prop="vehlicnum" label="车号" min-width="50"></el-table-column>
              <el-table-column align="center" prop="distance" label="距离" min-width="45"></el-table-column>
              <el-table-column align="center" prop="outnam" label="客户"></el-table-column>
              <el-table-column align="center" prop="receipttime" label="出发时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="plantime" label="约到时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="yarrivetime" label="预计到达时间" min-width="70"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList1" v-if="ind === 1" key="1">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              @row-click="DeliveryNote"
            >
              <el-table-column align="center" prop="sortNum" label="排序" min-width="30"></el-table-column>
              <el-table-column align="center" prop="vehgrpnam" label="承运商" min-width="70"></el-table-column>
              <el-table-column align="center" prop="vehlicnum" label="车号" min-width="50"></el-table-column>
              <el-table-column align="center" prop="outman" label="客户"></el-table-column>
              <el-table-column align="center" prop="tradocnum" label="单号" min-width="60"></el-table-column>
              <el-table-column align="center" prop="appointTime" label="约到时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="signTime" label="签到时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="overtime" label="超时时间" min-width="50"></el-table-column>
              <el-table-column align="center" prop="expectInTime" label="预计入厂时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="useTime" label="等待时间" min-width="60"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList2" v-if="ind === 2" key="2">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              @row-click="DeliveryNote"
            >
              <el-table-column align="center" prop="vehgrpnam" label="承运商" min-width="70"></el-table-column>
              <el-table-column align="center" prop="vehlicnum" label="车号" min-width="50"></el-table-column>
              <el-table-column align="center" prop="outman" label="客户"></el-table-column>
              <el-table-column align="center" prop="tradocnum" label="单号" min-width="60"></el-table-column>
              <el-table-column align="center" prop="admissiontime" label="入厂时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="arrivespacetime" label="到达车位时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="rdytime" label="准备完成时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="startloadtime" label="开始装车时间" min-width="70"></el-table-column>
              <el-table-column
                align="center"
                prop="loadcompletedtime"
                label="装车完成时间"
                min-width="60"
              ></el-table-column>
              <el-table-column align="center" prop="inTime" label="厂内时间" min-width="65"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList3" v-if="ind === 3" key="3">
            <el-table
              :data="tableData"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              :row-class-name="tableRowClassName"
              @row-click="rowExpand"
            >
              <el-table-column align="center" prop="vehgrpnam" label="承运商" min-width="70"></el-table-column>
              <el-table-column align="center" prop="vehlicnum" label="车号" min-width="50"></el-table-column>
              <el-table-column align="center" prop="distance" label="距离" min-width="40"></el-table-column>
              <el-table-column align="center" prop="outman" label="客户"></el-table-column>
              <el-table-column align="center" prop="appearancetime" label="出厂行车时间" min-width="60"></el-table-column>
              <el-table-column align="center" prop="yarrivetime" label="预计到达时间" min-width="70"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList7" v-if="ind === 4" key="4">
            <div class="tableList7_box">
              <div class="tableList7_top">
                <ul>
                  <li>
                    应发车数:
                    <span>{{manageData.sentCars}}</span>
                  </li>
                  <li>
                    已约车数:
                    <span>{{manageData.agreedCars}}</span>
                  </li>
                  <li>
                    未约车数:
                    <span>{{manageData.noAgreedCars}}</span>
                  </li>
                  <li>
                    昨日未发:
                    <span>{{manageData.yesterdayCars}}</span>
                  </li>
                </ul>
                <span class="cloceNode iconfont icon-guanbi" @click="cloce"></span>
              </div>
            </div>
            <el-table
              :data="tableData"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              :row-class-name="tableRowClassName"
              @row-click="rowserchInfo"
            >
              <el-table-column align="center" prop="vehgrpnam" label="承运商"></el-table-column>
              <el-table-column align="center" prop="sentCar" label="应发车数" min-width="40"></el-table-column>
              <el-table-column align="center" prop="agreedCar" label="已约车数" min-width="40"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="未约车数" min-width="40"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList9" v-if="ind === 5" key="5">
            <el-table
              :data="tableData"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              :row-class-name="tableRowClassName"
              @row-click="rowserch"
            >
              <el-table-column
                align="center"
                type="index"
                :index="indexMethod"
                label="排序"
                min-width="30"
              ></el-table-column>
              <el-table-column align="center" prop="vehgrpnam" label="承运商" min-width="70"></el-table-column>
              <el-table-column align="center" prop="vehlicnum" label="车号" min-width="50"></el-table-column>
              <el-table-column align="center" prop="deloutnam" label="客户"></el-table-column>
              <el-table-column align="center" prop="deldocnum" label="送货单号" min-width="60"></el-table-column>
              <el-table-column align="center" prop="signaturetime" label="完成时间" min-width="70"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList7 tableList-7 tableList__6" v-if="ind === 6" key="6">
            <div class="tableList7_box">
              <div class="tableList7_top tableList8_top">
                <ul>
                  <li>
                    <div>年月选择:</div>
                    <span>
                      <el-date-picker
                        v-model="valueTime"
                        type="month"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM"
                        @change="table6(6,valueTime)"
                      ></el-date-picker>
                    </span>
                  </li>
                </ul>
                <span class="cloceNode iconfont icon-guanbi" @click="cloce"></span>
              </div>
            </div>
            <el-table
              :data="tableData"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              :row-class-name="tableRowClassName"
              @row-click="rowserchInfos"
            >
              <el-table-column
                align="center"
                type="index"
                :index="indexMethod"
                label="序号"
                min-width="30"
              ></el-table-column>
              <el-table-column align="center" prop="sentCar" label="来货仓库"></el-table-column>
              <el-table-column align="center" prop="vehgrpnam" label="物流商"></el-table-column>
              <el-table-column align="center" prop="sentCar" label="车号" min-width="50"></el-table-column>
              <el-table-column align="center" prop="sentCar" label="送货单号" min-width="60"></el-table-column>
              <el-table-column align="center" prop="agreedCar" label="重量" min-width="30"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="托数" min-width="30"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="箱数" min-width="30"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="签到时间" min-width="70"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="入厂时间" min-width="70"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="收货人" min-width="50"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="卸货人" min-width="50"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="出厂时间" min-width="70"></el-table-column>
            </el-table>
          </div>
          <div class="tableList tableList7 tableList-7" v-if="ind === 7" key="7">
            <div class="tableList7_box">
              <div class="tableList7_top tableList8_top">
                <ul>
                  <li>
                    <div>年月选择:</div>
                    <span>
                      <el-date-picker
                        v-model="valueTimes"
                        type="month"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM"
                        @change="table7(7,valueTimes)"
                      ></el-date-picker>
                    </span>
                  </li>
                </ul>
                <span class="cloceNode iconfont icon-guanbi" @click="cloce"></span>
              </div>
            </div>
            <el-table
              :data="tableData"
              size="small"
              empty-text
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              class="tableListCss"
              :row-class-name="tableRowClassName"
              @row-click="rowserchInfos"
            >
              <el-table-column align="center" prop="sentCar" label="排名 " min-width="40"></el-table-column>
              <el-table-column align="center" prop="agreedCar" label="评级" min-width="40"></el-table-column>
              <el-table-column align="center" prop="vehgrpnam" label="承运商"></el-table-column>
              <el-table-column align="center" prop="sentCar" label="发货车数" min-width="40"></el-table-column>
              <el-table-column align="center" prop="agreedCar" label="隔日发车" min-width="40"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="比例" min-width="40"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="超时到车" min-width="40"></el-table-column>
              <el-table-column align="center" prop="noAgreedCar" label="违规次数" min-width="40"></el-table-column>
            </el-table>
          </div>
          <div
            class="cloce iconfont icon-guanbi"
            v-show="ind != -1 && ind != 4&&ind !=6&&ind!=7"
            @click="cloce"
          ></div>
          <div class="block" v-show="ind != -1">
            <el-pagination
              v-if="pageshow"
              background
              small
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-sizes="[7, 15, 30, 50]"
              :page-size="pageSize"
              :pager-count="count"
              layout="prev, pager, next,sizes, jumper"
              :total="total"
              class="paginationCss"
            ></el-pagination>
            <el-pagination
              v-else
              background
              small
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-sizes="[7, 15, 30, 50]"
              :page-size="pageSize"
              :pager-count="count"
              layout="prev, pager, next,sizes, jumper"
              :total="total"
              class="paginationCss"
            ></el-pagination>
          </div>
        </div>
        <div class="eventNode cloceStopCar goodsClose" v-show="goodsClose&& ind==7">
          <div class="nodeHead">
            发货详情
            <span class="cloceNode iconfont icon-guanbi" @click="goodsCloses"></span>
          </div>
          <div class="tableHeader">
            <div class="tableList tableList5">
              <el-table
                :data="tableDatastop"
                stripe
                size="small"
                v-loading="loading"
                empty-text
                border
                class="tableListCssStop"
              >
                <el-table-column align="center" prop="adr" label="日期"></el-table-column>
                <el-table-column align="center" prop="bte" label="发货车数" min-width="50"></el-table-column>
                <el-table-column align="center" prop="ete" label="罚款" min-width="50"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="扣分" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="隔日发车" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="已约不来" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="超时到车" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="扣分" min-width="40"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="eventNode cloceStopCar ViolationClose" v-show="ViolationClose&& ind==7">
          <div class="nodeHead">
            违规详情
            <span class="cloceNode iconfont icon-guanbi" @click="ViolationCloses"></span>
          </div>
          <div class="tableHeader">
            <div class="tableList tableList5">
              <el-table
                :data="tableDatastop"
                stripe
                size="small"
                v-loading="loading"
                empty-text
                border
                class="tableListCssStop"
              >
                <el-table-column align="center" prop="adr" label="日期" min-width="70"></el-table-column>
                <el-table-column align="center" prop="bte" label="车号" min-width="50"></el-table-column>
                <el-table-column align="center" prop="ete" label="原因"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="罚款" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="照片" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="扣分" min-width="40"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="上报人" min-width="50"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="eventNode eventNodes" v-if="cloceNode&&ind!=-1">
          <div class="nodeHead">
            时间节点
            <span class="cloceNode iconfont icon-guanbi" @click="cloceNodes"></span>
          </div>
          <ul class="nodeList">
            <li>
              <div>预计到达:</div>
              <span class="estimate" v-if="NodeLists.yarrivetime">{{NodeLists.yarrivetime}}</span>
            </li>
            <li>
              <div>出厂时间:</div>
              <span>{{NodeLists.appearancetime}}</span>
            </li>
            <li>
              <div>在途停车时间:</div>
              <span>{{NodeLists.stopVCN?NodeLists.stopVCN.stopTotalTime:''}}</span>
            </li>
            <li>
              <div>到达客户时间:</div>
              <span>{{NodeLists.arrivecustomertime}}</span>
            </li>
            <li>
              <div>等待用时:</div>
              <span>{{NodeLists.waitTime}}</span>
            </li>
            <li>
              <div>开始卸货时间:</div>
              <span>{{NodeLists.startunloadtime}}</span>
            </li>
            <li>
              <div>卸货完成时间:</div>
              <span>{{NodeLists.completunloadtime}}</span>
            </li>
            <!-- <li>
              <div>卸货照片:</div>
              <span>
                <el-button
                  :class="NodeLists.Xhzt.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhotoG('Xhzt')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>破损照片:</div>
              <span>
                <el-button
                  :class="NodeLists.Pszt.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhotoG('Pszt')"
                >查看</el-button>
              </span>
            </li> -->
            <!-- <li>
              <div>签收完成时间:</div>
              <span>{{NodeLists.signaturetime}}</span>
            </li>
            <li>
              <div>签单照片:</div>
              <span>
                <el-button
                  :class="NodeLists.Qdjs.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhotoG('Qdjs')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>带走托盘数量:</div>
              <span>无</span>
            </li>
            <li>
              <div>收回托盘数量:</div>
              <span>无</span>
            </li>
            <li>
              <div>送货用时:</div>
              <span>{{NodeLists.totalTime}}</span>
            </li>-->
          </ul>
        </div>
        <div class="eventNode eventNodeG" v-show="cloceNodeG
        ">
          <div class="nodeHead">
            时间节点
            <span class="cloceNode iconfont icon-guanbi" @click="cloceNodeGs"></span>
          </div>

          <ul class="nodeList eventNodeGList">
            <li>
              <div>接单时间:</div>
              <span>{{NodeLists.receipttime}}</span>
            </li>
            <li>
              <div>约到时间:</div>
              <span>{{NodeLists.plndeldat}}</span>
            </li>
            <li>
              <div>到达时间:</div>
              <span>{{NodeLists.arrivetime}}</span>
            </li>
            <li>
              <div>车厢卫生照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Rczb.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Rczb')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>身体检查照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Qd.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Qd')"
                >查看</el-button>
              </span>
            </li>

            <li>
              <div>等待入厂用时:</div>
              <span>{{NodeLists.factoryWaitTime}}</span>
            </li>
            <li>
              <div>入厂时间:</div>
              <span>{{NodeLists.admissiontime}}</span>
            </li>
            <li>
              <div>到达车位时间:</div>
              <span>{{NodeLists.arrivespacetime}}</span>
            </li>
            <li>
              <div>放阻车器照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Rcdh.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Rcdh')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>准备完成时间:</div>
              <span>{{NodeLists.rdytime}}</span>
            </li>
            <li>
              <div>开始装车时间:</div>
              <span>{{NodeLists.startloadtime}}</span>
            </li>
            <li>
              <div>装车完成时间:</div>
              <span>{{NodeLists.loadcompletedtime}}</span>
            </li>
            <li>
              <div>收阻车器照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Zhgz.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Zhgz')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>登高作业照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Ccgl.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Ccgl')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>出厂时间:</div>
              <span>{{NodeLists.appearancetime}}</span>
            </li>
            <li>
              <div>在途停车时间:</div>
              <span>{{NodeLists.stopVcnMap?NodeLists.stopVcnMap.stopTotalTime:''}}</span>
            </li>
            <li>
              <div>到达客户时间:</div>
              <span>{{NodeLists.arrivecustomertime}}</span>
            </li>
            <li>
              <div>等待用时:</div>
              <span>{{NodeLists.waitTime}}</span>
            </li>
            <li>
              <div>开始卸货时间:</div>
              <span>{{NodeLists.startunloadtime}}</span>
            </li>
            <li>
              <div>卸货完成时间:</div>
              <span>{{NodeLists.completunloadtime}}</span>
            </li>
            <li>
              <div>卸货照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Xhzt.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Xhzt')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>破损照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Pszt.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Pszt')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>签收完成时间:</div>
              <span>{{NodeLists.signaturetime}}</span>
            </li>
            <li>
              <div>签单照片:</div>
              <span>
                <el-button
                  v-if="cloceNodeG"
                  :class="NodeLists.Qdjs.length!=0?'BtnLooks':'BtnLook'"
                  type="danger"
                  round
                  @click="LookPhoto('Qdjs')"
                >查看</el-button>
              </span>
            </li>
            <li>
              <div>带走托盘数量:</div>
              <span>无</span>
            </li>
            <li>
              <div>收回托盘数量:</div>
              <span>无</span>
            </li>
            <li>
              <div>送货用时:</div>
              <span>{{NodeLists.deliveryTime}}</span>
            </li>
          </ul>
          <div class="stopNodeBox" v-if="ind!=5">
            <el-button class="stopNode" type="danger" round @click="LookStopNode">查看停车记录</el-button>
          </div>
        </div>
        <div class="eventNode serchNode" v-show="serchNode">
          <div class="nodeHead serchHead">
            &nbsp;&nbsp;请选择您要搜索的内容
            <span class="cloceNode iconfont icon-guanbi" @click="serchNodes"></span>
            <ul class="serchList">
              <li>
                <b class="iconfont icon-riqi"></b>
                <span>日期:</span>
                <div class="picker">
                  <el-date-picker v-model="value0" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </li>
              <li>
                <b class="iconfont icon-cheliangguanli"></b>
                <span>车队:</span>
                <div>
                  <el-select
                    v-model="value1"
                    placeholder="请选择"
                    clearable
                    @change="playbacks"
                    style="color:#ccc;"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.vehgrpnam"
                      :value="item.vehgrpnum"
                    ></el-option>
                  </el-select>
                </div>
              </li>
              <li class="carPostion">
                <b class="iconfont icon-chepai"></b>
                <span>车号:</span>
                <div>
                  <el-input v-model="value2" placeholder="请输入内容" class="CarInput"></el-input>
                  <el-select
                    v-model="value2"
                    placeholder="请选择"
                    clearable
                    @change="playbackss"
                    style="color:#ccc;"
                    class="CarSelect"
                  >
                    <el-option
                      v-for="item in optionss"
                      :key="item.value"
                      :label="item.vehlicnum"
                      :value="item.vehlicnum"
                    ></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <b class="iconfont icon-danzi"></b>
                <span>单号:</span>
                <div>
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
              </li>
            </ul>
            <el-button class="serchBtn" type="danger" round @click="serchSure(0)">确定</el-button>
          </div>
          <div>
            <div class="tableHeader">
              <div class="tableList tableList4">
                <el-table
                  :data="tableData"
                  size="small"
                  empty-text
                  border
                  :row-class-name="tableRowClassNames"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  class="tableListCssSerch"
                  @row-click="rowserch"
                >
                  <el-table-column
                    align="center"
                    type="index"
                    :index="indexMethod"
                    label="排序"
                    min-width="30"
                  ></el-table-column>

                  <el-table-column align="center" prop="vehgrpnam" label="承运商" min-width="70"></el-table-column>
                  <el-table-column align="center" prop="vehlicnum" label="车号" min-width="50"></el-table-column>
                  <el-table-column align="center" prop="deloutnam" label="客户"></el-table-column>
                  <el-table-column align="center" prop="deldocnum" label="单号" min-width="60"></el-table-column>
                  <el-table-column align="center" prop="startloadtime" label="装车时间" min-width="60"></el-table-column>
                  <el-table-column
                    align="center"
                    prop="signaturetime"
                    label="签单完成时间"
                    min-width="70"
                  ></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    v-if="pageshows"
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-sizes="[5, 15, 30, 50]"
                    :page-size="pageSizes"
                    :pager-count="count"
                    layout="prev, pager, next,sizes"
                    :total="total"
                    class="paginationCss"
                  ></el-pagination>
                  <el-pagination
                    v-else
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[5, 15, 30, 50]"
                    :page-size="pageSizes"
                    :pager-count="count"
                    layout="prev, pager, next,sizes"
                    :total="total"
                    class="paginationCss"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="eventNode cloceStopCar" v-show="cloceStopCar">
          <div class="nodeHead">
            停车记录
            <span class="cloceNode iconfont icon-guanbi" @click="cloceStopCars"></span>
          </div>
          <div class="tableHeader">
            <div class="tableList tableList5">
              <el-table
                :data="tableDatastop"
                stripe
                size="small"
                v-loading="loading"
                empty-text
                border
                class="tableListCssStop"
              >
                <el-table-column
                  align="center"
                  type="index"
                  :index="indexMethod"
                  label="次数"
                  min-width="30"
                ></el-table-column>
                <el-table-column align="center" prop="adr" label="停车位置"></el-table-column>
                <el-table-column align="center" prop="bte" label="开始时间" min-width="50"></el-table-column>
                <el-table-column align="center" prop="ete" label="结束时间" min-width="50"></el-table-column>
                <el-table-column align="center" prop="timeUsed" label="停车时长" min-width="40"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="eventNode cloceStopinfo" v-if="cloceStopinfos && ind!=-1">
          <div class="nodeHead">
            未约装运单明细
            <span class="deliveryInfo">发货车数：{{tableDataMe.length}}</span>
            <span class="cloceNode iconfont icon-guanbi" @click="cloceStopinfosF"></span>
          </div>
          <div class="tableHeader">
            <div class="tableList tableList8">
              <el-table
                :data="tableDataMe"
                size="small"
                :row-class-name="tableRowClassNameI"
                v-loading="loading"
                empty-text
                border
                max-height="350;"
                @row-click="DeliveryNotes"
              >
                <el-table-column align="center" prop="num" label="单数" min-width="30"></el-table-column>
                <el-table-column align="center" prop="tradocnum" label="装运单号" min-width="60"></el-table-column>
                <el-table-column align="center" prop="outnam" label="客户名称"></el-table-column>
                <el-table-column align="center" prop="shpartqty" label="数量" min-width="40"></el-table-column>
                <el-table-column align="center" prop="totartwgt" label="重量" min-width="40"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="DeliveryBox" id="DeliveryBox" v-show="cloceDelivery&&ind!=-1">
          <div class="DeliveryLeft">
            <ul v-for="(item, index) in DeliveryDatas.length" :key="index">
              <li @click="Deliveryinde(index)" :class="{activeLi:inde==index}">{{index+1}}</li>
            </ul>
          </div>

          <div class="eventNode nodeDelivery">
            <div class="nodeHead">
              送货单明细
              <span class="cloceNode iconfont icon-guanbi" @click="cloceDeliverys"></span>
            </div>
            <ul class="nodeList">
              <li>
                <div>承运商:</div>
                <span>{{DeliveryData.vehgrpnam}}</span>
              </li>
              <li>
                <div>车号:</div>
                <span>{{DeliveryData.vehlicnum}}</span>
              </li>
              <li>
                <div>车辆实时位置:</div>
                <span>{{DeliveryData.address}}</span>
              </li>
              <li>
                <div>预计到达时间:</div>
                <span class="estimate">{{DeliveryData.yarrivetime}}</span>
              </li>
              <li>
                <div>送货单号:</div>
                <span>{{DeliveryData.deldocnum}}</span>
              </li>
              <li>
                <div>客户:</div>
                <span>{{DeliveryData.outnam}}</span>
              </li>
              <li>
                <div>地址:</div>
                <span>{{DeliveryData.outadr}}</span>
              </li>
              <li>
                <div>联系人:</div>
                <span>{{DeliveryData.drinam}}</span>
              </li>
              <li>
                <div>电话:</div>
                <span class="tel">{{DeliveryData.mobilenum}}</span>
              </li>
              <li>
                <div>数量:</div>
                <span>{{DeliveryData.shpartqty}}</span>
              </li>
              <li>
                <div>重量:</div>
                <span>{{DeliveryData.totartwgt}}</span>
              </li>
              <li v-if="DeliveryData.Rczb">
                <div>车厢卫生照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Rczb.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Rczb',1)"
                  >查看</el-button>
                </span>
              </li>
              <li v-if="DeliveryData.Qd">
                <div>身体检查照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Qd.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Qd',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Rcdh">
                <div>放阻车器照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Rcdh.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Rcdh',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Zhgz">
                <div>收阻车器照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Zhgz.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Zhgz',1)"
                  >查看</el-button>
                </span>
              </li>
              <li v-if="DeliveryData.Ccgl">
                <div>登高作业照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Ccgl.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Ccgl',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Xhzt">
                <div>卸货照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Xhzt.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Xhzt',1)"
                  >查看</el-button>
                </span>
              </li>
              <li v-if="DeliveryData.Pszt">
                <div>破损照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Pszt.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Pszt',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Qdjs">
                <div>签单照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Qdjs.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Qdjs',1)"
                  >查看</el-button>
                </span>
              </li>
              <li class="nodeDeliveryTab">
                <div>品名规格</div>
                <span>箱数</span>
              </li>
              <li
                class="nodeDeliveryTabs"
                v-for="(item, index) in DeliveryData.retList"
                :key="index"
              >
                <div>{{item.artnam}}</div>
                <span>{{item.shpartqty}}箱</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="DeliveryBox DeliveryBoxCar" v-show="cloceDeliveryCar&&ind==-1">
          <div class="DeliveryLeft">
            <ul v-for="(item, index) in DeliveryDatas.length" :key="index">
              <li @click="Deliveryinde(index)" :class="{activeLi:inde==index}">{{index+1}}</li>
            </ul>
          </div>

          <div class="eventNode nodeDelivery">
            <div class="nodeHead">
              送货单明细
              <span class="cloceNode iconfont icon-guanbi" @click="cloceDeliverys"></span>
            </div>
            <ul class="nodeList">
              <li>
                <div>承运商:</div>
                <span>{{DeliveryData.vehgrpnam}}</span>
              </li>
              <li>
                <div>车号:</div>
                <span>{{DeliveryData.vehlicnum}}</span>
              </li>
              <li>
                <div>车辆实时位置:</div>
                <span>{{DeliveryData.address}}</span>
              </li>
              <li>
                <div>预计到达时间:</div>
                <span class="estimate">{{DeliveryData.yarrivetime}}</span>
              </li>
              <li>
                <div>送货单号:</div>
                <span>{{DeliveryData.deldocnum}}</span>
              </li>
              <li>
                <div>客户:</div>
                <span>{{DeliveryData.outnam}}</span>
              </li>
              <li>
                <div>地址:</div>
                <span>{{DeliveryData.outadr}}</span>
              </li>
              <li>
                <div>联系人:</div>
                <span>{{DeliveryData.drinam}}</span>
              </li>
              <li>
                <div>电话:</div>
                <span class="tel">{{DeliveryData.mobilenum}}</span>
              </li>
              <li>
                <div>数量:</div>
                <span>{{DeliveryData.shpartqty}}</span>
              </li>
              <li>
                <div>重量:</div>
                <span>{{DeliveryData.totartwgt}}</span>
              </li>

              <li v-if="DeliveryData.Rczb">
                <div>车厢卫生照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Rczb.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Rczb',1)"
                  >查看</el-button>
                </span>
              </li>
              <li v-if="DeliveryData.Qd">
                <div>身体检查照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Qd.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Qd',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Rcdh">
                <div>放阻车器照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Rcdh.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Rcdh',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Zhgz">
                <div>收阻车器照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Zhgz.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Zhgz',1)"
                  >查看</el-button>
                </span>
              </li>
              <li v-if="DeliveryData.Ccgl">
                <div>登高作业照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Ccgl.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Ccgl',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Xhzt">
                <div>卸货照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Xhzt.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Xhzt',1)"
                  >查看</el-button>
                </span>
              </li>
              <li v-if="DeliveryData.Pszt">
                <div>破损照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Pszt.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Pszt',1)"
                  >查看</el-button>
                </span>
              </li>

              <li v-if="DeliveryData.Qdjs">
                <div>签单照片:</div>
                <span>
                  <el-button
                    :class="DeliveryData.Qdjs.length!=0?'BtnLooks':'BtnLook'"
                    type="danger"
                    round
                    @click="LookPhoto('Qdjs',1)"
                  >查看</el-button>
                </span>
              </li>

              <li class="nodeDeliveryTab">
                <div>品名规格</div>
                <span>箱数</span>
              </li>
              <li
                class="nodeDeliveryTabs"
                v-for="(item, index) in DeliveryData.retList"
                :key="index"
              >
                <div>{{item.artnam}}</div>
                <span>{{item.shpartqty}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="eventNode clocePhoto"
          :class="imgListCenter?'imgListCenter':''"
          v-show="clocePhoto"
        >
          <div class="nodeHead">
            照片展示
            <span class="cloceNode iconfont icon-guanbi" @click="clocePhotos"></span>
          </div>
          <div class="tableHeader">
            <div class="tableList tableList6">
              <template>
                <div v-for="(item, index) in imgList" :key="index">
                  <div @click="imgsee(item.url)">
                    <div class="imgLists">
                      <img
                        class="img_sty"
                        :src="item.url"
                        width="110px!important"
                        height="100px"
                        alt
                      >
                    </div>
                    <p>{{item.name}}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="eventNode cloceStopCar clocePhoto clocePhoto1" v-show="clocePhotoG">
          <div class="nodeHead">
            照片展示
            <span class="cloceNode iconfont icon-guanbi" @click="clocePhotosG"></span>
          </div>
          <div class="tableHeader">
            <div class="tableList tableList6">
              <template>
                <div v-for="(item, index) in imgList" :key="index">
                  <div @click="imgsee(item.url)">
                    <div class="imgLists">
                      <img
                        class="img_sty"
                        :src="item.url"
                        width="110px!important"
                        height="100px"
                        alt
                      >
                    </div>
                    <p>{{item.name}}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="loadIng" v-loading="loadings"></div>
      <div class="loadIng" v-loading="loadingss"></div>

      <div class="imgLogoBox">
        <img class="imgLogo" :src="logoImg">
      </div>
      <!-- <router-view></router-view> -->
    </el-col>
    <div class="mask" v-if="maskFlag"></div>
    <div class="maskBox" v-if="maskBoxFlag0">
      <div class="maskhead">
        <div class="imgjinggao">
          <img class="img_sty" src="../assets/jinggao.png" alt>
        </div>
        <span>
          <span class="maskName">车辆失约提示</span>
        </span>
        <div class="iconfont icon-guanbi" @click="maskBoxf(0)"></div>
      </div>
      <ol>
        <li>
          <span>{{maskInfo.vehlicnum}}</span>
          预计超时{{maskInfo.mins}}分钟到达
        </li>
        <li>
          请与
          <span>{{maskInfo.vehlicnum}}</span>司机
          <span>小张({{maskInfo.tel}})</span>电话联系提前到达装货。
        </li>
      </ol>
      <el-button type="danger" @click="maskBoxf(0)" round>确定</el-button>
    </div>
    <div class="maskBox maskBoxW" v-if="maskBoxFlag1">
      <div class="maskhead">
        <div class="imgjinggao">
          <img class="img_sty" src="../assets/jinggao.png" alt>
        </div>
        <span>
          <span class="maskName">完成车辆提示</span>
        </span>
        <div class="iconfont icon-guanbi" @click="maskBoxf(1)"></div>
      </div>
      <div class="scrolls">
        <ol>
          <li v-for="(item) in markListX" :key="item.index">
            车辆
            <span>{{item.vehlicnum}}</span>
            已于{{item.arrivecustomertime}}到达,{{item.mins}}还没开始卸货,请督促赶快卸货。
          </li>
          <li class="qiandan" v-for="(item) in markListQ" :key="item.index">
            <span>{{item.vehlicnum}}</span>
            已卸货完成收货确认,{{item.mins}}还没签单,请督促收货员及时签单。
          </li>
        </ol>
      </div>
      <el-button type="danger" @click="maskBoxf(1)" round>确定</el-button>
    </div>
    <div class="SwitchButton">
      <div class="Switch_item" :class="SwitchActive==0?'SwitchActive':''" @click="SwitchActive=0">
        <img
          v-if="SwitchActive==0"
          class="img_sty"
          src="../assets/tubiaoW.png"
          width="23"
          height="16"
          alt
        >
        <img v-else class="img_sty" src="../assets/tubiao.png" width="23" height="16" alt>

        <div>运输</div>
      </div>
      <div class="Switch_item" :class="SwitchActive==1?'SwitchActive':''" @click="SwitchStorage">
        <img
          v-if="SwitchActive==0"
          class="img_sty"
          src="../assets/cangku-3.png"
          width="20"
          height="16"
          alt
        >
        <img v-else class="img_sty" src="../assets/cc.png" width="20" height="16" alt>
        <div>仓储</div>
      </div>
    </div>
    <div class="dialogBoxs">
      <el-dialog
        title="照片详情"
        :visible.sync="imgVisible"
        class="imgVisible"
        center
        width="60%"
        top="auto"
      >
        <div class="dialogBox">
          <img :src="PicPath" alt style="height:99%;">
        </div>
      </el-dialog>
    </div>
  </el-row>
</template>

<script>
var map,
  lnglats,
  positions,
  time1,
  time2,
  time3,
  time4,
  time5,
  time6,
  time7,
  time8;
var markers = [];
var markerList = [];
var maskMinFlag = [];
var markList = [];
var markListX = [];
var markListQ = [];
var errList = [];
import {
  getVehStatusNum,
  getVehStatusList,
  loadingTruckNum,
  deliveryTruckNum,
  waybillDetails,
  appointManage,
  contractVehicle,
  vehicleGroupsQuery,
  finishWaybillDetails,
  historyTruckNum,
  deliveryDetaileds,
  noSentOrder,
  tit
} from "../api/api";
export default {
  data() {
    return {
      title: "",
      SwitchActive: 0,
      sysName: "VUEADMIN",
      showTab: true,
      collapsed: false,
      sysUserName: "",
      imgVisible: false,
      PicPath: "",
      flag: 0,
      imgListCenter: false,
      logoImgNew: require("@/assets/NewLogo.png"),
      logoImg: require("@/assets/oldLogo.png"),
      icon_news: require("@/assets/icon_news.png"),
      yonghu: require("@/assets/yonghu.png"),
      sysUserAvatar: "",
      plus: true,
      maskBoxFlag0: false,
      maskBoxFlag1: false,
      maskFlag: false,
      DeliveryData: "",
      DeliveryDatas: [],
      currentPage1: 1, // 分页初始页数
      currentPage2: 1, // 分页初始页数
      currentPage: 1, // 分页初始页数
      PageIndex: 0, // 哪一个分页
      checkList: [],
      valueTime: "",
      ind: -1, // 默认Tab下标
      inde: 0,
      count: 5, //分页按钮个数
      pageSizes: 5, // 搜索页分页初始条数
      pageSize: 7, // 分页初始条数
      total: null, // 总条数
      cloceStopinfos: false, //未约装运单明细 显示隐藏
      cloceDelivery: false, //送货单明细 显示隐藏
      pageshow: true, // 分页显示替换
      pageshows: true, // 分页显示替换
      tabHeadShow: false, // tab 显示隐藏
      tabHeadShows: true, // tab 显示隐藏
      tabBottomShow: false, // tab 显示隐藏
      tabBottomShows: true, // tab 显示隐藏
      cloceNode: false, // 短时间节点 显示隐藏
      cloceNodeG: false, // 长时间节点 显示隐藏
      serchNode: false, // 搜索页 显示隐藏
      cloceStopCar: false, // 停车节点 显示隐藏
      clocePhoto: false, // 照片展示  显示隐藏
      clocePhotoG: false, // 照片展示1  显示隐藏
      tableDataList: [], // 全部数据
      tableDatas: [],
      tableData: [], // 分页数据
      NodeLists: "", //所有图片数据
      NodeListsS: "", //所有图片数据送货
      imgList: [], //图片列表
      options: [],
      optionss: [],
      StatusNum: "", // 各种数量
      input: "", // 输入框值
      selecIndex: 0, //哪一个下拉项
      value0: "", // 下拉值0
      value1: "", // 下拉值1
      value2: "", // 下拉值2
      value3: "", // 下拉值3
      loading: false,
      loadings: false,
      loadingss: false,
      lineArr: [], //gps坐标
      stopVCN: [], //停车点
      setZooms: false, // 地图层级
      currentRow: null, //高亮那条
      index: -1,
      indexs: -1,
      cloceDeliveryCar: false,
      tableDatastop: [],
      dataTime: "",
      setTimeFlag: true,
      boxshow: false,
      valueTimes: "",
      headList: [
        {
          name: "超时车数",
          class: "line-yel",
          num: "",
          sty: "辆"
        },
        {
          name: "失约车数",
          class: "line-76",
          num: "",
          sty: "辆"
        },
        {
          name: "未发车数",
          class: "line-fb6",
          num: "",
          sty: "辆"
        },
        {
          name: "已发重量",
          class: "line-org",
          num: "",
          sty: "吨"
        },
        {
          name: "已发车数",
          class: "line-7f",
          num: "",
          sty: "辆"
        },
        {
          name: "应发重量",
          class: "line-gre",
          num: "",
          sty: "吨"
        },
        {
          name: "应发车数",
          class: "line-blu",
          num: "",
          sty: "辆"
        }
      ],
      manageData: "",
      tableDataMe: [],
      maskInfo: "",
      markListX: [],
      markListQ: [],
      goodsClose: false,
      ViolationClose: false
    };
  },
  watch: {
    value1(val, oldVal) {
      //普通的watch监听
      if (val == "") {
        this.value2 = "";
      }
    },
    ind(val, oldVal) {
      //普通的watch监听
      this.index = -1;
      this.indexs = -1;
    }
  },
  methods: {
    maskBoxf(val) {
      this.maskFlag = false;
      if (val === 0) {
        this.maskBoxFlag0 = false;
      } else if (val === 1) {
        this.maskBoxFlag1 = false;
      }
    },
    imgsee(url) {
      if (url) {
        this.imgVisible = true;
        this.PicPath = url;
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    Deliveryinde(index) {
      // 送货单列表切换
      this.inde = index;
      this.DeliveryData = this.DeliveryDatas[index];
    },
    // 表头样式
    rowClass({ row, column, rowIndex, columnIndex }) {
      //console.log(row, column, rowIndex, columnIndex);
      return "background:red; height: 45px;font-weight: normal; color: #fff";
    },
    // 点击Tab每一项
    carStatus(val) {
      this.cloceNodeG = false;
      this.ViolationClose = false;
      this.goodsClose = false;
      this.cloceDelivery = false;
      this.inde = 0;
      this.cloceDeliveryCar = false;
      this.tableData = [];
      this.tableDatas = [];
      this.numList();
      this.lineArr = [];
      this.stopVCN = [];
      this.loading = true;
      this.cloceNode = false;
      this.clocePhotoS = false;
      this.clocePhoto = false;
      this.clocePhotoG = false;
      this.cloceStopinfos = false;
      this.ind = val;
      this.total = this.tableDatas.length;
      this.pageshow = !this.pageshow;
      this.pageSize = 7;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.currentPage = 1;
      this.setZooms = true;
      //console.log(val);
      if (val == 0) {
        // let msg = new SpeechSynthesisUtterance('傻不傻');
        // speechSynthesis.speak(msg);

        this.table1(val);
      } else if (val == 1 || val == 2) {
        this.table23(val);
      } else if (val == 3) {
        this.setTimeFlag = true;
        this.table3(val);
      } else if (val == 4) {
        this.table4(val);
      } else if (val == 5) {
        this.table5(val);
      } else if (val == 6) {
        this.table6(val);
      } else if (val == 7) {
        this.table7(val);
      } else {
        this.$message("开发中！");
        this.ind = -1;
      }
    },
    // 列表1接口
    table1(val) {
      if (this.ind == 0) {
        loadingTruckNum().then(res => {
          // this.loading = false;
          if (this.ind == 0) {
            if (res.data.ret_code === "0") {
              clearTimeout(time1);
              time1 = setTimeout(() => {
                this.table1(val);
              }, 300000);
              let dataList = res.data.data;
              //console.log(dataList);
              if (dataList.length == 0) {
                this.loading = false;
              } else {
                this.tableDatas = dataList;
                this.tableDataOperation(val);
                map.clearMap();
                this.mapMarker(dataList, null);
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
              this.loading = false;
            }
          }
        });
      }
    },
    // 列表23接口
    table23(val) {
      if (this.ind == 1 || this.ind == 2) {
        const data = new URLSearchParams();
        if (val == 1) {
          data.append("type", 2);
        } else {
          data.append("type", 3);
        }
        getVehStatusList(data).then(res => {
          if (this.ind == 1 || this.ind == 2) {
            this.loading = false;
            if (res.data.ret_code === "0") {
              clearTimeout(time4);
              time4 = setTimeout(() => {
                this.table23(val);
              }, 300000);
              let dataList = res.data.data;

              this.tableDatas = dataList.list;
              if (this.tableDatas.length != 0) {
                this.tableDataOperation();
              }

              map.clearMap();

              if (dataList.whsMap.lng) {
                var circle = new AMap.Circle({
                  map: map,
                  center: [dataList.whsMap.lng, dataList.whsMap.lat], //设置线覆盖物路径
                  radius: dataList.whsMap.distanceLimit,
                  strokeColor: "#3366FF", //边框线颜色
                  strokeOpacity: 0.3, //边框线透明度
                  strokeWeight: 3, //边框线宽
                  fillColor: "#FFA500", //填充色
                  fillOpacity: 0.35 //填充透明度
                });

                var markerContent = `<div class="custom-content-marker"><div class="carImg" style="width:100px">
                <img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcTGANruiAAUiKVgFSIg312.png" width="100%";"></div>
                <div class="close-btn" style="background:#534f71;color:#fff;opacity: .9;padding: 5px;max-width:100px;min-width:100px;margin-left: 94px;margin-top: -100px;">
            ${dataList.whsMap.whsadr}
            </div></div>`;
                var marker = new AMap.Marker({
                  position: [dataList.whsMap.lng, dataList.whsMap.lat],
                  content: markerContent,
                  offset: new AMap.Pixel(-20, -40),
                  map: map
                });

                // if (dataList.vehList.length == 0) {
                //   let currentZoom = map.getZoom();
                //   if (this.setZooms) {
                //     map.setFitView();
                //     this.setZooms = false;
                //   } else {
                //     map.setZoom(currentZoom);
                //   }
                // }
              }
              // console.log(dataList)

              // dataList.vehList.forEach((item,index)=>{
              //   item.id =  dataList.list[index].id
              // })
              if (dataList.vehList) {
                this.mapMarker(dataList.vehList, null);
              }

              map.setFitView();
              // if (dataList.vehList.length != 0) {
              //   this.mapMarker(dataList.vehList, null);
              // }
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          }
        });
      }
    }, // 列表四接口
    table3(val) {
      if (this.ind == 3) {
        deliveryTruckNum().then(res => {
          if (this.ind == 3 && this.setTimeFlag) {
            // this.loading = false;
            if (res.data.ret_code === "0") {
              clearTimeout(time2);
              time2 = setTimeout(() => {
                this.table3(val);
              }, 300000);

              let dataList = res.data.data;
              this.tableDatas = dataList;
              this.markListX = [];
              markListX = [];
              this.markListQ = [];
              markListQ = [];
              if (dataList.length != 0) {
                this.tableRowClassNameWQ(dataList);
              }

              this.tableDataOperation(3);
              map.clearMap();
              // let polyline = new AMap.Polyline({
              //   map: map,
              //   path: this.lineArr,
              //   showDir: true,
              //   strokeColor: "#28F", //线颜色
              //   // strokeOpacity: 1,     //线透明度
              //   strokeWeight: 6 //线宽
              //   // strokeStyle: "solid"  //线样式
              // });
              this.mapMarker(dataList, null);
              // this.mapMarker(this.stopVCN, 1);
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });

              this.loading = false;
            }
          }
        });
      }
    },
    table4(val) {
      if (this.ind == 4) {
        appointManage().then(res => {
          if (this.ind == 4) {
            this.loading = false;

            if (res.data.ret_code === "0") {
              clearTimeout(time6);
              time6 = setTimeout(() => {
                this.table4(val);
              }, 300000);
              let dataList = res.data.data.retList;
              this.manageData = res.data.data;
              this.tableDatas = dataList;

              this.tableDataOperation();
              // map.clearMap();

              //this.mapMarker(dataList, null);
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          }
        });
      }
    },
    table5(val) {
      if (this.ind == 5) {
        let dates = new Date();
        let dateTime =
          dates.getFullYear() +
          "-" +
          (dates.getMonth() + 1 < 10
            ? "0" + (dates.getMonth() + 1)
            : dates.getMonth() + 1) +
          "-" +
          (dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate());
        const data = new URLSearchParams();
        data.append("arrivetime", dateTime);
        historyTruckNum(data).then(res => {
          this.loading = false;
          if (this.ind == 5) {
            if (res.ret_code === "0") {
              clearTimeout(time5);
              time5 = setTimeout(() => {
                this.table5(val);
              }, 300000);
              let dataList = res.data;
              if (dataList) {
                this.tableDatas = dataList;
                this.tableDataOperation(val);
              } else {
                this.tableDatas = "";
              }

              // map.clearMap();
              // this.mapMarker(dataList, val);
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          }
        });
      }
    },
    table6(val, time) {
      if (this.ind == 6) {
        let dateTime;
        if (!time) {
          let dates = new Date();
          dateTime =
            dates.getFullYear() +
            "-" +
            (dates.getMonth() + 1 < 10
              ? "0" + (dates.getMonth() + 1)
              : dates.getMonth() + 1);
          this.valueTime = dateTime;
        } else {
          dateTime = time;
        }
        console.log(dateTime);
        const data = new URLSearchParams();
        data.append("arrivetime", "2019-07-15");
        historyTruckNum(data).then(res => {
          this.loading = false;
          if (this.ind == 6) {
            if (res.ret_code === "0") {
              clearTimeout(time7);
              time7 = setTimeout(() => {
                this.table6();
              }, 300000);
              let dataList = res.data;

              if (dataList) {
                this.tableDatas = dataList;
                this.tableDataOperation();
              }
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          }
        });
      }
    },
    table7(val, time) {
      if (this.ind == 7) {
        let dateTime;
        if (!time) {
          let dates = new Date();
          dateTime =
            dates.getFullYear() +
            "-" +
            (dates.getMonth() + 1 < 10
              ? "0" + (dates.getMonth() + 1)
              : dates.getMonth() + 1);
          this.valueTime = dateTime;
        } else {
          dateTime = time;
        }
        console.log(dateTime);
        const data = new URLSearchParams();
        data.append("arrivetime", "2019-07-15");
        historyTruckNum(data).then(res => {
          this.loading = false;
          if (this.ind == 7) {
            if (res.ret_code === "0") {
              clearTimeout(time8);
              time8 = setTimeout(() => {
                this.table7();
              }, 300000);
              let dataList = res.data;

              if (dataList) {
                this.tableDatas = dataList;
                this.tableDataOperation();
              }
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          }
        });
      }
    },
    mapMarker(dataList, val) {
      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30)
      });

      dataList.forEach((item, index) => {
        if (item.adr_lon || item.lon || item.gps) {
          if (val == 1) {
            var markerContents = `<div class="custom-content-marker"><div class="carImg" style="width:24px"><img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcXuAdWscAAAGbPTg35o214.png"></div></div>`;
            var marker = new AMap.Marker({
              position: [
                item.lon
                  ? item.lon
                  : item.gps.lon
                  ? item.gps.lon
                  : item.adr_lon,
                item.lat ? item.lat : item.gps.lat ? item.gps.lat : item.adr_lat
              ],
              content: markerContents,

              map: map
            });
            marker.content = `<div class="show show1">
                <ul>
                  <li>
                    <span class="left-name">序号:</span>
                    <span>${index + 1}</span>
                  </li>
                  <li>
                    <span class="left-name">开始时间:</span>
                    <span>${item.bte}</span>
                  </li>
                  <li>
                    <span class="left-name">结束时间:</span>
                    <span>${item.ete}</span>
                  </li>
                  <li>
                    <span class="left-name">经度:</span>
                    <span>${item.lon}</span>
                  </li>
                  <li>
                    <span class="left-name">纬度:</span>
                    <span>${item.lat}</span>
                  </li>
                  <li>
                    <span class="left-name" >时长:</span>
                    <span>${item.timeUsed}</span>
                  </li>
                  <li>
                    <span class="left-name" >位置:</span>
                    <span>${item.adr}</span>
                  </li>
                </ul>
              </div>`;

            marker.on("click", markerClicks);
          } else if (val == 2 || val == 3) {
            let geocoder = new AMap.Geocoder();
            geocoder.getAddress([item.lon, item.lat], (status, result) => {
              if (status === "complete" && result.regeocode) {
                var address = result.regeocode.formattedAddress;
                marker.content = `<div class="show show1">
                <ul> 
                  <li>
                    <span class="left-name">经度:</span>
                    <span>${item.lon}</span>
                  </li>
                  <li>
                    <span class="left-name">纬度:</span>
                    <span>${item.lat}</span>
                  </li>
                  <li>
                    <span class="left-name" >位置:</span>
                    <span>${address}</span>
                  </li>
                </ul>
              </div>`;
                marker.on("click", markerClicks);
              } else {
                marker.content = `<div class="show show1">
                <ul> 
                  <li>
                    <span class="left-name">经度:</span>
                    <span>${item.lon}</span>
                  </li>
                  <li>
                    <span class="left-name">纬度:</span>
                    <span>${item.lat}</span>
                  </li>
                  <li>
                    <span class="left-name" >位置:</span>
                    <span>查询地址失败!</span>
                  </li>
                </ul>
              </div>`;
                //console.log("根据经纬度查询地址失败");
              }
            });

            if (val == 2) {
              var markerContents = `<div class="custom-content-marker"><div class="carImg" style="width:24px"><img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcbWAK7HeAAAKIVPlPEc332.png"></div></div>`;
            } else if (val == 3) {
              var markerContents = `<div class="custom-content-marker"><div class="carImg" style="width:24px"><img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcdWAFDCWAAAJdeHUDiI515.png"></div></div>`;
            }

            var marker = new AMap.Marker({
              position: [
                item.lon ? item.lon : item.gps.lon,
                item.lat ? item.lat : item.gps.lat
              ],
              content: markerContents,
              map: map
            });
          } else {
            if (this.ind == 0) {
              var markerContents = `<div class="custom-content-marker"><div class="carImgs" style="width:16px;height:40px"><img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tcg6AAWPGAAADLaBVvpI692.png" width=16px height=40px style="transform: rotate(${
                item.drc ? item.drc : 45
              }deg);"></div><div class="close-btn" style="background:#F42D3B;border-radius:10px;color:#fff;padding: 5px;margin-left: 20px;margin-top: -40px;"><span style = "white-space:nowrap "> ${
                item.vno ? item.vno : item.vehlicnum
              }
                </span>
              </div></div>`;

              var marker = new AMap.Marker({
                position: [
                  item.lon ? item.lon : item.adr_lon,
                  item.lat ? item.lat : item.adr_lat
                ],
                content: markerContents,

                map: map
              });
            } else if (this.ind == 3) {
              var markerContents = `<div class="custom-content-marker"><div class="carImgs" style="width:16px;height:40px"><img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tcg6AAWPGAAADLaBVvpI692.png" width=16px height=40px style="transform: rotate(${
                item.drc ? item.drc : item.gps.drc
              }deg);"></div><div class="close-btn" style="background:#F42D3B;border-radius:10px;color:#fff;padding: 5px;margin-left: 20px;margin-top: -40px;"><span style = "white-space:nowrap "> ${
                item.vehlicnum ? item.vehlicnum : item.gps.vno
              }
                  </span>
                </div></div>`;

              if (item.gps.lon) {
                var marker = new AMap.Marker({
                  position: [item.gps.lon, item.gps.lat],
                  content: markerContents,
                  map: map
                });
              }
            } else {
              var markerContents = `<div class="custom-content-marker"><div class="carImgs" style="width:16px;height:40px"><img class="img" src="http://img.logwsd.com/group1/M00/01/39/rBUAEF1Tcg6AAWPGAAADLaBVvpI692.png" width=16px height=40px style="transform: rotate(${
                item.drc ? item.drc : item.gps.drc
              }deg);"></div><div class="close-btn" style="background:#F42D3B;border-radius:10px;color:#fff;padding: 5px;margin-left: 20px;margin-top: -40px;"><span style = "white-space:nowrap "> ${
                item.vno ? item.vno : item.gps.vno
              }
                  </span>
                </div></div>`;

              var marker = new AMap.Marker({
                position: [
                  item.lon ? item.lon : item.gps.lon,
                  item.lat ? item.lat : item.gps.lat
                ],
                content: markerContents,
                map: map
              });
            }
            if (
              this.ind == 0 ||
              this.ind == 3 ||
              this.ind == 1 ||
              this.ind == 2
            ) {
              // markerList.push(marker);
              //   marker.content = `<div class="show">
              // <ul>
              //   <li>
              //     <span class="left-name">车队:</span>
              //     <span>${item.vehgrpnam}</span>
              //   </li>
              //   <li>
              //     <span class="left-name">车号:</span>
              //     <span>${item.vehlicnum}</span>
              //   </li>
              //   <li>
              //     <span class="left-name">运单号:</span>
              //     <span>${item.tradocnum}</span>
              //   </li>
              //   <li>
              //     <span class="left-name">客户:</span>
              //     <span>${item.outman}</span>
              //   </li>
              //   <li>
              //     <span class="left-name">位置:</span>
              //     <span>${item.gps.adr}</span>
              //   </li>
              // </ul></div>`;

              if (marker) {
                marker.id = item.id;
                marker.on("click", markerClick);
              }
            }
          }
        }
      });
      let that = this;
      function markerClick(e) {
        that.deliveryDetailed(e.target.id);
        that.cloceDeliveryCar = true;
        that.tabBottomShow = false;
        that.tabHeadShow = false;
        that.serchNodes();
        that.loadings = true;
        that.ind = -1;

        // infoWindow.setContent(e.target.content);
        // infoWindow.open(map, e.target.getPosition());
      }
      function markerClicks(e) {
        // that.deliveryDetailed(e.target.id);
        // that.cloceDeliveryCar = true;
        // that.tabBottomShow = false;
        // that.tabHeadShow = false;
        // that.serchNodes();
        // that.loadings = true
        // that.ind = -1;

        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
      }
      let currentZoom = map.getZoom();
      // map.setZoom(currentZoom)

      //map.setZoomAndCenter(currentZoom, positions);
      if (this.setZooms) {
        map.setFitView();
        this.setZooms = false;
      } else {
        map.setZoom(currentZoom);
      }
    },

    tableDataOperation(val) {
      this.total = this.tableDatas.length;

      if (this.PageIndex == 4) {
        this.tableData = this.tableDatas.slice(
          (this.currentPage - 1) * this.pageSizes,
          this.currentPage * this.pageSizes
        );
      } else {
        if (val == "err1" || val == "err2") {
          var tableData = errList;
        } else {
          errList = [];
          var tableData = this.tableDatas.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
        }

        let dates = new Date();

        this.dataTime =
          dates.getFullYear() +
          "/" +
          (dates.getMonth() + 1 < 10
            ? "0" + (dates.getMonth() + 1)
            : dates.getMonth() + 1) +
          "/" +
          (dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate()) +
          " " +
          (dates.getHours() < 10 ? "0" + dates.getHours() : dates.getHours()) +
          ":" +
          (dates.getMinutes() < 10
            ? "0" + dates.getMinutes()
            : dates.getMinutes()) +
          ":" +
          (dates.getSeconds() < 10
            ? "0" + dates.getSeconds()
            : dates.getSeconds());
        if (val == "0" || val == "3" || val == "err1" || val == "err2") {
          var resultList = [];
          for (var i = 0; i < tableData.length; i += 5) {
            resultList.push(tableData.slice(i, i + 5));
          }
          resultList.forEach((ite, ind) => {
            setTimeout(() => {
              ite.forEach((item, index) => {
                var truckOptions = {
                  size: 2
                };
                //   item.endLon && item.endLat && item.gps.lon && item.gps.lat
                if (this.ind == "0" || this.ind == "3") {
                  if (val == "0" || val == "err1") {
                    if (
                      item.adr_lon &&
                      item.adr_lat &&
                      item.whsadr_lat &&
                      item.whsadr_lon
                    ) {
                      positions = [item.adr_lon, item.adr_lat];
                      // 货车路径规划
                      var driving = new AMap.TruckDriving(truckOptions);
                      var path = [];

                      path.push({
                        lnglat: [item.adr_lon, item.adr_lat]
                      }); //起点
                      // path.push({ lnglat: [116.321354, 39.896436] }); //途径
                      path.push({
                        lnglat: [item.whsadr_lon, item.whsadr_lat]
                      }); //终点

                      driving.search(path, (status, result) => {
                        // document.getElementsByClassName("shows")[index].style.display =
                        //   "none";

                        if (status === "complete") {
                          if (val == "err1") {
                            errList.splice(index, 1);
                          }

                          var x = this.dataTime;
                          var time = new Date(x.replace("-", "/"));
                          var b = result.routes[0].time / 60; //分钟数
                          time.setMinutes(
                            time.getMinutes() + b,
                            time.getSeconds(),
                            0
                          );
                          var d = new Date(time);
                          var dateY =
                            d.getFullYear() +
                            "-" +
                            (d.getMonth() + 1 < 10
                              ? "0" + (d.getMonth() + 1)
                              : d.getMonth() + 1) +
                            "-" +
                            (d.getDate() < 10
                              ? "0" + d.getDate()
                              : d.getDate()) +
                            " " +
                            (d.getHours() < 10
                              ? "0" + d.getHours()
                              : d.getHours()) +
                            ":" +
                            (d.getMinutes() < 10
                              ? "0" + d.getMinutes()
                              : d.getMinutes()) +
                            ":" +
                            (d.getSeconds() < 10
                              ? "0" + d.getSeconds()
                              : d.getSeconds());

                          item.yarrivetime = dateY;
                          item.distance = (
                            result.routes[0].distance / 1000
                          ).toFixed(2);
                        } else {
                          errList.push(item);
                          if (this.tableData.length != 0) {
                            item["yarrivetime"] = this.tableData[index][
                              "yarrivetime"
                            ];
                            item["distance"] = this.tableData[index][
                              "distance"
                            ];
                          }

                          console.log("获取货车规划数据失败");
                        }
                        let tableDatas = [];
                        if (tableData.length - 1 == ind * 5 + index) {
                          for (let a = 0; a < resultList.length; a++) {
                            tableDatas = tableDatas.concat(resultList[a]);
                          }
                          if (errList.length != 0) {
                            setTimeout(() => {
                              console.log(errList);
                              this.tableDataOperation("err1");
                            }, 1000);
                          }

                          if (val == "0") {
                            this.tableData = tableDatas;
                            maskMinFlag = [];
                            this.loading = false;
                          }
                        }
                      });
                    } else {
                      let tableDatas = [];
                      item.yarrivetime = "无(地址信息缺失)";
                      item.distance = "无";
                      for (let a = 0; a < resultList.length; a++) {
                        tableDatas = tableDatas.concat(resultList[a]);
                      }
                      if (tableData.length - 1 == ind * 5 + index) {
                        this.tableData = tableDatas;
                        maskMinFlag = [];
                        this.loading = false;
                      }
                    }
                  } else if (val == "3" || val == "err2") {
                    if (
                      item.endLon &&
                      item.endLat &&
                      item.gps.lon &&
                      item.gps.lat
                    ) {
                      positions = [item.gps.lon, item.gps.lat];
                      // 货车路径规划
                      var driving = new AMap.TruckDriving(truckOptions);
                      var path = [];

                      path.push({
                        lnglat: [item.gps.lon, item.gps.lat]
                      }); //起点
                      // path.push({ lnglat: [116.321354, 39.896436] }); //途径
                      path.push({
                        lnglat: [item.endLon, item.endLat]
                      }); //终点

                      driving.search(path, (status, result) => {
                        // document.getElementsByClassName("shows")[index].style.display =
                        //   "none";
                        if (status === "complete") {
                          if (val == "err2") {
                            errList.splice(index, 1);
                          }
                          var x = this.dataTime;
                          var time = new Date(x.replace("-", "/"));
                          var b = result.routes[0].time / 60; //分钟数
                          time.setMinutes(
                            time.getMinutes() + b,
                            time.getSeconds(),
                            0
                          );
                          var d = new Date(time);
                          var dateY =
                            d.getFullYear() +
                            "-" +
                            (d.getMonth() + 1 < 10
                              ? "0" + (d.getMonth() + 1)
                              : d.getMonth() + 1) +
                            "-" +
                            (d.getDate() < 10
                              ? "0" + d.getDate()
                              : d.getDate()) +
                            " " +
                            (d.getHours() < 10
                              ? "0" + d.getHours()
                              : d.getHours()) +
                            ":" +
                            (d.getMinutes() < 10
                              ? "0" + d.getMinutes()
                              : d.getMinutes()) +
                            ":" +
                            (d.getSeconds() < 10
                              ? "0" + d.getSeconds()
                              : d.getSeconds());

                          item.yarrivetime = dateY;
                          item.distance = (
                            result.routes[0].distance / 1000
                          ).toFixed(2);
                        } else {
                          errList.push(item);
                          if (this.tableData.length != 0) {
                            item["yarrivetime"] = this.tableData[index][
                              "yarrivetime"
                            ];
                            item["distance"] = this.tableData[index][
                              "distance"
                            ];
                          }

                          console.log("获取货车规划数据失败" + result);
                          // console.log( item.gps.lon,item.endLon);
                        }

                        let tableDatas = [];
                        for (let a = 0; a < resultList.length; a++) {
                          tableDatas = tableDatas.concat(resultList[a]);
                        }

                        if (tableData.length - 1 == ind * 5 + index) {
                          console.log(errList);
                          if (errList.length != 0) {
                            setTimeout(() => {
                              this.tableDataOperation("err2");
                            }, 1000);
                          }

                          if (val == "3") {
                            this.tableData = tableDatas;
                            maskMinFlag = [];
                            this.loading = false;
                          }
                        }
                      });
                    } else {
                      item.yarrivetime = "无(地址信息缺失)";
                      item.distance = "无";
                      let tableDatas = [];
                      for (let a = 0; a < resultList.length; a++) {
                        tableDatas = tableDatas.concat(resultList[a]);
                      }
                      if (tableData.length - 1 == ind * 5 + index) {
                        this.tableData = tableDatas;
                        maskMinFlag = [];
                        this.loading = false;
                      }

                      // if (tableData.length - 1 == index) {
                      //   this.tableData = tableData;
                      //   this.loading = false;
                      // }
                    }
                  }
                }
              });
            }, ind * 1000);
          });
        } else {
          this.tableData = this.tableDatas.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
        }
      }
    },
    // handleCurrentChanges(val) {
    //     this.currentRow = val;
    //   },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //         if (columnIndex === 0) {
      //           if(rowIndex>0){
      //  if (row.vehlicnum === this.tableDatas[rowIndex-1].vehlicnum) {
      //             return {
      //               rowspan: 2,
      //               colspan: 1
      //             };
      //           // } else {
      //           //   return {
      //           //     rowspan: 0,
      //           //     colspan: 0
      //           //   };
      //            }
      //           }
      //        }
    },
    DateMinus(date1, date2) {
      if (date2 == "now") {
        var now = new Date();
      } else {
        var now = new Date(date2.replace(/-/g, "/"));
      }
      //date1:小日期   date2:大日期
      var sdate = new Date(date1.replace(/-/g, "/"));
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));

      return days;
    },

    tableRowClassNameL({ row, rowIndex }) {
      row.index = rowIndex;
      if (rowIndex === this.index) {
        return "success-row";
      }
      let min = this.DateMinus(row.plantime, row.yarrivetime);
      if (min > 0) {
        var hours = parseInt(min / (1000 * 60 * 60));
        var mins = parseInt(parseInt(min % (1000 * 60 * 60)) / (1000 * 60));
        let times = hours + "小时" + mins + "分钟";
        markList = [];
        this.tableData.forEach((item, index) => {
          let minList = this.DateMinus(row.plantime, item.yarrivetime);
          if (minList < 0) {
            markList.push(item);
          }
        });
        maskMinFlag.push({
          vehlicnum: row.vehlicnum,
          mins: times,
          tel: row.id,
          index: rowIndex,
          markList: markList
        });
        return "red-row";
      }
      if (this.tableData.length - 1 == rowIndex) {
        // this.maskFlag = true
        // this.maskBoxFlag0 = true
        this.maskInfo = maskMinFlag[0];
        //console.log(maskMinFlag);
      }
    },
    tableRowClassNameWQ(row) {
      //把每一行的索引放进row
      // row.index = rowIndex;
      //       if (rowIndex === this.index) {
      //         return "success-row";
      //       }
      row.forEach(row => {
        if (row.arrivecustomertime && !row.startunloadtime) {
          let tim = this.DateMinus(row.arrivecustomertime, "now");
          var hours = parseInt(tim / (1000 * 60 * 60));
          var mins = parseInt(parseInt(tim % (1000 * 60 * 60)) / (1000 * 60));
          let times = hours + "小时" + mins + "分钟";
          markListX.push({
            vehlicnum: row.vehlicnum,
            mins: times,
            arrivecustomertime: row.arrivecustomertime
          });
        }

        if (row.completunloadtime) {
          let tim = this.DateMinus(row.completunloadtime, "now");
          var hours = parseInt(tim / (1000 * 60 * 60));
          var mins = parseInt(parseInt(tim % (1000 * 60 * 60)) / (1000 * 60));
          let times = hours + "小时" + mins + "分钟";
          markListQ.push({
            vehlicnum: row.vehlicnum,
            mins: times,
            completunloadtime: row.completunloadtime
          });
        }

        if (markListQ.length != 0 || markListX.length != 0) {
          this.markListQ = markListQ;
          this.markListX = markListX;
          this.maskFlag = true;
          this.maskBoxFlag1 = true;
        }
      });
    },
    tableRowClassNameI({ row, rowIndex }) {
      //把每一行的索引放进row
      //console.log(row);
      row.index = rowIndex;
      if (row.colour === "Y") {
        if (rowIndex === this.indexs) {
          return "success-row red-row";
        } else {
          return "red-row";
        }
      } else {
        if (rowIndex === this.indexs) {
          return "success-row";
        } else {
          return "";
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      //console.log(row);

      row.index = rowIndex;
      if (rowIndex === this.index) {
        return "success-row";
      }
    },

    tableRowClassNames({ row, rowIndex }) {
      //把每一行的索引放进row

      row.index = rowIndex;
      if (rowIndex === this.index) {
        return "success-row";
      }
    },
    DeliveryNotes(row, column, event) {
      this.loadings = true;
      this.indexs = row.index;

      this.deliveryDetailed(row.id);
    },
    DeliveryNote(row, column, event) {
      this.loadings = true;
      this.index = row.index;
      this.indexs = -1;

      this.deliveryDetailed(row.id);
    },
    deliveryDetailed(id) {
      const data = new URLSearchParams();
      data.append("id", id);
      deliveryDetaileds(data).then(res => {
        this.DeliveryDatas = [];
        //this.DeliveryData= []
        this.loadings = false;
        this.inde = 0;
        if (res.data.ret_code === "0") {
          let dataList = res.data.data;
          dataList.forEach((item, index) => {
            var truckOptions = {
              size: 1
            };

            if (
              item.adr_lon &&
              item.adr_lat &&
              item.outadr_lat &&
              item.outadr_lon
            ) {
              positions = [item.adr_lon, item.adr_lat];
              // 货车路径规划
              var driving = new AMap.TruckDriving(truckOptions);
              var path = [];

              path.push({
                lnglat: [item.adr_lon, item.adr_lat]
              }); //起点
              // path.push({ lnglat: [116.321354, 39.896436] }); //途径
              path.push({
                lnglat: [item.outadr_lon, item.outadr_lat]
              }); //终点

              driving.search(path, (status, result) => {
                if (status === "complete") {
                  var x = this.dataTime;
                  var time = new Date(x.replace("-", "/"));
                  var b = result.routes[0].time / 60; //分钟数
                  time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
                  var d = new Date(time);
                  var dateY =
                    d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1 < 10
                      ? "0" + (d.getMonth() + 1)
                      : d.getMonth() + 1) +
                    "-" +
                    (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
                    " " +
                    (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
                    ":" +
                    (d.getMinutes() < 10
                      ? "0" + d.getMinutes()
                      : d.getMinutes()) +
                    ":" +
                    (d.getSeconds() < 10
                      ? "0" + d.getSeconds()
                      : d.getSeconds());

                  item.yarrivetime = dateY;
                } else {
                  if (this.DeliveryDatas.length != 0) {
                    item["yarrivetime"] = this.DeliveryDatas[index][
                      "yarrivetime"
                    ];
                  }
                  //console.log("获取货车规划数据失败");
                }

                if (dataList.length - 1 == index) {
                  this.DeliveryDatas = dataList;
                  this.DeliveryData = this.DeliveryDatas[0];
                  this.NodeListsS = this.DeliveryData;
                  this.loading = false;
                }
              });
            } else {
              if (dataList.length - 1 == index) {
                this.DeliveryDatas = dataList;
                this.DeliveryData = this.DeliveryDatas[0];
                this.NodeListsS = this.DeliveryData;
                this.loading = false;
                item.yarrivetime = "无(地址信息缺失)";
              }
            }
          });

          if (this.ind == 4) {
            this.rowserchDelivery(8);
          } else if (this.ind == 0) {
            this.rowserchDelivery(0);
          } else if (this.ind == 1) {
            this.rowserchDelivery(1);
          } else if (this.ind == 2) {
            this.rowserchDelivery(2);
          } else if (this.ind == 3) {
            this.rowserchDelivery(3);
          }
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    rowExpand(row, column, event) {
      if (this.ind == 3) {
        this.DeliveryNote(row, column, event);
      }

      // 点击4列表
      this.setTimeFlag = false;
      this.index = row.index;
      this.loadings = true;
      this.loadingss = true;
      this.setZooms = true;
      this.clocePhotoG = false;
      const data = new URLSearchParams();
      data.append("orderId", row.orderId);
      waybillDetails(data).then(res => {
        this.loadings = false;
        this.loadingss = false;
        if (res.data.ret_code === "0") {
          let dataList = res.data.data;

          if (dataList.gps.length != 0) {
            if (res.data.outadr_status === "2") {
              dataList.yarrivetime = "无(送货地址不规范)";
              this.NodeLists = dataList;
            } else if (res.data.outadr_status === "3") {
              dataList.yarrivetime = "无(送货地址为空)";
              this.NodeLists = dataList;
            } else {
              let dates = new Date();

              this.dataTime =
                dates.getFullYear() +
                "/" +
                (dates.getMonth() + 1 < 10
                  ? "0" + (dates.getMonth() + 1)
                  : dates.getMonth() + 1) +
                "/" +
                (dates.getDate() < 10
                  ? "0" + dates.getDate()
                  : dates.getDate()) +
                " " +
                (dates.getHours() < 10
                  ? "0" + dates.getHours()
                  : dates.getHours()) +
                ":" +
                (dates.getMinutes() < 10
                  ? "0" + dates.getMinutes()
                  : dates.getMinutes()) +
                ":" +
                (dates.getSeconds() < 10
                  ? "0" + dates.getSeconds()
                  : dates.getSeconds());
              var truckOptions = {
                size: 1
              };

              if (
                dataList.endLon &&
                dataList.endLat &&
                dataList.gps[dataList.gps.length - 1].lon &&
                dataList.gps[dataList.gps.length - 1].lat
              ) {
                positions = [
                  dataList.gps[dataList.gps.length - 1].lon,
                  dataList.gps[dataList.gps.length - 1].lat
                ];
                // 货车路径规划
                var driving = new AMap.TruckDriving(truckOptions);
                var path = [];

                path.push({
                  lnglat: [
                    dataList.gps[dataList.gps.length - 1].lon,
                    dataList.gps[dataList.gps.length - 1].lat
                  ]
                }); //起点
                // path.push({ lnglat: [116.321354, 39.896436] }); //途径
                path.push({
                  lnglat: [dataList.endLon, dataList.endLat]
                }); //终点

                driving.search(path, (status, result) => {
                  // document.getElementsByClassName("shows")[index].style.display =
                  //   "none";
                  if (status === "complete") {
                    var x = this.dataTime;
                    var time = new Date(x.replace("-", "/"));
                    var b = result.routes[0].time / 60; //分钟数
                    time.setMinutes(
                      time.getMinutes() + b,
                      time.getSeconds(),
                      0
                    );
                    var d = new Date(time);
                    var dateY =
                      d.getFullYear() +
                      "-" +
                      (d.getMonth() + 1 < 10
                        ? "0" + (d.getMonth() + 1)
                        : d.getMonth() + 1) +
                      "-" +
                      (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
                      " " +
                      (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
                      ":" +
                      (d.getMinutes() < 10
                        ? "0" + d.getMinutes()
                        : d.getMinutes()) +
                      ":" +
                      (d.getSeconds() < 10
                        ? "0" + d.getSeconds()
                        : d.getSeconds());

                    dataList.yarrivetime = dateY;
                    this.NodeLists = dataList;
                  }
                });
              }
            }
          } else {
            dataList.yarrivetime = "无(无车辆定位信息)";
            this.NodeLists = dataList;
          }
          this.lineArr = [];
          this.stopVCN = [];
          this.stopVCN = dataList.stopVCN.stopVcnPlace;
          if (dataList.gps.length != 0) {
            dataList.gps.forEach((item, index) => {
              this.lineArr.push([item.lon, item.lat]);
            });
            // map.setFitView();
          } else {
            this.$message("此车辆没有相关轨迹!");
          }
          this.NodeLists = dataList;
          this.cloceNode = true;
          map.clearMap();
          // 绘制轨迹
          let polyline = new AMap.Polyline({
            map: map,
            path: this.lineArr,
            showDir: true,
            strokeColor: "#28F", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 //线宽
            // strokeStyle: "solid"  //线样式
          });

          row.gps.lat = dataList.gps[dataList.gps.length - 1].lat;
          row.gps.lon = dataList.gps[dataList.gps.length - 1].lon;

          this.mapMarker([row]);
          this.mapMarker([dataList.gps[0]], 2);
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    rowserch(row) {
      if (this.ind == 5) {
        //this.cloceNodeG = true;

        document.getElementsByClassName("eventNodeG")[0].style.left = 42 + "vw";
        document.getElementsByClassName("eventNodeG")[0].style.top = 80 + "px";
      } else {
        document.getElementsByClassName("eventNodeG")[0].style.left =
          42.5 + "vw";
        document.getElementsByClassName("eventNodeG")[0].style.top = 20 + "px";
      }

      // 点击搜索列表
      this.index = row.index;
      this.loadings = true;
      this.cloceStopCar = false;
      this.clocePhoto = false;
      this.clocePhotoG = false;
      const data = new URLSearchParams();
      data.append("orderId", row.orderId);
      finishWaybillDetails(data).then(res => {
        this.loadings = false;
        if (res.data.ret_code === "0") {
          let dataList = res.data.data;
          this.NodeLists = dataList;
          this.cloceNodeG = true;
          this.lineArr = [];
          this.stopVCN = [];
          this.tableDatastop = [];
          if (dataList.stopVcnMap.stopVcnPlace.length != 0) {
            this.tableDatastop = dataList.stopVcnMap.stopVcnPlace;
            this.stopVCN = dataList.stopVcnMap.stopVcnPlace;
          }
          if (dataList.gps.length != 0) {
            dataList.gps.forEach((item, index) => {
              this.lineArr.push([item.lon, item.lat]);
            });
          } else {
            this.$message("此车辆没有相关轨迹!");
          }
          map.clearMap();
          // 绘制轨迹
          let polyline = new AMap.Polyline({
            map: map,
            path: this.lineArr,
            showDir: true,
            strokeColor: "#28F", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6 //线宽
            // strokeStyle: "solid"  //线样式
          });
          // this.mapMarker([this.tableDatas[row.index]]);
          this.mapMarker(this.stopVCN, 1);
          this.mapMarker([dataList.gps[0]], 2);
          this.mapMarker([dataList.gps[dataList.gps.length - 1]], 3);
          map.setFitView();
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });

      // this.cloceStopCar = true;
      // this.clocePhoto = true;
    },
    rowserchInfos(row) {
      // 点击6列表
      this.loadings = true;
      this.inde = 0;
      this.index = row.index;
      this.indexs = -1;
      const data = new URLSearchParams();
      data.append("vehgrpnum", row.vehgrpnum);
      noSentOrder(data).then(res => {
        this.loadings = false;
        if (res.data.ret_code === "0") {
          console.log(this.ind);
          let dataList = res.data.data;
          this.tableDataMe = dataList;
          this.goodsClose = true;
          this.ViolationClose = true;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    rowserchInfo(row) {
      // 点击1列表
      this.loadings = true;
      this.cloceDelivery = false;
      this.inde = 0;
      this.index = row.index;
      this.indexs = -1;
      const data = new URLSearchParams();
      data.append("vehgrpnum", row.vehgrpnum);
      noSentOrder(data).then(res => {
        this.loadings = false;
        if (res.data.ret_code === "0") {
          let dataList = res.data.data;
          this.tableDataMe = dataList;
          this.cloceStopinfos = true;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    rowserchDelivery(val) {
      this.inde = 0;
      //送货单明细
      if (val === 0) {
        document.getElementById("DeliveryBox").style.left = 53 + "vw";
      } else if (val === 1) {
        document.getElementById("DeliveryBox").style.left = 66 + "vw";
      } else if (val === 2) {
        document.getElementById("DeliveryBox").style.left = 71 + "vw";
      } else if (val === 3) {
        document.getElementById("DeliveryBox").style.left = 63.5 + "vw";
      } else if (val === 8) {
        document.getElementById("DeliveryBox").style.left = 68 + "vw";
      }
      this.cloceDelivery = true;
    },
    cloceDeliverys(row) {
      //送货单明细隐藏
      this.cloceDelivery = false;
      this.inde = 0;
      this.cloceDeliveryCar = false;
    },
    cloceStopinfosF() {
      //未约装运单明细隐藏
      this.cloceDelivery = false;
      this.inde = 0;
      this.cloceStopinfos = false;
    },
    cloceNodes() {
      //时间节点隐藏
      this.cloceDelivery = false;
      this.inde = 0;
      this.cloceNode = false;
      this.clocePhotoG = false;
    },
    cloceNodeGs() {
      // 全时间节点隐藏
      this.cloceNodeG = false;
      this.cloceStopCar = false;
      this.clocePhoto = false;
      this.clocePhotoG = false;
    },
    goodsCloses() {
      this.goodsClose = false;
    },
    ViolationCloses() {
      this.ViolationClose = false;
    },
    // 搜索显示
    search() {
      this.value0 = "";
      this.value1 = "";
      this.value2 = "";
      this.input = "";
      this.optionss = [];
      this.cloceNodeG = false;
      this.pageshows = !this.pageshows;
      this.serchNode = true;
      this.cloceNode = false;
      this.ind = -1;
      this.tabHeadShow = false;
      this.tabBottomShow = false;
      this.clocePhotoG = false;
      this.clocePhoto = false;
      this.clocePhotoG = false;
      this.PageIndex = 4;
      this.pageSizes = 5;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.tableDatas = [];
      this.cloceDelivery = false;
      this.inde = 0;
      this.cloceDeliveryCar = false;
      this.cloceStopinfos = false;
      this.tableDataOperation();
      // this.$message("您点击了搜索！");
      vehicleGroupsQuery().then(res => {
        if (res.data.ret_code === "0") {
          res.data.data.push({ vehgrpnam: "临时车辆", vehgrpnum: "lscl" });
          this.options = res.data.data;
        }
      });

      let dateTime = new Date();
      let dataTimeNew =
        dateTime.getFullYear() +
        "/" +
        (dateTime.getMonth() + 1 < 10
          ? "0" + (dateTime.getMonth() + 1)
          : dateTime.getMonth() + 1) +
        "/" +
        (dateTime.getDate() < 10
          ? "0" + dateTime.getDate()
          : dateTime.getDate());

      this.serchSure(dataTimeNew);
    },
    // 搜索关闭
    serchNodes() {
      this.tabHeadShow = false;
      this.tabBottomShow = false;
      this.PageIndex = 0;
      this.serchNode = false;
      this.cloceNodeG = false;
      this.cloceStopCar = false;
      this.clocePhoto = false;
      this.clocePhotoG = false;
      //this.tabHeadShow = true;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.currentPage = 1;
    },
    // 照片显示
    LookPhoto(style, flag) {
     
      if (flag) {
        this.imgListCenter = true;
        this.imgList = this.NodeListsS[style];
        
      } else {
        this.imgListCenter = false;
         this.imgList = this.NodeLists[style];
      }
      if (this.imgList.length != 0) {
        this.clocePhoto = true;
      } else {
        this.$message("没有相关照片!");
        this.clocePhoto = false;
        this.clocePhotoG = false;
      }
    },
    // 照片隐藏
    clocePhotos() {
      this.clocePhoto = false;
      this.clocePhotoG = false;
    },
    // 照片显示
    LookPhotoG(style) {
      this.imgList = this.NodeLists[style];

      if (this.imgList.length != 0) {
        this.clocePhotoG = true;
      } else {
        this.$message("没有相关照片!");
        this.clocePhotoG = false;
      }
    },
    // 照片隐藏
    clocePhotosG() {
      this.clocePhotoG = false;
    },

    // 停车隐藏
    cloceStopCars() {
      this.cloceStopCar = false;
    },
    // 停车显示
    LookStopNode() {
      if (this.tableDatastop.length != 0) {
        this.cloceStopCar = true;
      } else {
        this.$message("此车辆没有停车记录!");
      }
    },
    selecIndexs() {
      this.$message("selecIndex");
    },
    // 下拉框选择
    playbacks() {
      const data = new URLSearchParams();
      data.append("vehgrpnum", this.value1);
      contractVehicle(data).then(res => {
        this.optionss = res.data.data;
      });
    },
    playbackss() {
      //console.log(this.value2);
    },
    // 清空
    serchClean() {
      this.value0 = "";
      this.value1 = "";
      this.value2 = "";
      this.input = "";
    },
    // 搜索确定
    serchSure(val) {
      this.pageshows = !this.pageshows;
      this.pageSizes = 5;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.currentPage = 1;
      if (val) {
        this.value0 = val;
      }
      this.loading = true;
      let dateTime = "";
      if (this.value0) {
        let dates = new Date(this.value0);
        dateTime =
          dates.getFullYear() +
          "-" +
          (dates.getMonth() + 1 < 10
            ? "0" + (dates.getMonth() + 1)
            : dates.getMonth() + 1) +
          "-" +
          (dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate());
      }

      const data = new URLSearchParams();
      data.append("order", this.input);
      data.append("arrivetime", dateTime);
      data.append("vehlicnum", this.value2);
      data.append("vehgrpnam", this.value1);

      historyTruckNum(data).then(res => {
        this.loading = false;
        if (res.ret_code === "0") {
          let dataList = res.data;
          this.tableDatas = dataList;
          if (!dataList) {
            this.$message("暂无数据!");
            this.tableData = [];
          } else {
            this.tableDataOperation(4);
          }
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    // 每页多少条
    handleSizeChange(val) {
      this.index = -1;
      if (this.PageIndex == "4") {
        this.pageSizes = val;
        this.tableDataOperation();
      } else {
        this.pageSize = val;
        this.tableDataOperation();
      }
      if (this.ind == 0) {
        this.pageSize = val;
        this.tableDataOperation(0);
      }
      if (this.ind == 3) {
        this.pageSize = val;
        this.tableDataOperation(3);
      }
    },
    // 当前页第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = -1;

      if (this.PageIndex == "4") {
        this.tableDataOperation();
      } else {
        this.tableDataOperation();
      }
      if (this.ind == 0) {
        this.tableDataOperation(0);
      }
    },
    // Tab切换
    changeTime(index) {
      this.ind = index;
    },
    // 分页关闭
    cloce() {
      this.clocePhotoG = false;
      this.clocePhoto = false;
      this.clocePhotoG = false;
      this.cloceNode = false;
      this.cloceNodeG = false;
      this.cloceDelivery = false;
      this.inde = 0;
      this.cloceStopinfos = false;
      this.ind = -1;
    },
    // 列表数量查询
    numList(val) {
      getVehStatusNum().then(res => {
        if (res.data.ret_code === "0") {
          this.StatusNum = res.data.data;
          this.headList[0].num = this.StatusNum.overtimeNum;
          this.headList[1].num = this.StatusNum.missAppointNum;
          this.headList[2].num = this.StatusNum.unSendNum;
          this.headList[3].num = this.StatusNum.allSendWgt;
          this.headList[4].num = this.StatusNum.allSendNum;
          this.headList[5].num = this.StatusNum.totalWgt;
          this.headList[6].num = this.StatusNum.totalNum;
          if (val == 1) {
            time3 = setTimeout(() => {
              this.numList(1);
            }, 300000);
          }
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },

    afterLeave0(el) {
      this.tabHeadShows = true;
    },
    afterLeave1(el) {
      this.tabHeadShow = true;
    },
    afterLeave2(el) {
      this.tabBottomShows = true;
    },
    afterLeave3(el) {
      this.tabBottomShow = true;
    },
    SwitchStorage() {
      this.SwitchActive = 1;
      let token = sessionStorage.getItem("token");
      window.location.href = "http://storage.logwsd.com?token=" + token;
    },
    //退出登录
    logout() {
      //console.log(123);
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },

    quanping() {
      var el = document.getElementById("quanping");
      var rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (rfs) {
        //typeof rfs != "undefined" && rfs
        rfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  },
  mounted() {
    map = new AMap.Map("container", { resizeEnable: true });
    var toolBar = new AMap.ToolBar({
      visible: true
    });
    map.addControl(toolBar);
    clearInterval(time2);
    clearInterval(time1);
    this.tableDataOperation();
    this.numList(1);
    tit().then(res => {
      this.title = res.data;
    });
  }

  // directives: {
  //   drag(el, bindings) {
  //     el.onmousedown =
  //       function(e) {
  //         var disx = e.pageX - el.offsetLeft;
  //         var disy = (e.pageY = el.offsetTop);
  //         document.onmousemove  =
  //           function(el) {
  //             el.style.left - e.pageX - disx + "px";
  //             el.style.top - e.pageY - disy + "px";
  //           };

  //         document.onmouseup =
  //           function() {
  //             document.onmousemove - document.onmouseup - null;
  //           };
  //       };
  //   }
  // }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";
.iconfont {
  cursor: pointer;
}
.mask {
  background: rgba(0, 0, 0, 1);
  opacity: 0.7;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.maskBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 570px;
  min-height: 320px;
  max-height: 320px;
  background: #fff;
  margin: auto;
  // margin-top:300px;
  padding: 30px;
  z-index: 999999;
  text-align: center;
  .maskhead {
    display: inline-block;
    width: 100%;
    text-align: center;
    .iconfont {
      float: right;
    }
    .maskName {
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      vertical-align: top;
      padding-left: 10px;
    }
    .imgjinggao {
      width: 32px;
      height: 26px;
      display: inline-block;
      .img_sty {
        width: 100%;
        height: 100%;
      }
    }
  }
  ol {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    color: #565f6d;
    line-height: 40px;
    margin: 20px 0 0 30px;
    padding: 0;
    text-align: left;
    li {
      span {
        color: rgba(244, 45, 59, 1);
        padding: 0 5px;
      }
    }
    .qiandan {
      span {
        color: #ff7f00;
      }
    }
  }
  button {
    width: 200px;
    height: 40px;
    background: rgba(227, 29, 43, 1);
    border-radius: 10px;
    line-height: 0px;
    margin-top: 30px;
  }
}
.maskBoxW {
  //overflow-y: auto;
  .scrolls {
    margin-top: 10px;
    max-height: 230px;
    overflow-y: auto;
    ol {
      margin-top: 0px;
    }
  }
}
.actives {
  background: #fee9ea;
  border-radius: 30px;

  .right-top,
  span {
    font-weight: bold;
    color: rgba(0, 0, 32, 1);
  }
}
.transition_top {
  margin: 30px 0 0 22px;
  height: 58px;
  overflow: hidden;
  //line-height:62px;
}
.open_cloce {
  float: right;
  margin-top: 9px;
  cursor: pointer;
  .imgCloce {
    width: 24px;
    height: 40px;
  }
  .img_sty {
    width: 100%;
    height: 100%;
  }
}

.changeStatus {
  float: left;
  width: 960px;
  //height: 62px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(244, 244, 244, 1);
  border-radius: 30px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.2);
  // margin-right:60px;
  // background: lime;
  ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    li {
      cursor: pointer;
      width: 16.6%;
      height: 100%;
      list-style: none;
      float: left;
      color: #666666;
      .left_img {
        // display: inline-block;
        width: 46px;
        height: 46px;
        margin: 3px 0 0 5px;
        float: left;
        .img_sty {
          width: 100%;
          height: 100%;
        }
      }
      // .left_mar {
      //   margin: 8px 0 0 10px;
      // }
      .right-name {
        float: left;
        margin-left: 10px;
        width: 70px;
        margin-top: 5px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        .right-top {
          float: left;
          display: block;
        }
        .right-big {
          width: 110px;
        }
      }
      .right-names {
        line-height: 46px;
      }
    }
  }
}
.changeStatuss {
  width: 160px;
  ul {
    li {
      width: 100%;
    }
  }
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 80px;
    line-height: 80px;
    background: $color-primary;
    background: #fff;
    color: #666666;
    font-size: 24px;
    box-shadow: 0px 1px 1px 0px rgba(59, 64, 94, 0.1);
    .active {
      color: #e31d2b;
    }
    .logos {
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      margin-top: 20px;
      .imgBox {
        width: 209px;
        height: 44px;
        .imgItem {
          width: 100%;
          height: 100%;
        }
      }
    }
    .user-name {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      vertical-align: 15px;
      //padding-right: 30px;
    }
    .userinfo {
      float: right;
      p {
        font-size: 14px;
        margin-top: -24px;
        line-height: 20px;
        text-align: center；;
      }
    }
    .namePoin {
      text-align: right;
    }
    .userimg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .iconfontUP {
      text-align: left;
      padding-left: 5px;
      padding-top: 3px;
      cursor: pointer;
    }
    .logo {
      height: 80px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 81px;
    bottom: 0px;
    overflow-y: scroll;
  }
}
.imgLogoBox {
  position: fixed;
  bottom: 30px;
  //background: #fff;
  right: 80px;
  width: 250px;
  .imgLogo {
    width: 100%;
    height: 100%;
  }
}
.loadIng {
  width: 100px;
  position: fixed;
  top: 120px;
  left: 1000px;
  z-index: 9999;
}

.line {
  float: right;
  height: 80px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  .line-con {
    float: right;
    line-height: 80px;
    .line-statu {
      width: 12px;
      height: 12px;
      margin-top: 35px;
      margin-left: 10px;
      border-radius: 50%;
    }
    .line_right {
      height: 30px;
      line-height: 30px;
    }
    .line_top {
      margin-top: 10px;
    }
    .line-org {
      background: rgba(255, 97, 19, 1);
    }
    .line-red {
      background: #fe596e;
    }
    .line-7f {
      background: #7f78f9;
    }
    .line-fb {
      background: #fb6483;
    }
    .line-da {
      background: #da8efa;
    }
    .line-fb6 {
      background: #fb6a65;
    }
    .line-76 {
      background: #76d6fc;
    }
    .line-yel {
      background: #fec516;
    }
    .line-gre {
      background: rgba(103, 217, 96, 1);
    }
    .line-blu {
      background: rgba(85, 167, 250, 1);
    }
    .line-num {
      margin-left: 5px;
    }
  }
}
.carPio {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(53, 64, 82, 1);
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
}
.icon-plus-select-down,
.icon-plus-select-up {
  font-size: 30px;
  color: rgba(215, 215, 215, 1);
}
.content-container {
  // position: absolute;
  // right: 0px;
  // top: 0px;
  // bottom: 0px;
  // left: 0px;
  // background: lime;
  .cloce {
    width: 42px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(244, 244, 244, 1);
    border-radius: 1px;
    position: absolute;
    right: -42px;
    top: 0;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color: #534f71;
  }
  .block {
    position: absolute;
    // bottom: -68px;
    z-index: 999;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    text-align: center;
    padding: 15px 0;
    border: 1px solid #dfe6ec;
    //border-top:0;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .box {
    margin-top: 110px;
    margin-left: 22px;
    // width: 600px;
    // height: 400px;
    //background: lime;
    border-radius: 10px;
    position: relative;
    // overflow: hidden;
  }
  .search {
    position: absolute;
    top: 30px;
    right: 20px;
    width: 380px;
    height: 62px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(244, 244, 244, 1);
    border-radius: 1px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    //padding-left: 40px;
    line-height: 62px;
    z-index: 99;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);

    cursor: pointer;
    .icon-sousuo {
      padding: 0 20px;
      margin-right: 20px;
      font-weight: 900;
      float: left;
      font-size: 28px;
      background: #f41222;
      background: linear-gradient(
        0deg,
        rgba(244, 18, 34, 1),
        rgba(255, 94, 96, 1)
      );
    }
  }
  .tab-head {
    position: absolute;
  }
  .tab-heads {
    position: absolute;
    bottom: 30px;
    .changeStatus {
      float: left;
      width: 640px;
      //height: 62px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(244, 244, 244, 1);
      border-radius: 30px;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
      // margin-right:60px;
      // background: lime;
      ul {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
          cursor: pointer;
          width: 25%;
          height: 100%;
          list-style: none;
          float: left;
          color: #666666;
          .left_img {
            // display: inline-block;
            width: 46px;
            height: 46px;
            margin: 3px 0 0 20px;
            float: left;
            .img_sty {
              width: 100%;
              height: 100%;
            }
          }
          // .left_mar {
          //   margin: 8px 0 0 10px;
          // }
          .right-name {
            float: left;
            margin-left: 10px;
            width: 70px;
            // margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            .right-top {
              float: left;
              display: block;
            }
            .right-big {
              width: 110px;
            }
          }
        }
      }
    }
    .changeStatuss {
      width: 160px;
      ul {
        li {
          width: 100%;
        }
      }
    }
  }

  .tableList {
    // margin-top: 220px;
    // margin-left: 22px;
    // width: 600px;
    // height: 400px;
    //background: lime;
    border-radius: 10px;
    position: relative;
  }
  .el-table {
    z-index: 999;
  }
  .BtnLooks {
    background: rgba(255, 236, 236, 1);
    border: 1px solid rgba(227, 29, 43, 1);
    border-radius: 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(244, 45, 59, 1);
    height: 30px;
    width: 70px;
    padding: 0;
  }
  .BtnLook {
    // background: rgba(255, 236, 236, 1);
    //  border: 1px solid #67d960;
    border-radius: 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(182, 182, 182, 1);
    height: 30px;
    width: 70px;
    padding: 0;
    background: rgba(243, 243, 243, 1);
    border: 1px solid rgba(208, 208, 208, 1);
  }
  .eventNode {
    position: absolute;
    //width: 300px;
    height: auto;
    left: 720px;
    top: 220px;
    background: #fff;
    padding: 10px;
    .nodeHead {
      height: 30px;
      border-left: 6px solid rgba(244, 45, 59, 1);
      font-size: 20px;
      padding-left: 10px;
      font-family: PingFangSC-Medium;
      font-weight: 900;
      color: rgba(51, 51, 51, 1);
      .cloceNode {
        float: right;
        font-size: 22px;
        color: #c2c2c2;
      }
    }

    .nodeList {
      list-style: none;
      margin: 0;
      padding: 0;
      height: 520px;
      overflow-y: auto;
      // padding-right: 5px;
      li {
        border-bottom: 1px solid #e6eaee;
        //height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        div {
          width: 38%;
          display: inline-block;
        }
        .estimate {
          color: #f42d3b;
        }

        span {
          font-weight: 500;
          width: 60%;
          line-height: normal;
          display: inline-block;
          vertical-align: middle;
          color: #333;
        }
      }
      .nodeDeliveryTab {
        border: 0;
        height: auto;
        div {
          //text-align: center;
          width: 60%;
        }
        span {
          text-align: center;
          width: 35%;
        }
      }
      .nodeDeliveryTabs {
        height: auto;
        div {
          // text-align: center;
          line-height: normal;
          width: 60%;
        }
        span {
          text-align: center;
          vertical-align: top;
          width: 35%;
        }
      }
    }
    .nodeList::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .nodeList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px #ccc;
      background: #ccc;
    }
    .nodeList::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px #fff;
      border-radius: 10px;
      background: #fff;
    }
    .serchHead {
      padding: 20px;
      padding-bottom: 30px;
      margin-left: 150px;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      border: 0;
      .serchBtn {
        position: absolute;
        right: 250px;
        width: 80px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        padding: 0;
        cursor: pointer;
        z-index: 9999;
        background: rgba(244, 45, 59, 1);
        border-radius: 19px;
        margin: 10px 0;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }

      .serchList {
        list-style: none;
        margin: 0;
        margin-top: 5px;
        padding: 0;
        .el-input__inner {
          height: 30px;
        }
        li {
          height: 50px;
          line-height: 50px;
          color: rgba(102, 102, 102, 1);

          b {
            display: inline-block;
            width: 40px;
            font-size: 24px;
            color: #c2c2c2;
          }
          span {
            display: inline-block;
            width: 60px;
          }
          div {
            display: inline-block;
            width: 260px;
          }
        }
        .carPostion {
          position: relative;
          .CarInput {
            position: absolute;
            top: 0;
            width: 210px;
            z-index: 1001;
            padding-left: 1px;
          }
          .CarSelect {
            position: absolute;
            top: 0;
          }
        }
      }
    }
  }
  .eventNodes {
    width: 300px;
    top: 110px;
    left: 880px;
  }
  .deliveryInfo {
    margin-left: 50px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    color: rgba(244, 45, 59, 1);
  }
  .eventNodeG {
    //top: 30px;
    left: 820px;
    z-index: 999;
    width: 300px;
    .stopNodeBox {
      padding: 10px 0;
      .stopNode {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 38px;
        line-height: 38px;
        background: rgba(244, 45, 59, 1);
        border-radius: 19px;
      }
    }
    .eventNodeGList {
      height: 610px;
      overflow-y: auto;
      li {
        div {
          width: 38%;
          display: inline-block;
        }
        span {
          width: 60%;
          display: inline-block;
        }
      }
    }
    .eventNodeGList::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .eventNodeGList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px #fff;
      background: #fff;
    }
    .eventNodeGList::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px #fff;
      border-radius: 10px;
      background: #fff;
    }
  }
  .serchNode {
    width: 790px;
    padding: 0;
    top: 30px;
    left: 20px;
    z-index: 999;
  }
  .cloceStopCar {
    padding: 0;
    width: 700px;
    top: 480px;
    left: 1150px;
    z-index: 1005;
    .nodeHead {
      margin: 10px;
    }
  }
  .goodsClose {
    width: 900px;
    left: 940px;
    top: 110px;
  }
  .ViolationClose {
    width: 610px;
    left: 940px;
    top: 400px;
  }
  .clocePhoto {
    top: 30px;
    left: 1150px;
    width: 680px;
    z-index: 1005;
  }
  .clocePhoto1 {
    left: 1200px;
  }
  .cloceStopinfo {
    top: 110px;
    left: 680px;
  }
  .nodeDelivery {
    left: 40px;
    top: 0px !important;
    width: 400px;
    .nodeList {
      li {
        div {
          width: 30%;
          display: inline-block;
        }

        span {
          font-weight: 500;
          width: 68%;
          display: inline-block;
        }
        .tel {
          color: #f42d3b;
        }
      }
    }
  }

  .DeliveryBox {
    width: 440px;
    height: 568px;
    // background: lime;
    position: absolute;
    left: 1300px;
    top: 110px;
    width: 440px;
    .DeliveryLeft {
      width: 40px;
      height: 100%;
      overflow-y: auto;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        float: left;
        width: 100%;
        background: #e6e6e6;
        li {
          width: 100%;
          height: 80px;
          text-align: center;
          line-height: 80px;
          cursor: pointer;
        }
        .activeLi {
          background: #fff;
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: bold;
          color: rgba(244, 45, 59, 1);
        }
      }
    }
    .DeliveryLeft::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .DeliveryLeft::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px #ccc;
      background: #ccc;
    }
    .DeliveryLeft::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px #fff;
      border-radius: 10px;
      background: #fff;
    }
  }
  .DeliveryBoxCar {
    top: 110px;
    left: auto;
    right: 100px;
  }
}
.SwitchButton {
  position: fixed;
  right: 360px;
  bottom: 35px;
  width: 240px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  z-index: 999;
  cursor: pointer;
  .Switch_item {
    width: 49%;
    display: inline-block;
    height: 100%;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    border-radius: 10px;
    color: rgba(134, 134, 134, 1);
    padding: 5px 0;
    box-sizing: border-box;
  }
  .SwitchActive {
    background: linear-gradient(
      180deg,
      rgba(246, 141, 142, 1),
      rgba(232, 81, 92, 1)
    );
    color: rgba(255, 255, 255, 1);
  }
}
</style>
<style lang="scss">
.tableHeader {
  cursor: pointer;
  tr th {
    .cell {
      padding: 0;
    }
  }
  tr td {
    .cell {
      padding: 0 3px;
    }
  }
  tr td:last-child {
    .cell {
      padding: 0 20px 0 3px;
    }
  }
  .tableList0 {
    width: 940px;
    cursor: pointer;
    // tr td:nth-child(5),
    // tr td:nth-child(6),
    // tr td:nth-child(7),
    // tr td:nth-child(8) {
    //   .cell {
    //     padding: 0 3px;
    //   }
    // }
  }
  .tableList1 {
    width: 1190px;
    cursor: pointer;
    // tr td:nth-child(6),
    // tr td:nth-child(7),
    // tr td:nth-child(9) {
    //   .cell {
    //     padding: 0 3px;
    //   }
    // }
  }
  .tableList2 {
    width: 1290px;
    cursor: pointer;
    // tr td:nth-child(5),
    // tr td:nth-child(6),
    // tr td:nth-child(7),
    // tr td:nth-child(8),
    // tr td:nth-child(9) {
    //   .cell {
    //     padding: 0 3px;
    //   }
    // }
  }
  .tableList3 {
    width: 800px;
    cursor: pointer;
  }
  .tableList4 {
    width: 100%;
    top: 230px;
    cursor: pointer;
  }
  .tableList5 {
    width: 100%;
    cursor: pointer;
  }
  .tableList6::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .tableList6::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px #ccc;
    background: #ccc;
  }
  .tableList6::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #fff;
    border-radius: 10px;
    background: #fff;
  }
  .tableList6 {
    width: 680px;
    height: 380px;
    padding-left: 10px;
    overflow-y: auto;
    margin-top: 10px;
    div {
      width: 165px;
      // height:130px;
      // background:#ccc;
      padding: 0px 0px 0 0;
      display: inline-block;
      text-align: center;
      .imgLists {
        display: inline-block;
        width: 150px;
        .img_sty {
          width: 100%;
        }
      }

      p {
        width: 100%;
        display: inline-block;
        text-align: center;
        margin: 0px 0 10px 0;
      }
    }
  }
  .tableList8 {
    width: 590px;
    cursor: pointer;
    margin-top: 10px;
  }
  .tableList9 {
    width: 730px;
    cursor: pointer;
  }
  .el-table th {
    background: #f42d3b;
    background: linear-gradient(
      0deg,
      rgba(255, 94, 96, 1),
      rgba(244, 18, 34, 1)
    );
    height: 20px;
    line-height: 20px;
    color: #fff;
    // padding: 0;
    // margin:0;
    // height: 60px;
    // line-height: 60px;
    // font-weight: normal;
  }
  .tableList7 {
    width: 640px;
    padding: 5px 5px 0 5px;
    background: #fff;
    .tableList7_box {
      height: 50px;
      width: 100%;
      line-height: 50px;
      .cloceNode {
        float: right;
        color: #c2c2c2;
        padding-right: 10px;
      }
      .tableList7_top {
        width: 100%;
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            float: left;
            font-size: 16px;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            width: 22%;
            margin-left: 10px;
          }
        }
      }
      .tableList8_top {
        ul {
          li {
            width: 80%;
            div {
              padding-right: 10px;
              display: inline-block;
            }
            input {
              display: inline-block;
              height: 36px;
              width: 240px;
            }
            .el-input__suffix {
              right: 80px;
            }
          }
        }
      }
    }
  }
  .tableList-7 {
    width: 900px;
  }
  .tableList__6 {
    width: 1260px;
  }
  .el-table tr {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }

  .tableListCssStop .el-table__body-wrapper {
    //max-height:700px;
    height: 170px;

    overflow-y: auto;
  }
  .tableListCssSerch .el-table__body-wrapper {
    //max-height:700px;
    height: 282px;

    overflow-y: auto;
  }
  .tableListCss .el-table__body-wrapper {
    //max-height:700px;
    height: 393px;

    overflow-y: auto;
  }
  .tableListCssInfo {
    // overflow-y: auto;
  }
  // .tableListCss .el-table__body-wrapper::-webkit-scrollbar {
  //     /*滚动条整体样式*/
  //     width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
  //     height: 1px;
  //   }
  //   .tableListCss .el-table__body-wrapper::-webkit-scrollbar-thumb {
  //     /*滚动条里面小方块*/
  //     border-radius: 10px;
  //     box-shadow: inset 0 0 5px #fff;
  //     background: #fff;
  //   }
  //   .tableListCss .el-table__body-wrapper::-webkit-scrollbar-track {
  //     /*滚动条里面轨道*/
  //     box-shadow: inset 0 0 5px #fff;
  //     border-radius: 10px;
  //     background: #fff;
  //   }
}
// .paginationCss{
//   height:30px;
//   background:#fff;

//   button{
//     min-width: 30px;
//     width:30px;
//     height:30px;

//   }
//   li{
//     min-width: 30px;
//     width:30px;
//     height:30px;
//     line-height:30px!important;
//   }
//   select {
//      height:30px!important;
//      width:100px;
//     line-height:30px;
//   }
//   input{
//      height:30px;
//     line-height:30px;
//   }

// }
.el-input__icon {
  height: auto !important;
  line-height: 0px !important;
}

.el-pagination {
  .el-select {
    height: 23px !important;
    // width:0px;
    //padding-right: 10px;

    .el-input {
      height: 100% !important;
      //margin:0 5px;
      //  width:100%;
      padding: 0 5px;
      // line-height: 30px !important;
      width: 90px;
      .el-input__inner {
        height: 100% !important;
        // width:100%;
      }
      .el-input__suffix {
        right: 3px;
      }
    }
  }
}
.el-table .success-row {
  background: #ffecec;
}
.el-table .red-row {
  color: #f42d3b;
}
.el-table .org-row {
  color: #ff7f00;
}

.el-pagination button,
.el-pagination span {
  // line-height: 30px !important;
  margin-left: -10px;
}
.content-container .el-table {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fc9098;
  color: #fff;
}
//老版本
// .box {
//   height: 300px;
//   width: 800px;
//   // background-color:black;
//   overflow: hidden;
// }
.draw-enter-active,
.draw-leave-active {
  transition: all 0.2s ease;
}
.draw-enter,
.draw-leave-to {
  width: 0px !important;
}
.icon-sousuo {
  color: #fff;
}
.draws-enter-active,
.draws-leave-active {
  transition: all 0.2s ease;
}
.draws-enter,
.draws-leave-to {
  width: 0px !important;
}
.carImg {
  .img {
    height: 100%;
    width: 100%;
  }
}
.carImgs {
  .img {
    height: 100%;
    width: 100%;
  }
}

.dialogBoxs {
  .el-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;
    height: 90%;
  }
  .el-dialog__title {
    font-size: 30px !important;
    color: rgba(51, 51, 51, 1) !important;
  }
  .el-dialog__header {
    padding: 20px 20px 10px;
  }
  .el-dialog__body {
    padding-top: 10px !important;
    text-align: center !important;
    height: 90% !important;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 40px;
    display: inline-block;
    color: #000000;
  }
  .imgVisible {
    z-index: 10000;
    text-align: center;
  }
  .dialogBox {
    width: 100%;
    height: 99%;
    overflow-x: auto;
  }
}
.imgListCenter {
  top: 6vw !important;
  left: 0 !important;
  right: 0 !important;
  margin: auto !important;
  background: #fff !important;
  box-shadow: 0px 0.156vw 0.156vw 0px rgba(0, 0, 0, 0.2);
}
// 新版本
</style>
