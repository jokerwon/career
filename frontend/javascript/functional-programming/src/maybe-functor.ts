import { Functor } from "./Functor";

const isEmpty = (x: any) => x === undefined || x === null;

const Maybe: Functor<any> = x => ({
  map(f) {
    return isEmpty(x) ? Maybe(null) : Maybe(f(x));
  },
  valueOf() {
    return x;
  },
  inspect() {
    return `Maybe {${x}}`;
  },
});

export default Maybe;
