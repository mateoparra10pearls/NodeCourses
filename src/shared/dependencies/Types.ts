const TYPES = {
    // Controllers
    UserController: Symbol.for("UserController"),
    RoleController: Symbol.for("RoleController"),
    
    // Repositories
    UserRepository: Symbol.for("UserRepository"),
    CategoryRepository: Symbol.for("CategoryRepository"),
    CategoryTypeRepository: Symbol.for("CategoryTypeRepository"),
    CourseRepository: Symbol.for("CourseRepository"),
    CourseTagRepository: Symbol.for("CourseTagRepository"),
    RoleRepository: Symbol.for("RoleRepository"),
    SectionRepository: Symbol.for("SectionRepository"),
    TagRepository: Symbol.for("TagRepository"),
    UserSectionRepository: Symbol.for("UserSectionRepository"),

    // Services
    UserService: Symbol.for("UserService"),
    CategoryService: Symbol.for("CategoryService"),
    CategoryTypeService: Symbol.for("CategoryTypeService"),
    CourseService: Symbol.for("CourseService"),
    CourseTagService: Symbol.for("CourseTagService"),
    RoleService: Symbol.for("RoleService"),
    SectionService: Symbol.for("SectionService"),
    TagService: Symbol.for("TagService"),
    UserSectionService: Symbol.for("UserSectionService"),

    //Shared
    ConfigEntity: Symbol.for("ConfigEntity")
    
};
 
export { TYPES };