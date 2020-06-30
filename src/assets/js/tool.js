export function callModelFun(item) {
  eval(`${item.method}()`);
}
