<template>
  <div>
    <el-select v-model="taskStatus" placeholder="请选择" @change="taskSelect">
      <el-option
        v-for="(item,index) in taskType"
        :key="item.value"
        :label="item.label"
        :value="index"/>
    </el-select>
    <el-select v-model="instructionStatus" placeholder="请选择" @change="instrucSelect">
      <el-option
        v-for="item in insprcType"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import { taskType, inspectionType } from '@/utils/config'
// 任务状态 专项任务
export default {
  data() {
    return {
      taskType,
      inspectionType,
      insprcType: [],
      taskStatus: '',
      instructionStatus: ''
    }
  },
  methods: {
    taskSelect(event) {
      console.log(event, this.taskStatus)
      switch (~~this.taskStatus) {
        case 2:
        case 1:
          this.insprcType = inspectionType
          break
        default:
          this.insprcType = []
      }
      this.instructionStatus = ''
      this.change()
    },
    instrucSelect() {
      this.change()
    },
    change() {
      const { value } = taskType[this.taskStatus]
      this.$emit('send', {
        taskStatus: value,
        instructionStatus: this.instructionStatus
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
