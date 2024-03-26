export type SliceActions<T> = {
  [K in keyof T]: {type: K; payload: T[K] extends (...args: infer P) => void ? P[0] : never};
}[keyof T];
