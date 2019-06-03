import { mapGetters } from 'vuex'
const moHuSearch = {
  computed: {
    ...mapGetters(['companyList'])
  },
  mounted() {
    if (this.companyList.length === 0) {
      this.$store.dispatch('actionsMohuCom')
    }
  },
  methods: {
    querySearchAsync(queryString, cb) { // 模糊搜索公司名
      var restaurants = this.companyList
      // console.log(restaurants)
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)).splice(0, 50) : restaurants.splice(0, 50)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 200)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}

export default moHuSearch
