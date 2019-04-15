/**
 * arr 已选value
 * selectArr config中的data
 value: '2',
    label: '佛山市',
    children: [
*/
export function selectLabelName(arr, selectArr) {
  const saveArr = [] // return
  console.log(find(selectArr, item => { return ~~item.value === ~~arr[0] }, saveArr))
  // const num = arr.length
  // for (let i = 0; i < arr.length; i++) {
  //   find(selectArr, item => {
  //     return item.value == arr[i]
  //   }, saveArr)
  // }
  // if (arr[0]) {
  //   find(selectArr, item => {
  //     return ~~item.value === ~~arr[0]
  //   }, saveArr)
  // } else if (arr[1]) {
  //   find(selectArr, item => {
  //     return ~~item.value === ~~arr[1]
  //   }, saveArr)
  // } else if (arr[2]) {
  //   find(selectArr, item => {
  //     return ~~item.value === ~~arr[2]
  //   }, saveArr)
  // }
  return saveArr
}
function find(arr, fn, result) {
  arr.forEach(item => {
    if (item.children) {
      find(item.children, fn, result)
    } else {
      if (fn(item)) {
        result.push(item)
      }
    }
  })
}
