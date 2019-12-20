"use strict";
exports.__esModule = true;
function isObject(val) {
  return val !== null && typeof val === "object";
}
exports.isObject = isObject;
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]";
}
exports.isDate = isDate;
function isPlainObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]";
}
exports.isPlainObject = isPlainObject;
function isURLSearchParams(val) {
  return typeof val !== "undefined" && val instanceof URLSearchParams;
}
exports.isURLSearchParams = isURLSearchParams;
function extend(to, from) {
  for (var i in from) {
    to[i] = from[i];
  }
  return to;
}
exports.extend = extend;
function isFormData(val) {
  return typeof val !== "undefined" && val instanceof FormData;
}
exports.isFormData = isFormData;
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
exports.isAbsoluteURL = isAbsoluteURL;
function deepMerge() {
  var objs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    objs[_i] = arguments[_i];
  }
  var result = Object.create(null);
  objs.forEach(function(obj) {
    if (obj) {
      Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}
exports.deepMerge = deepMerge;
function combineURL(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
}
exports.combineURL = combineURL;
