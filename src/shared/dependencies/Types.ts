const TYPES = {
    // Controllers
    IUserController: Symbol.for("IUserController"),
    
    // Repositories
    IUserRepository: Symbol.for("IUserRepository"),

    //Shared
    IConnectionApp: Symbol.for("IConnectionApp"),
    ConfigEntity: Symbol.for("ConfigEntity")
    
};
 
export { TYPES };