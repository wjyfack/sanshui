<template>
  <div class="flex">
    <el-select v-model="taskStatus" placeholder="请选择" @change="taskSelect">
      <el-option
        v-for="(item,index) in taskType"
        :key="item.value"
        :label="item.label"
        :value="index"/>
    </el-select>
    <el-select v-model="instructionStatus" multiple filterable allow-create placeholder="请选择" @change="instrucSelect">
      <el-option
        v-for="item in insprcType"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import { taskType } from '@/utils/config'
import { mapGetters } from 'vuex'
// 任务状态 专项任务
export default {
  props: {
    arr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      taskType,
      // inspectionType,
      insprcType: [],
      taskStatus: '',
      instructionStatus: []
    }
  },
  computed: {
    ...mapGetters([
      'inspectionType'
    ])
  },
  mounted() {
    // console.log(this.arr, 1111111)
    if (this.arr[0]) { this.taskStatus = ~~this.arr[0] }
    if (this.arr[1]) {
      this.insprcType = this.inspectionType
      this.instructionStatus = this.arr[1].split(',')
    }
    // console.log(this.taskStatus, this.instructionStatus, 123)
  },
  methods: {
    clear() {
      this.taskStatus = ''
      this.instructionStatus = []
      // this.insprcType
      console.log('clear')
    },
    taskSelect(event) {
      console.log(event, this.taskStatus)
      switch (~~this.taskStatus) {
        case 2:
        case 1:
          this.insprcType = this.inspectionType
          break
        default:
          this.instructionStatus = []
          this.insprcType = []
      }
      this.instructionStatus = []
      this.change()
    },
    instrucSelect(event) {
      // console.log(event, 1123)
      this.instructionStatus = event
      this.change()
    },
    change() {
      const { value } = taskType[this.taskStatus]
      // console.log({
      //   taskStatus: value,
      //   instructionStatus: this.instructionStatus
      // })
      this.$emit('send', {
        taskStatus: value,
        instructionStatus: this.instructionStatus.join()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex
}
</style>
