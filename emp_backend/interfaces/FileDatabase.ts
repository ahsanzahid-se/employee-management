export interface Database<T> {
  add(obj: T): Promise<T>;
  get(id: string): Promise <T | null>;
  getByEmail(id: string): Promise <T | null>;
  update(obj: T): Promise<T | Error>;
  getAll(): Promise<T[]>;
  delete(id: string): Promise<void| string>;
}
