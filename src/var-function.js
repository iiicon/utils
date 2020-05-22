var a = 0;
if (true) {
  a = 1;
  console.log(a);

  function a() {}

  a = 2;
  console.log(a);
}
console.log(a);

// 在Chrome里:
// 'foo' 变量名被提升，但是 typeof foo 为 undefined
//
// 在Firefox里:
// 'foo' 变量名被提升. 但是 typeof foo 为 undefined
//
// 在Edge里:
// 'foo' 变量名未被提升. 而且 typeof foo 为 undefined
//
// 在Safari里:
// 'foo' 变量名被提升. 而且 typeof foo 为 function
