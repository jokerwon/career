/**
 * @author JokerWon
 * @description 自定义Promise函数模块，方式：IIFE（ 立即调用函数表达式）
 * @date 2020/03/13 14:10:00
 */
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  /**
   * @description Promise构造函数
   * @param excutor（执行器函数）
   *   Function(resolve [ , reject])
   * @return Promise对象
   */
  function Promise(excutor) {
    const _this = this
    this.status = PENDING
    this.data = undefined
    this.callbacks = []

    function resolve(value) {
      // 状态只能修改一次，如果状态修改过，直接结束
      if (_this.status !== PENDING) return
      // 修改promise状态
      _this.status = RESOLVED
      // 保存value数据
      _this.data = value
      // 如果有待执行的回调函数，立即异步执行回调函数
      if (_this.callbacks.length > 0) {
        // 执行所有成功的回调函数
        setTimeout(() => {
          _this.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // 状态只能修改一次，如果状态修改过，直接结束
      if (_this.status !== PENDING) return
      // 修改promise状态
      _this.status = REJECTED
      // 保存value数据
      _this.data = reason
      // 如果有待执行的回调函数，立即异步执行回调函数
      if (_this.callbacks.length > 0) {
        // 执行所有成功的回调函数
        setTimeout(() => {
          _this.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        });
      }
    }

    // 立即同步执行excutor
    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  /**
   * @description Promise原型对象的then方法
   * @param
   *   onResolved[Function]: 成功的回调函数
   *   onRejected[Function]: 失败的回调函数
   * @return Promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    const _this = this

    onResolved = typeof onRejected === 'function' ? onResolved : value => value
    // 指定默认失败的回调函数(实现错误/异常传透的关键点)
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    return new Promise((resolve, reject) => {
      // 调用then传入的指定的回调函数(取决于上一个promise), 根据返回的结果，来决定return的promise的状态
      function handle(callback) {
        try {
          const res = callback(_this.data)
          if (res instanceof Promise) {
            // res.then(
            //   value => resolve(value),  // 当res的状态为成功时， 返回一个成功的promise
            //   reason => reject(reason)  // 当res的状态为失败时， 返回一个失败的promise
            // )
            res.then(resolve, reject);
          } else {
            resolve(res)
          }
        } catch (err) {
          reject(err)
        }
      }

      if (_this.status === PENDING) {
        _this.callbacks.push({
          onResolved() {
            handle(onResolved)
          },
          onRejected() {
            handle(onRejected)
          }
        })
      } else if (_this.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)
        })
      } else {  // rejected
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })
  }

  /**
   * @description Promise原型对象的catch方法
   * @param
   *   onRejected[Function]: 失败的回调函数
   * @return Promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * @description Promise函数对象的resolve方法
   * @param
   *   value[any]: 成功的数据
   * @return 状态为resolved的Promise对象
   */
  Promise.resolve = function (value) {

  }

  /**
   * @description Promise函数对象的reject方法
   * @param
   *   reason[any]: 失败的数据
   * @return rejected的Promise对象
   */
  Promise.reject = function (reason) {

  }

  /**
   * @description Promise函数对象的all方法
   * @param promises[array]: promise数组
   * @return Promise对象。只有当所有的promise都为resolved时才会变为resolved
   */
  Promise.all = function (promises) {

  }

  /**
   * @description Promise函数对象的race方法
   * @param promises[array]: promise数组
   * @return Promise对象。其状态由第一个改变状态的promise决定。
   */
  Promise.race = function (promises) {

  }

  // 向外暴露Promise函数
  window.Promise = Promise;
})(window)