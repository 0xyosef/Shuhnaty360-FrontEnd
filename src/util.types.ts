declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;

export type UrlString = Branded<string, "url">;

export type Prettify<T> = {
  [K in keyof T]: T[K];
};
