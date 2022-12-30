type FunctorParams<T> = Parameters<Functor<T>>[0];

export interface FunctorReturn<T> {
  map: (
    f: (param: FunctorParams<T>) => FunctorParams<T>
  ) => ReturnType<Functor<T>>;
  valueOf: () => FunctorParams<T>;
  inspect: () => string;
}

export type Functor<T> = (input: T) => FunctorReturn<T>;
