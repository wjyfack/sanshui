<template>
  <div class="body">
    <div class="stl_02">
      <div class="stl_03">
        <object :data="sv" type="image/svg+xml" class="stl_04" style="position:absolute; width:49.5833em; height:70.0833em;">
          <embed :src="sv" type="image/svg+xml">
        </object>
      </div>
      <div class="stl_view">
        <div class="stl_05 stl_06">
          <div class="stl_01" style="left:16.5542em;top: 5.3609em; z-index:33; "><span class="stl_07 stl_08 stl_09">特种设备安全监察指令书 &nbsp;</span></div>
          <div class="stl_01" style="left:15.8208em;top: 7.7299em; "><span class="stl_10 stl_08 stl_09">{{ info.commandNo }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 11.9066em; z-index:362; "><span class="stl_10 stl_08 stl_09">{{ info.useName }} &nbsp;</span></div>
          <div class="stl_01" style="left:28.5333em;top: 11.9224em; z-index:34; "><span class="stl_11 stl_08 stl_09">：</span></div>
          <div class="stl_01" style="left:8.2415em;top: 14.0061em; "><span class="stl_11 stl_08 stl_09">经检查，你单位（个人）在特种设备安全方面存在下列问题： &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 16.0291em; "><span class="stl_10 stl_08 stl_09">{{ info.commandDeviceProblem1 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 18.0291em; "><span class="stl_10 stl_08 stl_09">{{ info.commandDeviceProblem2 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 20.0291em; "><span class="stl_10 stl_08 stl_09">{{ info.commandDeviceProblem3 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 22.0291em; "><span class="stl_10 stl_08 stl_09">{{ info.commandDeviceProblem4 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 24.0291em; "><span class="stl_10 stl_08 stl_09">{{ info.commandDeviceProblem5 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 26.0291em; "><span class="stl_10 stl_08 stl_09">{{ info.commandDeviceProblem6 }} &nbsp;</span></div>
          <div class="stl_01" style="left:16.49em;top: 28.5324em; "><span class="stl_10 stl_08 stl_09">{{ info.commandAgainstRulesInfo1 }} &nbsp;</span></div>
          <div class="stl_01" style="left: 6.09em;top: 30.5324em; "><span class="stl_10 stl_08 stl_09">{{ info.commandAgainstRulesInfo2 }} &nbsp;</span></div>
          <div class="stl_01" style="left:8.287em;top: 28.5894em; "><span class="stl_11 stl_08 stl_09">上述问题违反了 &nbsp;</span></div>
          <div class="stl_01" style="left:13.4625em;top: 32.6432em; "><span class="stl_10 stl_08 stl_09">{{ info.ccording1 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 34.6432em; "><span class="stl_10 stl_08 stl_09">{{ info.ccording2 }} &nbsp;</span></div>
          <div class="stl_01" style="left:5.9082em;top: 32.7556em; "><span class="stl_11 stl_08 stl_09">的规定，根据 &nbsp;</span></div>
          <div class="stl_01" style="left:22.2719em;top: 36.9049em; z-index:370; "><span class="stl_10 stl_08 stl_09" style="font-size:1.05em;">{{ info.dateEndY }} &nbsp;</span></div>
          <div class="stl_01" style="left:5.9082em;top: 36.9217em; z-index:88; "><span class="stl_11 stl_08 stl_09">的规定，责令你单位（个人）于 &nbsp;</span></div>
          <div class="stl_01" style="left:24.5118em;top: 36.9217em; z-index:89; "><span class="stl_11 stl_08 stl_09">年</span></div>
          <div class="stl_01" style="left:27.299em;top: 36.9217em; z-index:90; "><span class="stl_11 stl_08 stl_09">月</span></div>
          <div class="stl_01" style="left:26.205em;top: 36.9349em; z-index:358; "><span class="stl_10 stl_08 stl_09" style="font-size:1.05em;word-spacing:1.1043em;">{{ info.dateEndM }}  {{ info.dateEndD }} &nbsp;</span></div>
          <div class="stl_01" style="left:30.0862em;top: 36.9217em; z-index:102; "><span class="stl_11 stl_08 stl_09">日前采取以下措施予以改正 &nbsp;</span></div>
          <div class="stl_01" style="left:5.907em;top: 38.9932em; z-index:355; "><span class="stl_11 stl_08 stl_09">或者消除事故隐患</span><span class="stl_11 stl_08 stl_12">：</span><span class="stl_10 stl_08 stl_09">{{ info.changeInfo1 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 40.7182em; "><span class="stl_10 stl_08 stl_09">{{ info.changeInfo2 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 42.4em; "><span class="stl_10 stl_08 stl_09">{{ info.changeInfo3 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 44.1em; "><span class="stl_10 stl_08 stl_09">{{ info.changeInfo4 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 45.7em; "><span class="stl_10 stl_08 stl_09">{{ info.changeInfo5 }} &nbsp;</span></div>
          <div class="stl_01" style="left:6.0725em;top: 47.4em; "><span class="stl_10 stl_08 stl_09">{{ info.changeInfo6 }} &nbsp;</span></div>
          <div class="stl_01" style="left:7.075em;top: 49.4224em; z-index:136; "><span class="stl_11 stl_08 stl_09" style="word-spacing:0em;">如对本指令书不服，可在接到指令书之日起 </span><span class="stl_13 stl_08 stl_09">60 </span><span class="stl_11 stl_08 stl_09">日之内向</span><span class="stl_14 stl_08 stl_09">佛山市市场监督管理 &nbsp;</span></div>
          <div class="stl_01" style="left:5.9083em;top: 51.5057em; z-index:180; "><span class="stl_14 stl_08 stl_09">局或佛山市南海区人民政府行政复议委员会</span><span class="stl_11 stl_08 stl_09">申请行政复议，或者于 </span><span class="stl_15 stl_08 stl_16">6</span><span class="stl_11 stl_08 stl_09">个月内向</span><span class="stl_14 stl_08 stl_09">佛山市顺 &nbsp;</span></div>
          <div class="stl_01" style="left:5.9083em;top: 53.5891em; "><span class="stl_14 stl_08 stl_09">德区</span><span class="stl_11 stl_08 stl_09">人民法院提起行政诉讼。复议和起诉期间，不得停止改正或者停止消除 &nbsp;</span></div>
          <div class="stl_01" style="left:5.9083em;top: 55.6724em; "><span class="stl_11 stl_08 stl_09">事故隐患。 &nbsp;</span></div>
          <div class="stl_01" style="left:8.2417em;top: 58.3312em; "><span class="stl_11 stl_08 stl_09">检查人员签名： &nbsp;</span></div>
          <div class="stl_01" style="left:8.2458em;top: 64.1974em; "><span class="stl_11 stl_08 stl_09">被检查单位（负责人）签名： &nbsp;</span></div>
          <div class="stl_01" style="left:35.7542em;top: 66.2811em; "><span class="stl_10 stl_08 stl_17">{{ info.dateY }}</span><span class="stl_11 stl_08 stl_17">年 &nbsp;</span></div>
          <div class="stl_01" style="left:41.1575em;top: 66.2811em; z-index:248; "><span class="stl_11 stl_08 stl_09" style="word-spacing:1.107em;">月 日 &nbsp;</span></div>
          <div class="stl_01" style="left:39.8192em;top: 66.3116em; z-index:400; "><span class="stl_10 stl_08 stl_09" style="word-spacing:1.2479em;">{{ info.dateM }} {{ info.dateD }} &nbsp;</span></div>
          <div class="stl_01" style="left:5.9083em;top: 68.8698em; "><span class="stl_18 stl_08 stl_09">备注：本指令书一式两份，发出部门、被检查单位各一份。 &nbsp;</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sv from './woff/img_10.svg'
export default {
  props: {
    command: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sv,
      info: {}
    }
  },
  watch: {
    command: function() {
      this.dataChange()
    }
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      // useName,
      // commandChangedEndDate,
      // commandNo,
      // commandDeviceProblem,
      // commandDate,
      // commandAgainstRulesInfo,
      // commandCcordingRulesInfo,
      // commandChangedInfo
      const info = this.command
      // 日期分割
      const [dateY, dateM, dateD] = info.commandDate.split('-')
      const [dateEndY, dateEndM, dateEndD] = info.commandChangedEndDate.split('-')
      info.dateY = dateY
      info.dateM = dateM
      info.dateD = dateD
      info.dateEndY = dateEndY
      info.dateEndM = dateEndM
      info.dateEndD = dateEndD
      // const lenght = info.commandChangedInfo.lenght
      info.commandDeviceProblem1 = info.commandDeviceProblem.substr(0, 36)
      info.commandDeviceProblem2 = info.commandDeviceProblem.substr(36, 36)
      info.commandDeviceProblem3 = info.commandDeviceProblem.substr(72, 36)
      info.commandDeviceProblem4 = info.commandDeviceProblem.substr(108, 36)
      info.commandDeviceProblem5 = info.commandDeviceProblem.substr(144, 36)
      info.commandDeviceProblem6 = info.commandDeviceProblem.substr(180)

      info.changeInfo1 = info.commandChangedInfo.substr(0, 26)
      info.changeInfo2 = info.commandChangedInfo.substr(26, 33)
      info.changeInfo3 = info.commandChangedInfo.substr(59, 33)
      info.changeInfo4 = info.commandChangedInfo.substr(92, 33)
      info.changeInfo5 = info.commandChangedInfo.substr(125, 33)
      info.changeInfo6 = info.commandChangedInfo.substr(158, 33)
      info.ccording1 = info.commandCcordingRulesInfo.substr(0, 26)
      info.ccording2 = info.commandCcordingRulesInfo.substr(26)
      info.commandAgainstRulesInfo1 = info.commandAgainstRulesInfo.substr(0, 24)
      info.commandAgainstRulesInfo2 = info.commandAgainstRulesInfo.substr(24)
      this.info = info
    }
  }
}
</script>

<style lang="scss" scoped>
.body { font-size: 1.2em; overflow: hidden;}
@import './woff/style.css';
</style>
