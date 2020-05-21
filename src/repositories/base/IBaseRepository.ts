/*
In case of needing extra methods on a single Repository,
A new interface needs to be created in the interface folder.
That interface needs to entends from this one 
and change the Dependency Injection Container to reference the new Interface:

Example: 
    interface: 
        export interface IUserRepository extends IBaseRepository<User> { // specific methods }
    DIContainer:
        DIContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
*/
export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    save(item: T): Promise<T>;
    delete(id: number): Promise<T>;
}