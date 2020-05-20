export interface IBaseRepository<T> {          // Exported
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    create(item: T): Promise<boolean>;
    update(id: number, item: T): Promise<boolean>;
    delete(id: number): void;
}