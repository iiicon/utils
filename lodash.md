## 熟悉 lodash api

### Array

```
- _.compact(array) // remove falsy value

- _.chunk(array, [size=1]) // split into groups of size

- _.difference(array, [values]) // not include in other array

- _.concat(array, [values]) // native

- _.sortedIndex(array, value) // use binary search to inserted into array in order to its 
sort order
- _.sortedIndexBy(array, value, [iteratee=_.identity]) search by invoked value

- _.identity(value) // return first element

- _.eq(value, other) // 基础的一些判断，和 underscore 不同

- _.isEqual(value, other) // deep comparision 和 underscore 的 eq 功能相同

- _.isEqualWith(value, other, [customizer]) // invoked customizer to compare values

_.curry(func, [arity=func.length]) // _作为默认的placeholder，arity返回的函数有几层

_.curryRight(func, [arity=func.length]) // 参数从最后一个往前执行，感觉也挺有用的

_.partial(func, [partials]) // return partially applied function

_.partialRight(func, [partials]) // 参数从最后一个开始传
```


## Function

```
_.after(func, n) 返回一个函数fn, 在fn被调用n次后，执行 func

_.ary(func, n) 创建一个函数fn，执行 func，忽略长度大于n的参数

_.before(func, n) 创建一个函数fn, fn调用n次之前可以执行 func，否则返回最后一次执行 func 的结果
```