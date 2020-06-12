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
```
