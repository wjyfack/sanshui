import Viewer from 'viewerjs'
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
 * @param list {Array}
 * @return
 */
export function autoDeviceCountConcat(list) {
  // 锅炉数量	deviceType1Count
  // 压力容器数量	deviceType2Count
  // 电梯数量	deviceType3Count
  // 大型游乐设施数量	deviceType4Count
  // 压力管道数量	deviceType5Count
  // 客运索道数量	deviceType6Count
  // 起重机械数量	deviceType7Count
  // 场（厂）内专用机动车辆数量	deviceType8Count
  // 管道元件数量	deviceType9Count
  // 安全附件及安全保护装置数量	deviceType10Count
  const data = {
    deviceType1Count: 0,
    deviceType2Count: 0,
    deviceType3Count: 0,
    deviceType4Count: 0,
    deviceType5Count: 0,
    deviceType6Count: 0,
    deviceType7Count: 0,
    deviceType8Count: 0,
    deviceType9Count: 0,
    deviceType10Count: 0
  }
  list.forEach(item => {
    switch (item.deviceType1) {
      case '1000': // 锅炉
        data.deviceType1Count += 1
        break
      case '2000': // 压力容器
        data.deviceType2Count += 1
        break
      case '3000': // 大型游乐设施
        data.deviceType3Count += 1
        break
      case '6000': // 压力管道
        data.deviceType4Count += 1
        break
      case '8000': // 锅炉
        data.deviceType5Count += 1
        break
      case '9000': // 客运索道
        data.deviceType6Count += 1
        break
      case '4000': // 起重机械
        data.deviceType7Count += 1
        break
      case '5000': // 场（厂）内专用机动车辆
        data.deviceType8Count += 1
        break
      case '7000': // 管道元件
        data.deviceType9Count += 1
        break
      case 'F000': // 安全附件及安全保护装置
        data.deviceType10Count += 1
        break
    }
  })
  return data
}

/**
 * @desc 图片预览
 * @param src {String}
 */
export function toViewer(src) {
  const img = new Image()
  img.src = src
  img.alt = ''
  const viewer = new Viewer(img, {
    zIndex: 10000,
    hidden: function() {
      viewer.destroy()
    }
  })
  viewer.show()
}
