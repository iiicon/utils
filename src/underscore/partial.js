// 第一版
// function partial(fn) {
//   var args = [].slice.call(arguments, 1);

//   return function () {
//     var _args = args.concat([].slice.call(arguments));
//     fn.apply(this, _args);
//   };
// }

// 第二版
function partial(fn) {
  var args = [].slice.call(arguments, 1);

  return function () {
    var argsLen = args.length;
    var position = 0;
    for (var i = 0; i < argsLen; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) {
      args.push(arguments[position++]);
    }

    return fn.apply(this, args);
  };
}

var subtract = function (a, b) {
  return b - a;
};
subFrom20 = partial(subtract, _, 20);
subFrom20(5);
