const TYPES = {
    //repositories
    IUserRepository: Symbol.for("IUserRepository"),
    IUserCourseRepository: Symbol.for("IUserCourseRepository"),
    ICourseRepository: Symbol.for("ICourseRepository"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
    IChapterRepository: Symbol.for("IChapterRepository"),
    IProgressRepository: Symbol.for("IProgressRepository"),
    //services
    IUserService: Symbol.for("IUserService"),
    ICategoryService: Symbol.for("ICategoryService"),
    ICourseService: Symbol.for("ICourseService"),

    //routes
    UserRouter: Symbol.for("UserRouter"),

    Controller: Symbol('Controller')
};
 
export { TYPES };