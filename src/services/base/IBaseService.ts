export interface IBaseService<T> {
  get(): Promise<any>;
  getOne(id: number): Promise<any>;
  save(item: T): Promise<any>;
  delete(id: number): Promise<any>;
}