### lift

提升一个多元函数，使之能映射到列表、函数或其他符合 FantasyLand Apply spec 规范的对象上。

```js
const madd3 = R.lift((a, b, c) => a + b + c);

madd3([1, 2, 3], [1, 2, 3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
```

### map

```js
const double = (x) => x * 2;

R.map(double, [1, 2, 3]); //=> [2, 4, 6]

R.map(double, { x: 1, y: 2, z: 3 }); //=> {x: 2, y: 4, z: 6}
```
