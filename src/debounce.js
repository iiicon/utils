/**
 * fn = debounce(fn)
 */

const debounce = function (fn, wait) {
  let timer;
  return function () {
    const context = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, arguments);
    }, wait);
  };
};

// 换到开头立即执行
const debounce = function (fn, wait, immediate) {
  let timer, result;

  return function () {
    const context = this;

    if (timer) clearTimeout(timer);

    if (!immediate) {
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, wait);
    } else {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) result = fn.apply(context, arguments);
    }

    return result;
  };
};

// 加取消 bounce
const debounce = function (fn, wait, immediate) {
  let timer, result;

  const debounced = function () {
    const context = this;

    if (timer) clearTimeout(timer);

    if (!immediate) {
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, wait);
    } else {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) result = fn.apply(context, arguments);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
};
