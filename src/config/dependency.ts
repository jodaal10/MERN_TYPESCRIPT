import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserRepository, UserRepository } from "../repository/userRepository";
import { IUserCourseRepository, UserCourseRepository } from "../repository/userCourseRepository";
import { ICourseRepository, CourseRepository } from "../repository/courseRepository";
import { IChapterRepository, ChapterRepository } from "../repository/chapterRepository";
import { ICategoryRepository, CategoryRepository } from "../repository/categoryRepository";
import { IProgressRepository, ProgressRepository } from "../repository/progessRepository";
import { IUserService, UserService } from "../services/userService";
import { ICategoryService, CategoryService } from '../services/categoryService';
import { ICourseService, CourseService } from '../services/courseService';
import { UserRouter} from '../routes/userRoute'
import { CategoryRouter} from '../routes/categoryRoute'

import { RegistrableController } from './Registrable';
import { CourseRouter } from "../routes/courseRoute";
 
const myContainer = new Container();

//Routes (Controllers)
myContainer.bind<RegistrableController>(TYPES.Controller).to(UserRouter);
myContainer.bind<RegistrableController>(TYPES.Controller).to(CategoryRouter);
myContainer.bind<RegistrableController>(TYPES.Controller).to(CourseRouter);

//services
myContainer.bind<IUserService>(TYPES.IUserService).to(UserService);
myContainer.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);
myContainer.bind<ICourseService>(TYPES.ICourseService).to(CourseService);

//Repositories
myContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
myContainer.bind<IUserCourseRepository>(TYPES.IUserCourseRepository).to(UserCourseRepository);
myContainer.bind<ICourseRepository>(TYPES.ICourseRepository).to(CourseRepository);
myContainer.bind<ICategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
myContainer.bind<IChapterRepository>(TYPES.IChapterRepository).to(ChapterRepository);
myContainer.bind<IProgressRepository>(TYPES.IProgressRepository).to(ProgressRepository);


export { myContainer };