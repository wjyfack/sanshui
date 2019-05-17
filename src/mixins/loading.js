import { Loading } from 'element-ui'
export const opLoading = {
  data: function() {
    return {
      loadingInstance: null,
      fullscreenLoading: false
    }
  },
  methods: {
    opShowLoading() {
      const options = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.25)'
      }
      this.loadingInstance = Loading.service(options)
    },
    onCloseLoading() {
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        this.loadingInstance.close()
      })
    }
  }
}
