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

  _.VERSION = "8.8";

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  var isArrayLike = function (collection) {
    var length = collection.length;
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };

  _.each = function (obj, callback) {
    var length,
      i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }

    return obj;
  };

  _.log = function () {
    console.log(this);
  };

  _.isFunction = function (obj) {
    return typeof obj == "function" || false;
  };

  _.isObject = function (obj) {
    var type = typeof obj;
    return typeof type === "object" && type == "object" && !!root;
  };

  _.isArray = Array.isArray;

  // functions
  _.functions = function (obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // underscore 默认不支持链式调用，如果要链式调用需要用chain函数
  _.chain = function (obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  var chainResult = function (instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  function identity(value) {
    return value;
  }

  function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accmulator, value, index, collection) {
          return func.call(context, accmulator, value, index, collection);
        };
    }
    return function () {
      return func.apply(context, arguments);
    };
  }

  function shallowProperty(key) {
    return function (obj) {
      return obj == null ? undefined : obj[key];
    };
  }

  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return undefined;
      obj = obj[path[i]];
    }
    return length ? obj : undefined;
  }

  _.property = function (path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function (obj) {
      return deepGet(obj, path);
    };
  };

  _.propertyOf = function (obj) {
    if (obj == null) {
      return _.moop;
    }
    return function (path) {
      return Array.isArray(path) ? deepGet(obj, path) : obj[path];
    };
  };

  function baseIteratee(value, context, argCount) {
    // argCount 默认值 3
    if (value == null) return identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount); // 不用arguments提高性能
    if (_.isObject(value) && !isArray(value)) return matcher(value); // 调用 isMatch 返回布尔值
    return _.property(value);
    // var result = _.map([{name: 'Kevin'}, {name: 'Daisy'}], 'name'); // ['Kevin', 'daisy']
    //  var person1 = {  child: { nickName: 'Kevin'} // var result = _.map(person1, ['child''nickName']);  // 'Kevin'
  }

  _.iteratee = iteratee;
  _.noop = function () {};

  _.constant = function (value) {
    return function () {
      return value;
    };
  };

  function iteratee(value, context) {
    return baseIteratee(value, context, Infinity);
  }

  function isMatch(object, attrs) {
    var _keys = keys(attrs),
      length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  }

  function matcher(attrs) {
    attrs = Object.assign({}, attrs);
    return function (obj) {
      return isMatch(obj, attrs);
    };
  }

  function cb(value, context, argCount) {
    if (_.iteratee !== iteratee) return _.iteratee(value, context);
    return baseIteratee(value, context, argCount);
  }

  _.map = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var length = obj.length,
      results = Array(length);
    for (var index = 0; index < length; index++) {
      results[index] = iteratee(obj[index], index, obj);
    }

    return results;
  };

  // mixin
  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;

  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        var args = [this._wrapped];

        push.apply(args, arguments);

        return chainResult(this, func.apply(_, args));
      };
    });

    return _;
  };

  _.mixin(_);
})();

const _ = module.exports;

{
  // map
  var person1 = {
    child: {
      nickName: "Kevin",
    },
  };

  var person2 = {
    child: {
      nickName: "Daisy",
    },
  };

  var result = _.map([person1, person2], ["child", "nickName"]);
  console.log(result);
  // var values = Object.keys(person).map((key) => person[key]);  // 普通方式
  var values = Object.keys(person1).map(_.propertyOf(person1));
  console.log(values);
}
