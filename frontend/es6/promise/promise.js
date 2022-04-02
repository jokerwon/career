/**
 * *************************** 注 意 ************************
 * 1. Promise中的一个个 then 就是一种 Job Queue。
 * 2. 当 JavaScript Engine 处理完当前Event Loop Queue中的代码后，再执行本次任务中所有的 Job Queue，然后再处理 Event Loop Queue（下一次事件循环任务）
 * **********************************************************
 * - Promise.prototype.then(onResovled[, onRejected])
 *   - 最多接受两个参数, 分别指定成功和失败情况的回调函数
 *   - 返回一个 Promise 实例
 *   - 既可以处理 onResolved 也可以处理 onRejected
 *   - 当一个 Promise 完成（fulfilled）或者失败（rejected）时，返回函数将被异步调用（由当前的线程循环来调度完成）。
 *     具体的返回值依据以下规则返回。如果 then 中的回调函数(**同时适用于onResovled和onRejected**)：
 *     - 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
 *     - 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
 *     - 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
 *     - 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，
 *       并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
 *     - 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，
 *       并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
 *     - 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；
 *       同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。
 * - Promise.prototype.catch(onRejected)
 *   - 返回一个 Promise 实例，并且处理拒绝的情况。
 *   - 只可以处理 onRejected, 相当于 then(undefined|null, onRejected),是then的语法糖
 * - Promise.prototype.finally(onFinally)
 *   - 方法返回一个设置了 finally 回调函数的Promise对象。
 *   - 在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
*/
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    // 此回调函数会影响当前then()方法返回的新promise对象的状态
    return 2;
    // return Promise.resolve(2);
    // return Promise.reject(2);
    // throw 2
  },
  reason => {
    // 此回调函数也会影响当前then()方法返回的新promise对象的状态
    console.log('onRejected1()', reason)
    return 2;
    // return Promise.resolve(2);
    // return Promise.reject(2);
    // throw 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)

/**
 * - promise异常传透
 *   - 当使用promise的then进行链式调用的时，可以在最后指定失败的回调函数
 *   - 前面的任何操作出了异常都会传递到最后那个失败的回调函数中处理
 * - 中断promise链
 *   - 当使用链式调用时，在中间终端，不再调用后面的回调函数
 *   - 方案：在回调函数中返回一个pending状态的promise实例
 *  */ 
new Promise((resolve, reject) => {
  reject(1)
}).then(
  value => console.log('onResolved1')
  // 这里没有指定onRejected, 会逐层查找onRejected
  // 相当于此处有一个默认的onRejected
  // reason => { throw reason }  相当于 =>
  // reason => Promise.reject(reason)
).then(
  value => console.log('onResolved2')
).catch(
  reason => {
    // 处理异常后，后面的then还会继续调用
    console.log('onRejected')
    // 返回一个pending状态的promise实例
    return new Promise(() => {})
  }
).then(
  // 由于前一个then返回了一个pending态的promise实例，所以这个回调以及后面的回调永远不会执行
  value => console.log('onResolved3')
)


function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  })
}
timeout(300).then((val) => {
  // console.log(val)
})
// done

// 基本用法
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const time = Date.now();
//     if (time % 2 === 0) {
//       resolve('Success, current time is ' + time);
//     } else {
//       reject('Faied,  current time is ' + time);
//     }
//   }, 1000);
// })
// .then(
//   val => console.log(val),
//   err => console.log(err)
// )
// 等价于 =>
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const time = Date.now();
//     if (time % 2 === 0) {
//       resolve('Success, current time is ' + time);
//     } else {
//       reject('Faied,  current time is ' + time);
//     }
//   }, 1000);
// })
// .then(val => console.log(val))
// .catch(err => console.log(err))
// .finally(() => console.log("finally"))


// promise嵌套（将promise实例作为参数传递给promise实例）
const pr1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    // console.log('p1状态改变')
    // reject(new Error('fail'))
    resolve('success')
  }, 1000)
})
const pr2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    // console.log('p2状态改变')
    resolve(pr1)
  }, 1000)
})
// pr2.then(result => console.log(result)).catch(reason => console.log(reason))
//p1状态改变
//p2状态改变
//success
// pr1的状态决定pr2的状态, 即pr1的状态会传递给pr2

/**
 * Promise.resovle(value)
 * 返回一个状态由给定value决定的Promise对象。
 * 如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；
 * 否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，
 * 并且将该value传递给对应的then方法。
 * 通常而言，如果你不知道一个值是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。
 */
const p1 = new Promise((resolve, reject) => resolve(1))//.then(value => console.log(value));
// 等价于 =>
const p2 = Promise.resolve(2)//.then(value => console.log(value))

/**
 * Promise.reject(reason)
 * 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
 */
const p3 = new Promise((resolve, reject) => reject(new Error('p3 occured an error')))//.catch(reason => console.error(reason));
// 等价于 =>
const p4 = Promise.reject(new Error('p4 occured an error'))//.catch(reason => console.error(reason));

/**
 * Promise.all(iterable): 参数通常为promise数组
 * 这个方法返回一个新的promise对象。
 * 该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 * 这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；
 * 如果这个新的promise对象触发了失败状态，它会把iterable里 第一个 触发失败的promise对象的错误信息作为它的失败错误信息。
 */
const pAll1 = Promise.all([p1, p2, p3, p4]);
pAll1.then(values => console.log(values)).catch(reason => console.log(reason));
// Error: p3 occured an error, 打印iterable里第一个触发失败的错误信息

const pAll2 = Promise.all([p1, p2]);
pAll2.then(values => console.log(values)).catch(reason => console.log(reason));
// [ 1, 2 ], 打印一个包含iterable里所有promise返回值的数组, 顺序跟iterable的顺序保持一致

/**
 * Promise.race(iterable): 参数通常为promise数组
 * 当iterable参数里的任意一个子promise的状态变为成功或失败后，
 * 父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。
 */
const p5 = new Promise((resolve, reject) => setTimeout(() => {
  resolve(5);
}, 100));
const pRace1 = Promise.race([p1, p2, p3]);
pRace1.then(value => console.log(value)).catch(reason => console.log(reason));
// 1, 第一个改变状态的promise对象是p1, 故pRace1的状态也变为p1的状态
const pRace2 = Promise.race([p5, p2, p3]);
pRace2.then(value => console.log(value)).catch(reason => console.log(reason));
// 2, 第一个改变状态的promise对象是p2, 故pRace2的状态也变为p2的状态
const pRace3 = Promise.race([p4, p2, p1]);
pRace3.then(value => console.log(value)).catch(reason => console.log(reason));
// Error: p4 occured an error, 第一个改变状态的promise对象是p4, 故pRace3的状态也变为p4的状态