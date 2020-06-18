/**
 * @interface IUserRepository
 * @desc Responsible for pulling users from persistence.
 **/
import { injectable } from "inversify";
import "reflect-metadata";
import {getRepository} from 'typeorm';
import {UserCourse} from '../entity/UserCourse'
import { Course } from "../entity/Course";
import { URLSearchParams } from "url";

export interface IUserCourseRepository {
     getUserCourses (): Promise<UserCourse[]>;
     getUserCourse (userId: number, courseId: number): Promise<UserCourse> ;
     getUserCourseByid (id: number): Promise<UserCourse>;
     getCourseWithoutUser (userId: number): Promise<Course[]>;
     registerUserCourse(userCourse: UserCourse): Promise<UserCourse>;
     updateUserCourse(userCourse: UserCourse): Promise<Boolean>;
     deleteUserCourse(userCourseId: number): Promise<Boolean>;
}

@injectable()
export class UserCourseRepository implements IUserCourseRepository {
    constructor () {}
  
    async getUserCourses (): Promise<UserCourse[]> {
        const usersC = await getRepository(UserCourse).find();
        return usersC;
    }

    async getUserCourseByid (id: number): Promise<UserCourse> {
        const usersC = await getRepository(UserCourse).findOne({id: id}) as UserCourse;
        return usersC;
    }

    async getCourseWithoutUser (userId: number): Promise<Course[]> {
        const courses = await getRepository(Course)
                                .createQueryBuilder("course")
                                .leftJoinAndSelect("course.UserCourses", "uc")
                                .where("uc.userId != :id or uc.userId is null ", { id: userId })
                                .andWhere("uc.isActive = state:",{ state: true})
                                //.printSql()
                                .getMany();
        return courses;
    }   

    async getUserCourse (userId: number, courseId: number): Promise<UserCourse> {
        const userc = await getRepository(UserCourse)
                            .createQueryBuilder("uc")
                            .where("uc.userId = :userid ", { userid: userId })
                            .andWhere("uc.courseId = :courseid ", { courseid: courseId })
                            .printSql()
                            .getOne() as UserCourse; 
        return userc;
    }

    async updateUserCourse(userCourse: UserCourse): Promise<Boolean>{
        userCourse.LastModifiedOn = new Date();
        userCourse.isActive = true;
        var updatedCourse = await getRepository(UserCourse).update(userCourse.id,{isActive: true, LastModifiedOn: new Date(), progress: userCourse.progress });
        return true;
    }

    async registerUserCourse(userCourse: UserCourse): Promise<UserCourse>{
        userCourse.isActive = true;
        userCourse.CreatedOn = new Date();
        userCourse.progress = 0;

        var newUsercourse = getRepository(UserCourse).create(userCourse);
        var result = await getRepository(UserCourse).save(newUsercourse);
        return result;
    }

    async deleteUserCourse(userCourseId: number): Promise<Boolean>{
        const usersC = await getRepository(UserCourse).findOne({id: userCourseId}) as UserCourse;
        usersC.LastModifiedOn = new Date();
        usersC.isActive = false;
        var updatedCourse = await getRepository(UserCourse).update(usersC.id,{isActive: false, LastModifiedOn: new Date()});
        return true;
    }
}


