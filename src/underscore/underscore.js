(function () {
  var root =
    (typeof self == "object" && self.self == self && self) || // 浏览器或者web worker 环境中
    (typeof global == "object" && global.global == global && global) || // nodejs 环境中
    this || // node vm模块中，也就是沙盒模块 runinContext 没有window和global  要用this
    {}; // 微信小程序 因为是严格模式，所以返回undefined

  var _ = function (obj) {
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.log = function () {
    console.log(this);
  };

  // functions
  _.functions = function (obj) {
    var names = [];
    for (var key in obj) {
      if (_isFunction(obj(key))) names.push(key);
    }
    return names.sort();
  };

  // mixin
  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;
  _.mixin = function (obj) {
    _each(_.functions(obj), function (name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
      };
    });

    return _;
  };

  _.mixin(_);

  function _isFunction(obj) {
    return typeof obj === "function";
  }

  function _each(obj, callback) {
    var length,
      i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    }

    return obj;
  }
})();

console.log(root);
_().log();

// console.log(_)
