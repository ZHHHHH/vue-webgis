export function callModelFun(item) {
  eval(`${item.method}()`);
}

function test1() {
  console.log(123);
}

function test2() {
  alert(123);
}
