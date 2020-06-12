// 节流的原理很简单：

// 如果你持续触发事件，每隔一段时间，只执行一次事件。

// 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
// 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。

// 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

{
  // 时间戳
  function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function () {
      var now = +new Date();
      context = this;
      args = arguments;
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    };
  }
}
{
  // 定时器
  function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function () {
      context = this;
      args = arguments;
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  }
}

{
  // 合并
  function throttle(func, wait) {
    var timer;
    var previous = 0;

    return function () {
      var context = this;
      var args = arguments;
      var now = +new Date();

      let remaining = wait - (now - previous);
      if (remaining < 0 || remaining > wait) {
        func.apply(context, args);
        previous = now;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      } else if (!timer) {
        // 赋值一次就好了
        timer = setTimeout(() => {
          fn.apply(context, arguments);
          previous = +new Date();
          clearTimeout(timer);
          timer = null;
        }, remaining);
      }
    };
  }
}

{
  // 优化
  // 那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:

  // leading：false 表示禁用第一次执行
  // trailing: false 表示禁用停止触发的回调

  // 注意 leading：false 和 trailing: false 不能同时设置。
  function throttle(func, wait, options) {
    var timer;
    var previous = 0;
    options = options || {};

    return function throttled() {
      var context = this;
      var args = arguments;
      if (!previous && options.leading === false) previous = now;
      var now = +new Date();
      let remaining = wait - (now - previous);

      if (remaining < 0 || remaining > wait) {
        func.apply(context, args);
        previous = now;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      } else if (!timer && options.trailing) {
        // 赋值一次就好了
        timer = setTimeout(() => {
          previous = options.leading === false ? 0 : new Date().getTime();
          fn.apply(context, arguments);
          clearTimeout(timer);
          timer = null;
        }, remaining);
      }
    };
  }

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };
}
