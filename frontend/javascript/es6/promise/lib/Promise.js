const isFunction = target => typeof target === "function";
const isThenable = target => !!target && isFunction(target.then);

class Promise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  _status = Promise.PENDING;
  _result = null;
  _resolvers = [];
  _rejecters = [];

  constructor(executor) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(result) {
    if (this._status !== Promise.PENDING) return;
    this._status = Promise.FULFILLED;
    this._result = result;
    this._resolvers.forEach(callback => {
      callback(result);
    });
  }

  _reject(reason) {
    if (this._status !== Promise.PENDING) return;
    this._status = Promise.REJECTED;
    this._result = reason;
    this._rejecters.forEach(callback => {
      callback(reason);
    });
  }

  /**
   * [注册fulfilled状态/rejected状态对应的回调函数]
   * @param {function} onFulfilled  fulfilled状态时 执行的函数
   * @param {function} onRejected  rejected状态时 执行的函数
   * @returns {Promise} newPromsie  返回一个新的promise对象
   */
  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this._status === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            if (!isFunction(onFulfilled)) {
              resolve(this._result);
            } else {
              let x = onFulfilled(this._result);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      } else if (this._status === Promise.REJECTED) {
        setTimeout(() => {
          try {
            if (!isFunction(onRejected)) {
              reject(this._result);
            } else {
              let x = onRejected(this._result);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      } else if (this._status === Promise.PENDING) {
        this._resolvers.push(() => {
          setTimeout(() => {
            try {
              if (!isFunction(onFulfilled)) {
                resolve(this._result);
              } else {
                let x = onFulfilled(this._result);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
        this._rejecters.push(() => {
          setTimeout(() => {
            try {
              if (!isFunction(onRejected)) {
                reject(this._result);
              } else {
                let x = onRejected(this._result);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }

  /**
   * Promise.prototype.catch()
   * @param {*} onRejected
   * @returns {Promise}
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * Promise.prototype.finally()
   * @param {*} callBack 无论结果是fulfilled或者是rejected，都会执行的回调函数
   * @returns {Promise}
   */
  finally(callBack) {
    return this.then(callBack, callBack);
  }

  /**
   * Promise.resolve()
   * @param {[type]} value 要解析为 Promise 对象的值
   */
  static resolve(value) {
    // 如果这个值是一个 promise ，那么将返回这个 promise
    if (value instanceof Promise) {
      return value;
    }

    // 如果这个值是thenable（即带有`"then" `方法），返回的 promise 会“跟随”这个thenable的对象，采用它的最终状态；
    if (isThenable(value)) {
      return new Promise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }

    return new Promise(resolve => resolve(value));
  }

  /**
   * Promise.reject()
   * @param {*} reason 表示Promise被拒绝的原因
   * @returns
   */
  static reject(reason) {
    return new Promise((_, reject) => {
      reject(reason);
    });
  }

  /**
   * @description 这个Promise的 resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了的时候。它的 reject 回调执行时，只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且 reject 的是第一个抛出的错误信息。
   * @param {Iterable} promises 一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入
   * @returns {Promise}
   */
  static all(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(TypeError("Argument is not iterable"));
        return;
      }

      const results = [];
      let count = 0;

      if (promises.length === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          result => {
            count++;
            results[index] = result;

            if (count === promises.length) {
              resolve(results);
            }
          },
          error => reject(error)
        );
      });
    });
  }

  /**
   * @description 当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，并带有描述每个 promsie 结果的对象数组。
   * @param {Iterable} promises
   * @returns {PromiseLike<{status: string, value?: any, reason?: any}[]>}
   */
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(TypeError("Argument is not iterable"));
        return;
      }

      const results = [];
      let count = 0;

      if (promises.length === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          value => {
            count++;
            results[index] = {
              status: Promise.FULFILLED,
              value,
            };

            if (count === promises.length) {
              resolve(results);
            }
          },
          reason => {
            count++;
            results[index] = {
              status: Promise.REJECTED,
              reason,
            };

            if (count === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  /**
   * @description 该方法会返回一个新的 promise，一旦可迭代对象内的任意一个 promise 变成了兑现状态，那么由该方法所返回的 promise 就会变成兑现状态，并且它的兑现值就是可迭代对象内的首先兑现的 promise 的兑现值。如果可迭代对象内的 promise 最终都没有兑现（即所有 promise 都被拒绝了），那么该方法所返回的 promise 就会变成拒绝状态，并且它的拒因会是一个 AggregateError 实例，这是 Error 的子类，用于把单一的错误集合在一起。
   * @param {Iterable} promises
   * @returns {Promise}
   */
  static any(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(TypeError("Argument is not iterable"));
        return;
      }

      if (promises.length === 0)
        return reject(new AggregateError([], "All promises were rejected"));

      let errorCount = 0;
      const reasons = [];
      promises.forEach(promise => {
        Promise.resolve(promise).then(
          value => {
            resolve(value);
          },
          reason => {
            errorCount++;
            reasons.push(reason);

            if (errorCount === promises.length) {
              reject(
                new AggregateError(
                  reasons,
                  "No Promise in Promise.any was resolved"
                )
              );
            }
          }
        );
      });
    });
  }

  /**
   * Promise.race()
   * @param {Iterable} promises
   * @returns
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(TypeError("Argument is not iterable"));
        return;
      }
      // 如果传入的迭代promises是空的，则返回的 promise 将永远等待。

      promises.forEach(promise => {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  }
}

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  if (x === promise2) {
    throw new TypeError("Chaining cycle detected for promise");
  }

  // 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态
  if (x instanceof Promise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if (x !== null && (typeof x === "object" || isFunction(x))) {
    // 2.3.3 如果 x 为对象或者函数
    let then;
    try {
      // 2.3.3.1 把 x.then 赋值给 then
      then = x.then;
    } catch (e) {
      // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(e);
    }

    /**
     * 2.3.3.3
     * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
     * 传递两个回调函数作为参数，
     * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
     */
    if (isFunction(then)) {
      // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false; // 避免多次调用
      try {
        then.call(
          x,
          // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (e) {
        /**
         * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
         * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
         */
        if (called) return;
        called = true;

        /**
         * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
         */
        reject(e);
      }
    } else {
      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

Promise.deferred = function () {
  let result = {};
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = Promise;
