const promise = Promise.resolve('Hello Webpack');

promise.then(msg => {
    console.log(msg);
})