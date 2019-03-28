<template>
  <div class="dashboard">
    <el-row v-if="false" :gutter="20">
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-item zongliang">
              <div class="title"><span>设备总量</span> <i class="el-icon-question"/></div>
              <div class="mun">30590</div>
              <div class="tongbi">
                <div class="tongbi-item">
                  <span>周同比</span>
                  <i class="el-icon-caret-bottom green" />
                  <span class="bi">12%</span>
                </div>
                <div class="tongbi-item">
                  <span>日环比</span>
                  <i class="el-icon-caret-top red" />
                  <span class="bi">11%</span>
                </div>
              </div>
              <div class="add"><span>日均增加数</span><span class="pd-left">5</span></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item">
              <div class="title"><span>任务量</span> <i class="el-icon-question"/></div>
              <div class="mun">6874</div>
              <div ref="renwulaing" class="renwu" />
              <div class="add"><span>日均增加数</span><span class="pd-left">5</span></div>
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
              <div class="title"><span>任务书量</span> <i class="el-icon-question"/></div>
              <div class="mun">678</div>
              <div ref="rewushu" class="rewushu"/>
              <div class="add"><span>日均增加数</span><span class="pd-left">3</span></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-item zongliang">
              <div class="title"><span>超期未检数</span> <i class="el-icon-question"/></div>
              <div class="mun">678</div>
              <div ref="chaoqi" class="chaoqi"/>
              <div class="add"><span>日均增加数</span><span class="pd-left">3</span></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="chart-item zongliang anquans">
              <div class="title"><span>安全率</span> <i class="el-icon-question"/></div>
              <div ref="anquan" class="anquan"/>
              <div class="tongbi add">
                <div class="tongbi-item">
                  <span>周同比</span>
                  <i class="el-icon-caret-bottom green" />
                  <span class="bi">12%</span>
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
                <div class="tabs-item act">任务量</div>
                <div class="tabs-item">访问量</div>
              </div>
              <div class="time">
                <span class="time-item">今日</span>
                <span class="time-item">本周</span>
                <span class="time-item">本月</span>
                <span class="time-item">全年</span>
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
                <div class="item-bar"><span>未完成</span> <span class="status">56</span> </div>
                <div class="item-bar"><span>未完成</span> <span class="status">56</span> </div>
                <div class="item-bar"><span>未完成</span> <span class="status">56</span> </div>
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
    </el-row>
    <img src="@/assets/index.png" alt="" style="width:100%;height:100%;">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      dateTime: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    // this.initCharts()
  },
  methods: {
    initCharts() {
      this.setOptions()
      this.zongLeiOptions()
      this.rewushuOptions()
      this.chaoqiOptions()
      this.rewuliangOptions()
      this.anquanOptions()
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
          data: ['锅炉', '压力容器', '压力管道', '起重机', '电梯', '叉车']
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
            data: [
              { value: 335, name: '锅炉' },
              { value: 310, name: '压力容器' },
              { value: 234, name: '压力管道' },
              { value: 135, name: '起重机' },
              { value: 1548, name: '电梯' },
              { value: 135, name: '叉车' }
            ]
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
      const renwulChart = echarts.init(this.$refs.renwuliang)
      renwulChart.setOption({
        color: ['#3398DB'],
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
            type: 'bar',
            barWidth: '56%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    },
    anquanOptions() {
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
            // detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '' }]
          }
        ]
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  color: #B6B6B6;
  font-size: 14px;
  padding:30px;
  .chart-item {
    width: 85%;
    height: 345px;
    padding: 16px;
    border: 1px solid rgba(233, 233, 233, 1);
    margin-bottom: 16px;
    border-radius: 2px;
    .title {
      display: flex;
      justify-content: space-between;
      i {color: #B6B6B6;}
    }
    .mun {
      font-size: 30px;
      color: #242424;
      padding: 16px 0;
    }
    .add {
      border-top:1px solid #B6B6B6;
      padding-top: 10px;
      .pd-left {padding-left: 10px;}
    }
    .zonglei,.chaoqi,.rewushu,.renwu,.anquan {
      height: 200px;
    }
    .anquans {
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
      font-size: 14px;
      padding: 16px;
      &-item {
        width: 50%;
        display: flex;
        color: #999;
        .green {color:green;}
        .red {color: red;}
        .bi {color: #666;}
      }
    }
  }
  .renwuAll {
    padding: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tabs {
        display: flex;
        &-item {
          padding: 16px;
          font-size:  16px;
          border-bottom: 2px solid #ffffff;
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
        }
      }
    }
    .renwul {
      height: 300px;
    }
  }
  .anPai {
   border-radius: 4px;
   padding: 30px 16px;
   background: #00cc99;
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
        }
      }
     }
   }
  }
}
</style>
