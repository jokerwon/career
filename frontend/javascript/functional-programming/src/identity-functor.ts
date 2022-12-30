import { Functor } from "./Functor";

const Identity: Functor<any> = x => ({
  map(f) {
    return Identity(f(x));
  },
  valueOf() {
    return x;
  },
  inspect() {
    return `Identity {${x}}`;
  },
});

export default Identity;
