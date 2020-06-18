import { ICourseRepository } from '../repository/courseRepository';// Good!
import { injectable, inject } from "inversify";
import { TYPES } from '../config/types'
import "reflect-metadata";
import { Course } from '../entity/Course';
import { IChapterRepository } from '../repository/chapterRepository';
import { Chapter } from '../entity/Chapter';
import { ICategoryRepository } from '../repository/categoryRepository';
import { Category } from '../entity/Category';
import { IUserCourseRepository } from '../repository/userCourseRepository';

/**
 * @class CourseService
 * @desc Responsible for handling API requests for the
 * /Course route.
 **/

export interface ICourseService {
  getCourses (): Promise<Course[]>;
  getCourse(id: number): Promise<Course>;
  getCourseWithoutUser(UserId: number): Promise<Course[]>;
  createCourse(course: Course, chapters: Chapter[], categoryId: number): Promise<Course>;
  updateChapterPerc(courseId: number): Promise<Chapter[]>
}

@injectable()
export class CourseService {
  private courseRepo: ICourseRepository; 
  private chapterRepo: IChapterRepository;
  private categoryRepo: ICategoryRepository;
  private userCourseRepo: IUserCourseRepository;

  constructor ( 
    @inject(TYPES.ICourseRepository) courseRepo: ICourseRepository,
    @inject(TYPES.IChapterRepository) chapterRepo: IChapterRepository,
    @inject(TYPES.ICategoryRepository) categoryRepo: ICategoryRepository,
    @inject(TYPES.IUserCourseRepository) userCourseRepo: IUserCourseRepository,
  ) {
    this.courseRepo = courseRepo;
    this.chapterRepo = chapterRepo;
    this.categoryRepo = categoryRepo;
    this.userCourseRepo = userCourseRepo;
  }

  async getCourses() : Promise<Course[]> {
    return await this.courseRepo.getCourses()
  };

  async getCourse(id: number): Promise<Course> {
    return await this.courseRepo.getCourse(id);
  };

  async getCourseWithoutUser(UserId: number): Promise<Course[]> {
    return await this.userCourseRepo.getCourseWithoutUser(UserId);
  };

  async createCourse(course: Course, chapters: Chapter[], categoryId: number): Promise<Course>{
    //See if course exists
    let courseB= await this.courseRepo.getCourseByTitle(course.title);
    if (courseB) {
        return courseB;
    }

    //find category
    var CategoryBd = await this.categoryRepo.getCategory(categoryId)
    course.category = CategoryBd;
    //Create course
    var coursebd = await this.courseRepo.createCourse(course);
    
    //Create chapters
    if (coursebd && coursebd.id > 0) {
      for await (const chapter of chapters) {
        chapter.Course = coursebd;
        await this.chapterRepo.createChapter(chapter);
      }

    }

    //Update Percentages
    await this.updateChapterPerc(coursebd.id);

    return coursebd
  }

  async updateChapterPerc(courseId: number): Promise<Chapter[]>{

    //calculate percentages of chapters
    var chaptersBd = await this.chapterRepo.getChaptersByCourseId(courseId);
    var totalcourse = chaptersBd.map(item => item.length).reduce((prev, next) => prev + next);
    chaptersBd.forEach(item => {
      item.percentage = (item.length/totalcourse)*100;
      this.chapterRepo.updateChapter(item);
    });

    return chaptersBd;
  }

}






