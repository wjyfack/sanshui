<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-select v-model="town" placeholder="请选择" clearable style="widht: 100px;margin-bottom: 16px;" @change="townChange">
        <el-option
          v-for="item in townType"
          :key="item.label"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-row>
    <el-row :gutter="20">
      <div class="newShowTotal">
        <div class="itemTotal">
          <div class="left">
            <div class="mTitle">设备总量</div>
            <div class="mDesc">{{ townName }}设备总量</div>
          </div>
          <div class="right">{{ device.total }}</div>
        </div>
        <div class="itemTotal border-left">
          <div class="left">
            <div class="mTitle">隐患总量</div>
            <div class="mDesc">{{ townName }}隐患总量</div>
          </div>
          <div class="right">{{ command.total }}</div>
        </div>
        <div class="itemTotal border-left">
          <div class="left">
            <div class="mTitle">单位总量</div>
            <div class="mDesc">{{ townName }}单位总量</div>
          </div>
          <div class="right">{{ unitTotal }}</div>
        </div>
        <div class="itemTotal border-left">
          <div class="left">
            <div class="mTitle">超期未检数</div>
            <div class="mDesc">{{ townName }}超期未检数</div>
          </div>
          <div class="right">{{ overCheck.overToday }}</div>
        </div>
      </div>
      <div class="newList">
        <div class="deviceTotal">
          <span class="deviceTitle">设备数量</span>
          <div ref="newZonglei" class="newZonglei"/>
        </div>
        <div class="anQuanTotal">
          <span class="danQuanTitle">安全率</span>
          <div class="anQuanTu">
            <el-progress :percentage="command.taskThanCommandpercent" :width="250" :stroke-width="10" type="circle"/>
          </div>
          <div class="tips">
            <div class="ride"/>
            <span class="">计算公式：检查任务合格数/全部任务数</span>
          </div>
        </div>
      </div>
      <div class="newTask">
        <div class="taskTile">任务统计</div>
        <div class="taskList">
          <div class="taskItem">
            <div class="itemTile">任务总量</div>
            <div class="itemNum">{{ command.taskTotal }}</div>
          </div>
          <div class="taskItem">
            <div class="itemTile">日常监督检查</div>
            <div class="itemNum">{{ task.riChange }}</div>
          </div>
          <div class="taskItem">
            <div class="itemTile">专项检查</div>
            <div class="itemNum">{{ task.zhuangXiang }}</div>
          </div>
          <div class="taskItem">
            <div class="itemTile">检查任务</div>
            <div class="itemNum">{{ command.commandTotal }}</div>
          </div>
        </div>
        <div ref="taskTotal" class="taskTotal"/>
      </div>
    </el-row>
    <!-- <el-row v-if="false" :gutter="20">
      <el-col :span="12">
        <el-row :gutter="20">
          <el-form ref="form" label-width="80px">
            <el-form-item label="街道">
              <el-select v-model="town" placeholder="请选择" clearable @change="townChange">
                <el-option
                  v-for="item in townType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-item zongliang">
              <div class="title"><span>设备总量</span> <i class="el-icon-question"/></div>
              <div class="mun">{{ device.total }}</div>
              <div class="tongbi">
                <div class="tongbi-item">
                  <span>上周增加数</span>
                  <i class="el-icon-caret-top red" />
                  <span class="bi">{{ device.lastWeekAdd }}</span>
                </div>
              </div>
              <div class="add"><span>日均增加数</span><span class="pd-left">{{ device.everyDayAdd }}</span></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item">
              <div class="title"><span>任务量</span> <i class="el-icon-question"/></div>
              <div class="mun">{{ command.taskTotal }}</div>
              <div class=""><img :src="u290" alt="" srcset="" style="width:100%"></div>
              <div class="tongbi add">
                <span><span>上周增加数</span><span class="pd-left">{{ command.lastWeekAddTask }}</span></span>
                <span><span>日均增加数</span><span class="pd-left">{{ command.everyDayAddTask }}</span></span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-item zongliang">
              <div class="title"><span>设备种类</span> <span/></div>
              <div ref="zonglei" class="zonglei"/>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item">
              <div class="title"><span>指令书量</span> <i class="el-icon-question"/></div>
              <div class="mun">{{ command.commandTotal }}</div>
              <div class=""><img :src="u290" alt="" srcset="" style="width:100%"></div>
              <div class="tongbi add">
                <span><span>上周增加数</span><span class="pd-left">{{ command.lastWeekAddCommand }}</span></span>
                <span><span>日均增加数</span><span class="pd-left">{{ command.everyDayAddCommand }}</span></span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-item zongliang">
              <div class="title"><span>超期未检数</span> <i class="el-icon-question"/></div>
              <div class="mun">{{ overCheck.overToday }}</div>
              <div class=""><img :src="u319" alt="" srcset="" style="width:100%"></div>
              <div class="add"><span>占有率 </span><span class="pd-left">{{ overCheck.overPercent }}</span></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item zongliang anquans">
              <div class="title"><span>安全率</span> <i class="el-icon-question"/></div>
              <div ref="anquan" class="anquan"/>
              <div class="tongbi add">
                <div class="tongbi-item">
                  <span>上周安全率</span>
                  <i class="el-icon-caret-bottom green" />
                  <span class="bi">{{ command.taskThanCommandpercentWeek }}</span>
                </div>
                <div class="tongbi-item">
                  <span>日环比</span>
                  <i class="el-icon-caret-top red" />
                  <span class="bi">11%</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <div class="renwuAll">
            <div class="title">
              <div class="tabs">
                <div :class="{'act': checkIndex == 1}" class="tabs-item" @click="checkIndexChange(1)">任务量</div>
                 <div :class="{'act': checkIndex == 2}" class="tabs-item" @click="checkIndexChange(2)">访问量</div>
              </div>
              <div class="time">
                <span :class="{'act': checkDay == 1}" class="time-item" @click="checkDayChange(1)">今日</span>
                <span :class="{'act': checkDay == 2}" class="time-item" @click="checkDayChange(2)">本周</span>
                <span :class="{'act': checkDay == 3}" class="time-item" @click="checkDayChange(3)">本月</span>
                <span :class="{'act': checkDay == 4}" class="time-item" @click="checkDayChange(4)">全年</span>
              </div>
              <el-date-picker
                v-model="dateTime"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </div>
            <div ref="renwuliang" class="renwul"/>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="anPai">
            <div class="anPai-item">
              <div class="title">个人任务：</div>
              <div class="cont">
                <div class="item-bar"><span class="bar-title">未完成</span> <span class="status">56</span> </div>
                <div class="item-bar"><span class="bar-title">未完成</span> <span class="status">56</span> </div>
                <div class="item-bar"><span class="bar-title">未完成</span> <span class="status">56</span> </div>
              </div>
            </div>
            <div class="anPai-item">
              <div class="title">日程安排：</div>
              <div class="cont">
                <table class="table">
                  <tr>
                    <th>昨</th>
                    <th>今</th>
                    <th>后</th>
                  </tr>
                  <tr>
                    <td>123</td>
                    <td>231</td>
                    <td>311</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import echarts from 'echarts'
import { townSearchType } from '@/utils/config'
import u290 from '@/assets/u290.png'
import u319 from '@/assets/u319.png'
import { fetchDeviceTotal,
  fetchTaskCommandTotal,
  fetchDeviceTypeTotal,
  fetchTotalByMonth,
  fectTotalCompany } from '@/api/charts'
import { opLoading } from '@/mixins/loading'
export default {
  name: 'Dashboard',
  mixins: [opLoading],
  data() {
    return {
      townType: [{ value: '', label: '全部' }, ...townSearchType],
      town: '',
      townName: '全区',
      u290,
      u319,
      dateTime: '',
      checkIndex: 1,
      checkDay: 1,
      device: {
        total: 0, // 设备总量
        lastWeekAdd: 0, // 上周增加数
        everyDayAdd: 0 // 日均增加数
      },
      overCheck: { // 超期未检
        overToday: 0, // 超期未检数
        overPercent: 0 // 占有率
      },
      command: {
        taskTotal: 0,	// 任务总量
        lastWeekAddTask: 0,	// 上周增加数
        everyDayAddTask: 0,	// 日均增加数
        commandTotal: 0,	// 指令书总量
        lastWeekAddCommand: 0,	// 上周增加数
        everyDayAddCommand: 0,	// 日均增加数
        taskThanCommandpercent: 0,	// 安全率
        taskThanCommandpercentWeek: 0	// 上周安全率
      },
      task: {
        riChange: 0,
        zhuangXiang: 0
      },
      unitTotal: 0,
      deviceSrotName: [],
      deviceSrotList: [],
      taskCheckTotal: []
    }
  },
  computed: {
    // ...mapGetters([
    //   'name',
    //   'roles'
    // ])
  },
  mounted() {
    if (this.$store.getters.deptNames.length === 0) {
      this.$store.dispatch('actionsDeptNames')
    }
    this.$store.dispatch('actionsCheckType')
    this.fectData()
  },
  methods: {
    townChange(event) {
      // this.town = event
      this.fectData()
    },
    fectData() {
      const townValue = this.town
      let townName = ''
      if (townValue) {
        const [selectTown] = this.townType.filter(item => {
          return item.value === townValue
        })
        townName = selectTown.name
        this.townName = selectTown.label
      } else {
        this.townName = '全区'
      }
      // console.log(town)
      this.opShowLoading()
      const promises = [
        fetchDeviceTotal(townValue),
        fetchTaskCommandTotal(townName),
        fetchDeviceTypeTotal(townValue),
        fetchTotalByMonth(townName),
        fectTotalCompany(townValue)
      ]
      Promise.all(promises)
        .then(resAll => {
          const resData = resAll[0]
          const resData2 = resAll[1]
          const resData3 = resAll[2]
          const resData4 = resAll[3]
          const resData5 = resAll[4]
          if (resData.resultCode === '0000000') {
            const data = resData.returnData
            this.device = {
              total: data.total, // 设备总量
              lastWeekAdd: data.lastWeekAdd, // 上周增加数
              everyDayAdd: data.everyDayAdd // 日均增加数
            }
            this.overCheck = { // 超期未检
              overToday: data.overToday, // 超期未检数
              overPercent: data.overPercent // 占有率
            }
          } else {
            this.$message.error(resData.resultDesc)
          }
          if (resData2.resultCode === '0000000') {
            const data = resData2.returnData
            this.command = {
              total: data.total,
              taskTotal: data.taskTotal,	// 任务总量
              lastWeekAddTask: data.lastWeekAddTask,	// 上周增加数
              everyDayAddTask: data.everyDayAddTask,	// 日均增加数
              commandTotal: data.commandTotal,	// 指令书总量
              lastWeekAddCommand: data.lastWeekAddCommand,	// 上周增加数
              everyDayAddCommand: data.everyDayAddCommand,	// 日均增加数
              taskThanCommandpercent: parseFloat(data.taskThanCommandpercent.substring(0, data.taskThanCommandpercent.length - 1)),	// 安全率
              taskThanCommandpercentWeek: data.taskThanCommandpercentWeek	// 上周安全率
            }
          } else {
            this.$message.error(resData2.resultDesc)
          }
          if (resData3.resultCode === '0000000') {
            const data = resData3.returnData
            const deviceSrotName = data.map(item => {
              return item.deviceTypeName
            })
            // console.log(data)
            const deviceSrotList = data.map(item => {
              return { value: item.value, name: item.deviceTypeName }
            })
            this.deviceSrotName = deviceSrotName
            this.deviceSrotList = deviceSrotList
            // console.log(data)
          } else {
            this.$message.error(resData3.resultDesc)
          }
          if (resData4.resultCode === '0000000') {
            const data = resData4.returnData
            this.taskCheckTotal = data
            this.task = {
              riChange: data[0].reduce((total, num) => total + num),
              zhuangXiang: data[1].reduce((total, num) => total + num)
            }
            // console.log(this.taskCheckTotal)
          } else {
            this.$message.error(resData4.resultDesc)
          }
          if (resData5.resultCode === '0000000') {
            const data = resData5.returnData
            // this.taskCheckTotal = data
            this.unitTotal = data.total
          } else {
            this.$message.error(resData5.resultDesc)
          }
        }).finally(() => {
          this.onCloseLoading()
          this.initCharts()
        })
    },
    initCharts() {
      // this.setOptions()
      // this.zongLeiOptions()
      // this.rewushuOptions()
      // this.chaoqiOptions()
      // this.rewuliangOptions()
      // this.anquanOptions()
      this.setNewDeviceEharts()
      this.setNewTaskTotal()
    },
    setNewDeviceEharts() { // 设备数量
      const deviceSrotName = this.deviceSrotName
      const deviceSrotList = this.deviceSrotList
      // console.log(deviceSrotName, deviceSrotList)
      const zongleiChart = echarts.init(this.$refs.newZonglei)
      const colors = ['#FF9F40', '#FFCB48', '#5584FF', '#46BC15', '#7C6AF2', '#C95FF2', '#FF6383', '#F58383', '#B49BC0', '#B4946B']
      const option = {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 0,
          left: 'center',
          data: deviceSrotName
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: deviceSrotList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      zongleiChart.setOption(option)
    },
    setNewTaskTotal() {
      const taskCheckTotal = this.taskCheckTotal
      const taskTotal = echarts.init(this.$refs.taskTotal)
      const option = {
        color: ['#5C89FF', '#C95FF2'],
        legend: {
          left: 0,
          data: ['日常监督检查', '专项任务']
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          x: 25
        },
        series: [{
          name: '日常监督检查',
          data: taskCheckTotal[0],
          type: 'line'
        }, {
          name: '专项任务',
          data: taskCheckTotal[1],
          type: 'line'
        }]
      }
      taskTotal.setOption(option)
    },
    setOptions() {
      // 基于准备好的dom，初始化echarts实例
      const renwuChart = echarts.init(this.$refs.renwulaing)
      // 绘制图表
      renwuChart.setOption({
        color: '#8C65E1',
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [{
          data: [820, 932, 90, 934, 1290, 130, 1320],
          type: 'line',
          areaStyle: {}
        }]
      })
    },
    zongLeiOptions() {
      const deviceSrotName = this.deviceSrotName
      const deviceSrotList = this.deviceSrotList
      const zongleiChart = echarts.init(this.$refs.zonglei)
      const colors = ['#8B63E1', '#629FFD', '#739C9C', '#7CC875', '#F0D146', '#D8667B']
      zongleiChart.setOption({
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: deviceSrotName
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: deviceSrotList
          }
        ]
      })
    },
    rewushuOptions() {
      const rewushuChart = echarts.init(this.$refs.rewushu)
      rewushuChart.setOption({
        color: '#8C65E1',
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [{
          data: [820, 932, 90, 934, 1290, 130, 1320],
          type: 'line',
          areaStyle: {}
        }]
      })
    },
    chaoqiOptions() {
      const chaoqiChart = echarts.init(this.$refs.chaoqi)
      chaoqiChart.setOption({
        color: ['#6AA1FC'],
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      })
    },
    rewuliangOptions() {
      const taskCheckTotal = this.taskCheckTotal
      // console.log(this.taskCheckTotal)
      const renwulChart = echarts.init(this.$refs.renwuliang)
      renwulChart.setOption({
        legend: {
          data: ['无指令书', '有指令书']
        },
        color: ['#3398DB', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {// 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '无指令书',
            type: 'bar',
            barWidth: '30%',
            data: taskCheckTotal[0]
          },
          {
            name: '有指令书',
            type: 'bar',
            barWidth: '30%',
            data: taskCheckTotal[1]
          }
        ]
      })
    },
    anquanOptions() {
      const taskThanCommandpercent = this.command.taskThanCommandpercent
      const anQuanChart = echarts.init(this.$refs.anquan)
      anQuanChart.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
        },
        series: [
          {
            name: '安全率',
            type: 'gauge',
            radius: '100%',
            center: ['50%', '50%'],
            // detail: { formatter: '{value}%' },
            data: [{ value: taskThanCommandpercent, name: '' }]
          }
        ]
      })
    },
    checkIndexChange(index) {
      this.checkIndex = index
    },
    checkDayChange(index) {
      this.checkDay = index
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.dashboard {
  background: #F6F6F6;
  font-size: 14px;
  padding:30px;
  .newShowTotal {
    width: 100%;
    padding: 21px;
    display: flex;
    justify-content: space-between;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 6px;
    .itemTotal {
      display: flex;
      align-items: center;
      width: 25%;
      padding: 0 21px;
      .left {
        display: flex;
        flex: 1;
        justify-content: center;
        flex-direction: column;
        .mTitle {
          color: #000000;
        }
        .mDesc {
          color:#999999;
          line-height: 27px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        color:#5584FF;
        font-size: 24px;
      }
    }
    .border-left {
      border-left: 1px solid #E6E7EB;
    }
  }
  .newList {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 15px;
    .deviceTotal {
      background: #fff;
      width: 60%;
      border-radius: 6px;
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
      padding: 28px 20px;
      .deviceTitle {
        font-size: 28px;
        color: #000;
      }
      .newZonglei {
        height: 325px;
      }
    }
    .anQuanTotal {
      background: #fff;
      width: calc(40% - 15px);
      border-radius: 6px;
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
      padding: 28px 20px;
      .danQuanTitle {
        font-size: 28px;
        color: #000;
      }
      .anQuanTu {
        display: flex;
        justify-content: center;
        padding: 30px;
      }
      .tips {
        display: flex;
        justify-content: center;
        align-items: center;
        color:#666666;
        .ride {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          margin-right: 5px;
          background: #5584FF;
        }
      }
    }
  }
  .newTask {
    width: 100%;
    margin-top: 15px;
    padding: 21px;
    border-radius: 6px;
    background: #fff;
    box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
    .taskTile {
      font-size: 28px;
      color: #000;
    }
    .taskList {
      display: flex;
      justify-content: space-between;
      .taskItem {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 21px;
        .itemTile {
          color: #666666;
          line-height: 26px;
        }
        .itemNum {
          color:#000;
          font-size: 32px;
          line-height: 38px;
        }
      }
    }
    .taskTotal {
      height: 360px;
    }
  }
  .chart-item {
    width: 90%;
    height: 335px;
    padding: 16px;
    border: 1px solid rgba(233, 233, 233, 1);
    margin-bottom: 16px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 10px 1px rgba(0,0,0,.25);
    .title {
      display: flex;
      justify-content: space-between;
      i {color: #B6B6B6;}
    }
    .mun {
      font-size: 38px;
      color: #242424;
    }
    .add {
      border-top:1px solid #B6B6B6;
      padding-top: 10px;
      .pd-left {padding-left: 10px;}
    }
    .zonglei,.chaoqi,.rewushu,.renwu,.anquan {
      height: 240px;
    }
    .anquans {
      display: flex;
      justify-content: space-between;
    }
    .tongbi {
      display: flex;
      justify-content: space-between;
    }
  }
  .zongliang {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tongbi {
      display: flex;
      // font-size: 18px;
      justify-content: space-between;
      padding-top: 10px;
      &-item {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        color: #999;
        .green {color:green;}
        .red {color: red;}
        .bi {color: #666;}
      }
    }
  }
  .renwuAll {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tabs {
        display: flex;
        &-item {
          font-weight: bold;
          color:#606266;
          line-height: 40px;
          font-size:  16px;
          border-bottom: 2px solid #ffffff;
          box-sizing: border-box;
        }
        .act {
          color:rgba(16, 141, 233, 1);
          border-bottom: 2px solid rgba(16, 141, 233, 1);
        }
      }
      .time {
        display: flex;
        &-item {
          margin: 0 10px;
          cursor: pointer;
        }
        .act {color:rgba(16, 141, 233, 1);}
      }
    }
    .renwul {
      height: 500px;
    }
  }
  .anPai {
   height:550px;
   border-radius: 4px;
   padding: 30px 16px;
   margin-top: 5px;
   background: #00cc99;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   .anPai-item {
     display: flex;
     color: #ffffff;
     .title {
       color:#ffffff;
       font-size: 20px;
     }
     .cont {
       flex: 1;
       display: flex;
       justify-content: space-between;
       padding: 30px;
     }
     .item-bar {
       display: flex;
       flex-direction: column;
       .bar-title {
         font-size: 18px;
       }
       .status {
         font-size: 30px;
         font-weight: bold;
       }
     }
     .table {
      width: 100%;
      background: #999;
      tr {
        th,td {
          padding: 16px 0;
          background: #ffffff;
          color: #999;
          text-align: center;
        }
      }
     }
   }
  }
}
</style>
