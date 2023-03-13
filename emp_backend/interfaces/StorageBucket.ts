export interface StorageBucket<T> {
  getUploadURL(id: T): Promise<T>;
  getImageURL(id: string): Promise<T | null>;
}
