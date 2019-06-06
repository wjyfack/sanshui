<template>
  <div>
    <el-select v-model="useEque" clearable placeholder="请选择" class="select" @change="onUseEque1Change($event,1)">
      <el-option
        v-for="(item, index) in equipment"
        :key="item.value"
        :label="item.label"
        :value="{value:item.value, index:index}"/>
    </el-select>
    <el-select v-model="useEque2" clearable placeholder="请选择" class="select" @change="onUseEque1Change($event,2)">
      <el-option
        v-for="(item, index) in equipment2"
        :key="item.value"
        :label="item.label"
        :value="{value:item.value, index:index}"/>
    </el-select>
    <el-select v-model="useEque3" clearable placeholder="请选择" class="select" @change="onUseEque1Change($event,3)">
      <el-option
        v-for="(item, index) in equipment3"
        :key="item.value"
        :label="item.label"
        :value="{value:item.value, index:index}"/>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    equipment: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      useEque: '',
      useEque2: '',
      useEque3: '',
      equipment2: [],
      equipment3: []
    }
  },
  methods: {
    clear() {
      this.useEque = ''
      this.useEque2 = ''
      this.useEque3 = ''
      this.equipment2 = []
      this.equipment3 = []
    },
    onUseEque1Change(event, opt) {
      console.log(event)
      if (event) {
        let { index } = event
        if (!index) {
          index = 0
        }
        switch (opt) {
          case 1:
            // this.useEque = name
            this.equipment2 = this.equipment[index].children ? this.equipment[index].children : []
            this.equipment3 = []
            this.useEque2 = ''
            this.useEque3 = ''
            break
          case 2:
            // this.useEque2 = name
            this.equipment3 = this.equipment2[index].children ? this.equipment2[index].children : []
            this.useEque3 = ''
            break
          case 3:
            // this.useEque3 = name
            break
        }
      } else {
        switch (opt) {
          case 1:
            this.useEque = ''
            this.equipment2 = []
            this.equipment3 = []
            this.useEque2 = ''
            this.useEque3 = ''
            break
          case 2:
            this.useEque2 = ''
            this.equipment3 = []
            this.useEque3 = ''
            break
          case 3:
            this.useEque3 = ''
            this.equipment3 = []
            break
        }
      }

      const arr = [this.useEque.value, this.useEque2.value, this.useEque3.value].filter(item => {
        return item
      })
      console.log(arr)
      this.$emit('cascader', arr)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  width: 150px;
}
</style>
