export type Flatten<T> = { [K in keyof T]: T[K] }; //展平为单层的对象结构
