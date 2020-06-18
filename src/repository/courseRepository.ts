/**
 * @interface ICourseRepository
 * @desc Responsible for pulling courses from persistence.
 **/
import { injectable } from "inversify";
import "reflect-metadata";
import {getRepository} from 'typeorm';
import {Course} from '../entity/Course'

export interface ICourseRepository {
    getCourses (): Promise<Course[]>;
    getCourse (id: number): Promise<Course>;
    getCourseByTitle (title: string): Promise<Course>;
    createCourse(course: Course): Promise<Course>;
}

@injectable()
export class CourseRepository implements ICourseRepository {
    constructor () {}
  
    async getCourses (): Promise<Course[]> {
        const courses = await getRepository(Course).find();
        console.log(courses);
        return courses;
    }

    async getCourse (id: number): Promise<Course>{
        return  await getRepository(Course).findOne({id: id}) as Course;
    }

    async getCourseByTitle (title: string): Promise<Course>{
        return  await getRepository(Course).findOne({title:title }) as Course;
    }

    async createCourse(course: Course): Promise<Course>{
        course.isActive = true;
        course.CreatedOn = new Date();
        var newCourse = getRepository(Course).create(course);
        var result = await getRepository(Course).save(newCourse);
        return result;
    }

}


