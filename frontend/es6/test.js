new Promise((resovle, reject) => {
  resovle(4)
}).then(5).then(value => console.log(value))