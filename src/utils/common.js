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

// export function getTree(data, root, idTxt, pidTxt, pushTxt) {
//   var idTxt = idTxt || 'id'
//   var pidTxt = pidTxt || 'deviceTypePID'
//   var pushTxt = pushTxt || 'children'
//   // 递归方法
//   function getNode(id) {
//     var node = []
//     for (var i = 0; i < data.length; i++) {
//       if (data[i][pidTxt] == id) {
//         data[i][pushTxt] = getNode(data[i][idTxt])
//         node.push(data[i])
//       }
//     }
//     if (node.length == 0) {
//       return
//     } else {
//       return node
//     }
//   }
//   // 使用根节点
//   return getNode(root)
// }
