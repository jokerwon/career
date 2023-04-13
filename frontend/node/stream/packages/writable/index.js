const { Writable } = require("stream");

// 1
class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {}
}

// 如果要实现的流比较简单，也可以直接这样写，注意没有_
const myWritable = new Writable({
  write(chunk, encoding, callback) {},
});
