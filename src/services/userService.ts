import { RequestHandler } from 'express';
import { IUserRepository } from '../repository/userRepository';// Good!
import { injectable, inject } from "inversify";
import { TYPES } from '../config/types'
import "reflect-metadata";
import {User} from '../entity/User';
import { IUserCourseRepository } from '../repository/userCourseRepository';
import { ICourseService } from './courseService';
import { UserCourse } from '../entity/UserCourse';
import { IProgressRepository } from '../repository/progessRepository';
import { DetailProgress } from '../entity/DetailProgress';
import { IChapterRepository } from '../repository/chapterRepository';


/**
 * @class UserController
 * @desc Responsible for handling API requests for the
 * /user route.
 **/
export interface IUserService {
  getUsers (): Promise<User[]>;
  getUser(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  registerUser(user: User): Promise<User>;
  asignCourseToUser(userId: number, courseId: number): Promise<UserCourse>;
  deleteUserCourse(userCourseId: number): Promise<Boolean>;
  registerUserProgress(userCourseId: number, chapterId: number, finishedOn: Date ): Promise<DetailProgress>;
}

@injectable()
export class UserService implements IUserService {
  private userRepo: IUserRepository;
  private userCourseRepo: IUserCourseRepository;
  private courseService: ICourseService;
  private progressRepo: IProgressRepository;
  private chapterRepo: IChapterRepository

  constructor ( 
    @inject(TYPES.IUserRepository) userRepo: IUserRepository,
    @inject(TYPES.IUserCourseRepository) userCourseRepo: IUserCourseRepository,
    @inject(TYPES.ICourseService) courseService: ICourseService,
    @inject(TYPES.IProgressRepository) progressRepo: IProgressRepository,
    @inject(TYPES.IChapterRepository) chapterRepo: IChapterRepository,
  ){ 
    this.userRepo = userRepo;
    this.userCourseRepo = userCourseRepo;
    this.courseService = courseService;
    this.progressRepo = progressRepo;
    this.chapterRepo = chapterRepo;
  }

  async getUsers() : Promise<User[]> {
    return await this.userRepo.getUsers()
  };

  async getUser(id: number): Promise<User> {
    return await this.userRepo.getUser(id);
  };

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepo.getUserByEmail(email);
  };

  async registerUser(user: User): Promise<User>{
    //See if user exists
    let userBd = await this.userRepo.getUserByEmail(user.corporateEmail);
    if (userBd) {
        return userBd;
    }
    return await this.userRepo.registerUser(user);
  }

  async asignCourseToUser(userId: number, courseId: number): Promise<UserCourse>{
    
    let userBd = await this.userRepo.getUser(userId);
    let courseBd = await this.courseService.getCourse(courseId)

    //validate history
    var userCourseBD = await this.userCourseRepo.getUserCourse(userId,courseId);

    //if exists activate again 
    if (userCourseBD && userCourseBD.id > 0) {
      await this.userCourseRepo.updateUserCourse(userCourseBD)
      return userCourseBD;
    }

    var userCourse = new UserCourse();
    userCourse.User = userBd;
    userCourse.Course = courseBd;
    
    return await this.userCourseRepo.registerUserCourse(userCourse);
  }

  async deleteUserCourse(userCourseId: number): Promise<Boolean>{
    return await this.userCourseRepo.deleteUserCourse(userCourseId);
  };

  async registerUserProgress(userCourseId: number, chapterId: number, finishedOn: Date ): Promise<DetailProgress>{
    //find usercourse and chapter
    let userCourseBd = await this.userCourseRepo.getUserCourseByid(userCourseId);
    let chapterBd = await this.chapterRepo.getChapter(chapterId);

    //insert progress
    var progress =  new DetailProgress();
    progress.isActive = true;
    progress.CreatedOn = new Date();
    progress.UserCourse = userCourseBd;
    progress.chapterId = chapterBd.id;
    var progressBd = await this.progressRepo.registerUserProgress(progress);
    
    //update progress course
    userCourseBd.progress = userCourseBd.progress + chapterBd.percentage;
    await this.userCourseRepo.updateUserCourse(userCourseBd);

    return progressBd;
  }

}






