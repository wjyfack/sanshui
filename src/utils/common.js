/**
 * arr 生成书结构
 *
*/

export function translateDataToTree(data) {
  return new Promise((resolve, reject) => {
    var parents = data.filter(value => value.deviceTypePID === '0')
    var childrens = data.filter(value => value.deviceTypePID !== '0')
    var translator = (parents, childrens) => {
      parents.forEach((parent) => {
        parent.label = parent.deviceTypeName
        parent.value = parent.id
        childrens.forEach((current, index) => {
          if (current.deviceTypePID === parent.id) {
            var temp = childrens
            temp.splice(index, 1)
            translator([current], temp)
            typeof parent.childrens !== 'undefined' ? parent.children.push(current) : parent.children = [current]
          }
        }
        )
      }
      )
    }
    translator(parents, childrens)
    resolve(parents)
  })
}

/** 时间格式化 */
export function getFormatDate(val = '') {
  var date = null
  if (val === '') {
    date = new Date()
  } else {
    date = new Date(val)
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
/** 时间+30天后 */
export function getFormatDate30() {
  const date1 = new Date()
  const date2 = new Date(date1)
  date2.setDate(date1.getDate() + 30)
  return `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`
}
/**
 * @desc 自动关联设备数量
 * @param list Array
 * @return
 */
export function autoDeviceCountConcat(list) {

}
