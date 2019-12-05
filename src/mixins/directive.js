// 指令 不要了
const directive = {
  methods: {
    formatDate(row, column, cellValue) {
      console.log(row, column, cellValue)
      // var newDate = row.date== "" ? "-" : row.date.replace(/-/g,"/")
      // return newDate
      return ''
    }
  }
}

export default directive
