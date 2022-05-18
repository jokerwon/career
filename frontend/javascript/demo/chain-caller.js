function LazyMan(name) {
    const { log } = console;

    const queue = [() => log(`Hi! This is ${name}!`)];

    const sleep = (duration = 0) =>
        new Promise((resolve) =>
            setTimeout(
                () => log(`Wake up after ${duration}`) || resolve(),
                duration * 1000
            )
        );

    const ctx = {
        sleep: (duration) => queue.push(() => sleep(duration)) && ctx,
        sleepFirst: (duration) => queue.unshift(() => sleep(duration)) && ctx,
        eat: (food) => queue.push(() => log(`Eat ${food}`)) && ctx,
    };

    queueMicrotask(async () => {
        while (queue.length) {
            await queue.shift()();
        }
    });

    return ctx;
}

// LazyMan("Hank");
// 打印：Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner");
// 打印：Hi! This is Hank!
// 等待了 10 秒后
// 打印：Wake up after 10
// 打印：Eat dinner~
LazyMan("Hank").eat("dinner").eat("supper");
// 打印：Hi This is Hank!
// 打印：Eat dinner~
// 打印：Eat supper~
LazyMan("Hank").sleepFirst(5).eat("supper");
// 等待了 5 秒后
// 打印：Wake up after 5
// 打印：Hi This is Hank!
// 打印：Eat supper

LazyMan("Hank").eat("supper").sleepFirst(5);
// 等待了 5 秒后
// 打印：Wake up after 5
// 打印：Hi This is Hank!
// 打印：Eat supper
