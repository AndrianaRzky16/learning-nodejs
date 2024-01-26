// Sum without highest and lowest number
function sumArray(array) {
  let min = Math.min(...array);
  array = array.filter((num) => num != min);
  let max = Math.max(...array);
  return array.reduce((a, b) => a + b) - max;
}
// Testing the function with different arrays of numbers
console.log(sumArray([1, 2, 3, 4, 5]));
