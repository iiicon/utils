function quick(arr) {
  if (arr.length <= 1) return arr;
  // 取数组的中间元素作为基准
  let pivotIndex = arr.length >> 1;
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [],
    right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quick(left).concat([pivot], quick(right));
}

// function inPlaceQuick(arr) {
//   function swap(arr, a, b) {
//     var temp = arr[a]
//     arr[a] = arr[b]
//     arr[b] = temp
//   }

//   function partition(arr, left, right) {
//     var pivot = arr[left]
//     var storeIndex = right

//   }
// }
