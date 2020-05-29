export interface IBaseService<T> {
  get(): Promise<any>;
  getOne(id: number, includeDeteled?:boolean, relations?: string[]): Promise<any>;
  save(item: T): Promise<any>;
  delete(id: number): Promise<any>;
}