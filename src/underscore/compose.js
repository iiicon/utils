//  错误的版本
// function compose() {
//   var args = arguments;
//   var start = args.length - 1;

//   return function () {
//     var result = args[start].apply(this, arguments);
//     while (start--) result = args[start].call(this, result);

//     return result;
//   };
// }
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}
