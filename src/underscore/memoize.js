// 第一版 (来自《JavaScript权威指南》)
var memoize = function (fn) {
  var cache = {};
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments, ","); // 当参数是对象的时候，就会自动调用 toString 方法转换成 [Object object]，可能检测不到变化
    if (cache[key]) {
      return cache[key];
    } else {
      return (cache[key] = fn.apply(this, arguments));
    }
  };
};

// underscore 把cache作为返回函数的一个属性 而且接受一个hasher函数，用来返回缓存的key（如果没有这个函数，就取第一个参数作为key）

// 第二版 (来自 underscore 的实现)
var memoize = function (func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = "" + (hasher ? hasher.apply(this, arguments) : key);
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};

// 我们一般给 hasher 传一个函数，返回 JSON.stringify(arguments) 来解决对象 join 的问题
