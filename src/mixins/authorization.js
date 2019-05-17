import { mapGetters } from 'vuex'
const authorization = {
  data: function() {
    return {
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    getAuth() {
      // 权限管理
    }
  }
}

export default authorization
