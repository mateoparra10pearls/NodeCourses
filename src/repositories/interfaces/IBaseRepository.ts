export interface IBaseRepository<T> {          // Exported
    find(item: T): Promise<T[]>;
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}