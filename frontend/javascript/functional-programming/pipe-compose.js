

function compose(...funcs) {
  
}



const compute = pipe(add4, mutiply3, divide2);
const computeCompose = compose(divide2, mutiply3, add4);

console.log(compute(10)); // 21
console.log(computeCompose(10)); // 21
