export interface Storage<T> {
    upload(obj: T): void;
    // get(id: string): T | undefined;
    // update(obj: T): T | Error;
    // delete(id: string): void;
  }
  