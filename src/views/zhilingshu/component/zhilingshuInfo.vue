<template>
  <div class="task-detail">
    <el-row><div class="bianhao"><label for="">指令书信息</label></div></el-row>
    <div class="detail">
      <div class="item">
        <span class="name">指令书编号：</span> <div class="info">{{ transfe.commandNo }}</div>
      </div>
      <div class="item">
        <span class="name">设备描述：</span> <div class="info">{{ transfe.commandDeviceProblem }}</div>
      </div>
      <div class="item">
        <span class="name">隐患描述：</span> <div class="info">{{ transfe.dangerDescription }}</div>
      </div>
      <div class="item">
        <span class="name">违反条例：</span> <div class="info">{{ transfe.commandAgainstRulesIds }}</div>
      </div>
      <div class="item">
        <span class="name">处罚依据条例：</span> <div class="info">{{ transfe.commandCcordingRulesNames }}</div>
      </div>
      <div class="item">
        <span class="name">整改措施：</span> <div class="info">{{ transfe.commandChangedNames }}</div>
      </div>
      <div class="item">
        <span class="name">监察指令书：</span> <div>
          <el-image
            v-for="url in urlImgs"
            :key="url"
            :src="baseUrl+url"
            style="width: 100px; height: 100px"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/config'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: `${baseUrl}/file/show/rectify/`,
      urlImgs: []
    }
  },
  mounted() {
    const urlImgs = this.transfe.commandExecTaskReplyIntroPhotoList
    if (urlImgs) {
      this.urlImgs = urlImgs.split(',')
    }
  }
}
</script>

<style lang="scss" scoped>
  .task-detail {
    position: relative;
    font-size: 14px;
    .red {
      color:#f56c6c;
    }
    .bianhao {
      display: flex;
      padding: 10px 5px;
      margin-bottom: 10px;
      background: #d3d3d3;
      label {font-weight: 300;color:#333;}
    }
    .detail {
      display: flex;
      flex-direction: column;
      .item {
        color: #666;
        display: flex;
        padding-bottom: 10px;
        .name {
          display: inline-block;
          min-width: 130px;
          // text-align: right;
        }
        .info {
          min-width: 150px;
          color:#999999;
        }
      }
    }
    .row {
      padding: 10px 0;
      .red {color: red;}
      .label {display: inline-block; width: 110px;text-align: right;margin-right: 5px;}
      .input {width: 220px;}
      .textarea {flex: 1;}
      .mes {
        color: #333;
      }
    }
  }
</style>
