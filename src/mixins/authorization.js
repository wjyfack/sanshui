import { mapGetters } from 'vuex'
const authorization = {
  data: function() {
    return {
      auths: {}
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  mounted() {
    this.getAuth()
  },
  methods: {
    getAuth() {
      // 权限管理
      new Promise((resolve, reject) => {
        this.getNavName(this.roles)
        resolve()
      }).then(() => {
        // console.log(this.auths)
      })
    },
    getNavName(list) {
      if (list.lenght !== 0) {
        list.forEach(item => {
          this.auths[`${item.navName}`] = true
          if (item.childNav.length !== 0) {
            this.getNavName(item.childNav)
          }
        })
      }
    }
  }
}

export default authorization
