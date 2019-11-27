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
          <div class="stl_01" style="left:14.3058em;top: 6.8978em; z-index:14; "><span class="stl_07 stl_08 stl_09">特种设备现场安全监督检查记录 &nbsp;</span></div>
          <div class="stl_01" style="left:35.9942em;top: 10.0315em; "><span class="stl_10 stl_11 stl_09">{{ info.checkNo }} &nbsp;</span></div>
          <div class="stl_01" style="left:34.3214em;top: 9.8549em; "><span class="stl_12 stl_08 stl_09">№</span></div>
          <!-- <div class="stl_01" style="left:28.049em;top: 12.5118em; z-index:391; "><span class="stl_13 stl_14 stl_09">✔</span></div> -->
          <div class="stl_01" style="left:5.702em;top: 12.2513em; "><span class="stl_15 stl_11 stl_16" style="word-spacing:0.8939em;">检查类别<span v-if="info.checkType == 0 || info.checkType == 2">&nbsp;&nbsp;&nbsp;<img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else> □</span>日常监督检查 &nbsp;</span></div>
          <div class="stl_01" style="left:27.75em;top: 12.2513em; "><span class="stl_15 stl_11 stl_17"><span v-if="info.checkType == 1 || info.checkType == 2"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else> □</span>专项监督检查 &nbsp;</span></div>
          <div class="stl_01" style="left:5.702em;top: 14.0913em; "><span class="stl_15 stl_11 stl_09">检查日期 &nbsp;</span></div>
          <div class="stl_01" style="left:18.7833em;top: 14.1647em; "><span class="stl_18 stl_11 stl_09">{{ info.dateM }} &nbsp;</span></div>
          <div class="stl_01" style="left:13.211em;top: 14.1432em; "><span class="stl_15 stl_11 stl_09">年</span></div>
          <div class="stl_01" style="left:17.133em;top: 14.1432em; "><span class="stl_15 stl_11 stl_09">月</span></div>
          <div class="stl_01" style="left:20.8588em;top: 14.1541em; "><span class="stl_15 stl_11 stl_09">日</span></div>
          <div class="stl_01" style="left:10.2983em;top: 14.1964em; "><span class="stl_18 stl_11 stl_09">{{ info.dateY }} &nbsp;</span></div>
          <div class="stl_01" style="left:10.2242em;top: 16.2513em; z-index:69; "><span class="stl_15 stl_11 stl_09">名称： &nbsp;</span></div>
          <div class="stl_01" style="left:14.5983em;top: 14.1964em; "><span class="stl_18 stl_11 stl_09">{{ info.dateD }} &nbsp;</span></div>
          <div class="stl_01" style="left:32.3717em;top: 16.2513em; z-index:75; "><span class="stl_15 stl_11 stl_19">法定代表人： &nbsp;</span></div>
          <div class="stl_01" style="left:12.7025em;top: 16.3839em; "><span class="stl_18 stl_11 stl_09">{{ info.useName }} &nbsp;</span></div>
          <div class="stl_01" style="left:37.3717em;top: 16.3797em; z-index:425; "><span class="stl_18 stl_11 stl_09">{{ info.useLegalPerson }}</span></div>
          <div class="stl_01" style="left:5.702em;top: 18.1129em; z-index:62; "><span class="stl_15 stl_11 stl_09" style="word-spacing:0.2512em;">被 检 查 &nbsp;</span></div>
          <div class="stl_01" style="left:5.702em;top: 19.4129em; "><span class="stl_15 stl_11 stl_09">单位情况 &nbsp;</span></div>
          <div class="stl_01" style="left:10.2242em;top: 18.1529em; z-index:89; "><span class="stl_15 stl_11 stl_09">地址</span><span class="stl_15 stl_11 stl_20">：</span><span class="stl_18 stl_11 stl_09">{{ info.useAddress }} &nbsp;</span></div>
          <div class="stl_01" style="left:32.3717em;top: 18.1529em; z-index:95; "><span class="stl_15 stl_11 stl_21">统一信用代码： &nbsp;</span></div>
          <div class="stl_01" style="left:32.3717em;top: 19.7929em; z-index:120; "><span class="stl_15 stl_11 stl_09">联系电话： &nbsp;</span></div>
          <div class="stl_01" style="left:10.2242em;top: 19.7929em; z-index:112; "><span class="stl_15 stl_11 stl_09">联系人： &nbsp;</span></div>
          <div class="stl_01" style="left:13.3383em;top: 19.8939em; "><span class="stl_18 stl_11 stl_09">{{ info.useContactMan }} &nbsp;</span></div>
          <div class="stl_01" style="left:21.6683em;top: 19.7929em; z-index:115; "><span class="stl_15 stl_11 stl_09">职务： &nbsp;</span></div>
          <div class="stl_01" style="left:23.9592em;top: 19.9289em; "><span class="stl_18 stl_11 stl_09">{{ info.checkUseContactPosition }} &nbsp;</span></div>
          <div class="stl_01" style="left:36.655em;top: 19.8131em; z-index:373; "><span class="stl_22 stl_23 stl_24">{{ info.useContactManTel }} &nbsp;</span></div>
          <!-- <div class="stl_01" style="left:12.719em;top: 21.8618em; z-index:430; "><span class="stl_13 stl_14 stl_09">✔</span></div> -->
          <div class="stl_01" style="left:10.2242em;top: 21.5929em; "><span class="stl_15 stl_11 stl_09">类别</span><span class="stl_25 stl_11 stl_09">:</span><span class="stl_15 stl_11 stl_26"><span v-if="info.checkUseTypeNames == '设计'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span> 设计<span v-if="info.checkUseTypeNames == '制造'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>制造<span v-if="info.checkUseTypeNames == '安装'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>安装<span v-if="info.checkUseTypeNames == '改造'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>改造<span v-if="info.checkUseTypeNames == '维修'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>维修<span v-if="info.checkUseTypeNames == '使用'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>使用<span v-if="info.checkUseTypeNames == '气瓶充装'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>气瓶充装<span v-if="info.checkUseTypeNames == '经营'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>经营<span v-if="info.checkUseTypeNames == '其他'"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else>□</span>其他 &nbsp;</span></div>
          <div class="stl_01" style="left:6.162em;top: 23.7754em; z-index:186; "><span class="stl_15 stl_11 stl_19">抽查设备名称 &nbsp;</span></div>
          <div class="stl_01" style="left:7.022em;top: 25.9954em; "><span class="stl_15 stl_11 stl_09">设备数量 &nbsp;</span></div>
          <div class="stl_01" style="left:14.7458em;top: 27.6154em; "><span class="stl_15 stl_11 stl_27">安全监督检查情况或发现的主要问题（可另附续页） &nbsp;</span></div>
          <div class="stl_01" style="left:6.745em;top: 29.258em; "><span class="stl_18 stl_11 stl_09">{{ info.checkProblem }}</span></div>
          <!-- <div class="stl_01" style="left:10.259em;top: 46.2218em; z-index:359; "><span class="stl_13 stl_14 stl_09">✔</span></div> -->
          <div class="stl_01" style="left:5.582em;top: 45.9613em; z-index:280; "><span class="stl_15 stl_11 stl_28" style="word-spacing:0.2611em;">处理措施：<span v-if="info.checkResulTreatmentId.some(item => item == '1')"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else> □</span> 下达监察指令书  &nbsp;</span></div>
          <div class="stl_01" style="left:20.0483em;top: 45.9613em; z-index:285; "><span class="stl_15 stl_11 stl_29"><span v-if="info.checkResulTreatmentId.some(item => item == '2')"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else> □</span>实施查封 &nbsp;</span></div>
          <div class="stl_01" style="left:27.03em;top: 45.9613em; z-index:290; "><span class="stl_15 stl_11 stl_30"><span v-if="info.checkResulTreatmentId.some(item => item == '3')"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else> □</span>实施扣押 &nbsp;</span></div>
          <div class="stl_01" style="left:9.9642em;top: 47.2613em; "><span class="stl_15 stl_11 stl_28" style="word-spacing:0.4629em;"><span v-if="info.checkResulTreatmentId.some(item => item == '4')"><img :src="img" alt="" style="width:.6em;height:.6em;"></span><span v-else> □</span> 其他：（选择打勾，单选） &nbsp;</span></div>
          <div class="stl_01" style="left:7.3017em;top: 48.1055em; "><span class="stl_18 stl_11 stl_09">{{ info.checkOpinion }}</span></div>
          <div class="stl_01" style="left:5.582em;top: 53.8429em; z-index:322; "><span class="stl_15 stl_11 stl_27">被检查单位对检查记录的意见： &nbsp;</span></div>
          <div class="stl_01" style="left:28.35em;top: 56.4429em; z-index:325; "><span class="stl_15 stl_11 stl_09">签名： &nbsp;</span></div>
          <div class="stl_01" style="left:28.35em;top: 57.7429em; "><span class="stl_15 stl_11 stl_09">日期： &nbsp;</span></div>
          <div class="stl_01" style="left:34.4942em;top: 57.7429em; "><span class="stl_15 stl_11 stl_09">年</span></div>
          <div class="stl_01" style="left:37.5542em;top: 57.7429em; "><span class="stl_15 stl_11 stl_09">月</span></div>
          <div class="stl_01" style="left:40.6158em;top: 57.7429em; "><span class="stl_15 stl_11 stl_09">日</span></div>
          <div class="stl_01" style="left:5.582em;top: 59.0254em; "><span class="stl_15 stl_11 stl_09">检查人员： &nbsp;</span></div>
          <div class="stl_01" style="left:18.2658em;top: 59.0254em; "><span class="stl_15 stl_11 stl_31">记录员： &nbsp;</span></div>
          <div class="stl_01" style="left:27.45em;top: 59.0254em; "><span class="stl_15 stl_11 stl_09">日期： &nbsp;</span></div>
          <div class="stl_01" style="left:33.1317em;top: 59.0254em; "><span class="stl_15 stl_11 stl_09">年</span></div>
          <div class="stl_01" style="left:36.1942em;top: 59.0254em; "><span class="stl_15 stl_11 stl_09">月</span></div>
          <div class="stl_01" style="left:39.2558em;top: 59.0254em; "><span class="stl_15 stl_11 stl_09">日</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sv from './woff/img_01.svg'
import img from './woff/select.png'
export default {
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sv,
      img,
      info: {
        checkResulTreatmentId: []
      }
    }
  },
  watch: {
    record: function() {
      this.dataChange()
    }
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      const info = this.record
      // 日期分割
      const [dateY, dateM, dateD] = info.checkDate.split('-')
      info.dateY = dateY
      info.dateM = dateM
      info.dateD = dateD
      this.info = info
      console.log(this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
sup {
	top: -0.4em;
	vertical-align: baseline;
	position: relative;
}
sub {
	top: 0.4em;
	vertical-align: baseline;
	position: relative;
}
a:link {text-decoration:none;}
a:visited {text-decoration:none;}
@media screen and (min-device-pixel-ratio:0), (-webkit-min-device-pixel-ratio:0), (min--moz-device-pixel-ratio: 0) {.stl_view{ font-size:10em; transform:scale(0.1); -moz-transform:scale(0.1); -webkit-transform:scale(0.1); -moz-transform-origin:top left; -webkit-transform-origin:top left; } }
.layer { }.ie { font-size: 1pt; }
.body { font-size: 1.2em; }
@media print{.stl_view {font-size:1em; transform:scale(1);}}
.stl_01 {
	position: absolute;
	white-space: nowrap;
}
.stl_02 {
	height: 70.08334em;
	font-size: 1em;
	margin: 0em;
	line-height: 0.0em;
	display: block;
	border-style: none;
	width: 49.58333em;
}

@supports(-ms-ime-align:auto) { .stl_02 {overflow: hidden;}}
.stl_03 {
	position: relative;
}
.stl_04 {
	left: 0em;
	position: absolute;
	top: 0em;
}
.stl_05 {
	position: relative;
	width: 49.58333em;
}
.stl_06 {
	// height: 7.008333em;
}
.ie .stl_06 {
	// height: 70.08334em;
}
@font-face {
	font-family:"NEWIJH+MicrosoftYaHei";
	src:url("./woff/9f026064-0000-0000-0000-000000000000.woff") format("woff");
}
.stl_07 {
	font-size: 1.5em;
	font-family: "NEWIJH+MicrosoftYaHei", "Times New Roman";
	color: #000000;
}
.stl_08 {
	line-height: 1.319824em;
}
.stl_09 {
	letter-spacing: 0em;
}

.ie .stl_09 {
	letter-spacing: 0px;
}
@font-face {
	font-family:"OBAQNT+SimSun";
	src:url("./woff/4099a3cc-0000-0000-0000-000000000000.woff") format("woff");
}
.stl_10 {
	font-size: 1em;
	font-family: "OBAQNT+SimSun", "Times New Roman";
	color: #000000;
}
.stl_11 {
	line-height: 1em;
}
.stl_12 {
	font-size: 1em;
	font-family: "NEWIJH+MicrosoftYaHei", "Times New Roman";
	color: #000000;
}
@font-face {
	font-family:"MQDTRR+ZapfDingbats";
	src:url("./woff/f9797769-0000-0000-0000-000000000000.woff") format("woff");
}
.stl_13 {
	font-size: 0.333333em;
	font-family: "MQDTRR+ZapfDingbats", "Times New Roman";
	color: #000000;
}
.stl_14 {
	line-height: 1.164063em;
}
@font-face {
	font-family:"VMGWSP+SimSun";
	src:url("./woff/946dae63-0000-0000-0000-000000000000.woff") format("woff");
}
.stl_15 {
	font-size: 0.88em;
	font-family: "VMGWSP+SimSun", "Times New Roman";
	color: #000000;
}
.stl_16 {
	letter-spacing: -0.0026em;
}

.ie .stl_16 {
	letter-spacing: -0.036px;
}
.stl_17 {
	letter-spacing: -0.0077em;
}

.ie .stl_17 {
	letter-spacing: -0.108px;
}
.stl_18 {
	font-size: 0.833333em;
	// font-family: "OBAQNT+SimSun", "Times New Roman";
	color: #000000;
}
.stl_19 {
	letter-spacing: -0.0046em;
}

.ie .stl_19 {
	letter-spacing: -0.0648px;
}
.stl_20 {
	letter-spacing: -0.0966em;
}

.ie .stl_20 {
	letter-spacing: -1.36px;
}
.stl_21 {
	letter-spacing: -0.004em;
}

.ie .stl_21 {
	letter-spacing: -0.056px;
}
@font-face {
	font-family:"UHSING+Helvetica";
	src:url("./woff/17b61a07-0000-0000-0000-000000000000.woff") format("woff");
}
.stl_22 {
	font-size: 0.833333em;
	// font-family: "UHSING+Helvetica", "Times New Roman";
	color: #000000;
}
.stl_23 {
	line-height: 1.117188em;
}
.stl_24 {
	letter-spacing: -0.0002em;
}

.ie .stl_24 {
	letter-spacing: -0.002px;
}
@font-face {
	font-family:"KKRUDQ+SimSun";
	src:url("./woff/6ef1b625-0000-0000-0000-000000000000.woff") format("woff");
}
.stl_25 {
	font-size: 0.88em;
	font-family: "KKRUDQ+SimSun";
	color: #000000;
}
.stl_26 {
	letter-spacing: -0.0054em;
}

.ie .stl_26 {
	letter-spacing: -0.0767px;
}
.stl_27 {
	letter-spacing: -0.0052em;
}

.ie .stl_27 {
	letter-spacing: -0.073px;
}
.stl_28 {
	letter-spacing: -0.0042em;
}

.ie .stl_28 {
	letter-spacing: -0.0589px;
}
.stl_29 {
	letter-spacing: -0.0115em;
}

.ie .stl_29 {
	letter-spacing: -0.1619px;
}
.stl_30 {
	letter-spacing: -0.0057em;
}

.ie .stl_30 {
	letter-spacing: -0.081px;
}
.stl_31 {
	letter-spacing: 0.0009em;
}

.ie .stl_31 {
	letter-spacing: 0.0133px;
}
</style>
