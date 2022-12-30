export default function compose(...funcs: Function[]) {
  function callback(input: any, cb: Function) {
    return cb(input);
  }
  return (initial: any) => funcs.reduceRight(callback, initial);
}
