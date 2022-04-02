function defineReactive(obj, key, val) {
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target);
      return val
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return
       /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
       dep.notify();
    }
  })
}

function observer(data) {
  if (!data || typeof data !== 'object') return
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

/**
 * 订阅者
 * @description 存放观察者Watcher对象
 */
class Dep {
  constructor() {
    this.subs = []
  }

  // 在 subs 中添加一个 Watcher 对象
  addSub(sub) {
    this.subs.push(sub)
  }

  // 通知所有 Watcher 对象更新视图
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

/**
 * 观察者
 */
class Watcher {
  constructor() {
    /* 在new一个Watcher对象时将该对象赋值给Dep.target，在getter中会用到 */
    Dep.target = this
  }

  update() {
    console.log('更新视图');
  }
}
Dep.target = null

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
    new Watcher()
    console.log('render...', this._data.test);
  }
}