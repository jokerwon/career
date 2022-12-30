export default function curry(fn: Function, arity = fn.length) {
  function generateCurried(prevArgs: any[]) {
    return function curried(nextArg: any) {
      const args = [...prevArgs, nextArg];
      
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return generateCurried(args);
      }
    };
  }

  return generateCurried([]);
}
