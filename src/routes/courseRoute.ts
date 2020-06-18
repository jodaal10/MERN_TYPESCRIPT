import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { ICourseService } from '../services/courseService';
import { auth } from '../config/auth'
import { TYPES } from '../config/types'
import { injectable, inject } from "inversify";
import { RegistrableController } from '../config/Registrable';
import {check, validationResult} from 'express-validator';
import { Course } from '../entity/Course';
import { Chapter } from '../entity/Chapter';


@injectable()
export class CourseRouter implements RegistrableController {
    private courseService: ICourseService;

    constructor(@inject(TYPES.ICourseService) courseService: ICourseService) {
        this.courseService = courseService;
    }

    public register(app: express.Application): void  { // interface implementation

        // get courses
        app.get('/course' ,async(req: Request, res: Response, next: NextFunction) => {
            try {
                var courses = await this.courseService.getCourses();
                res.status(200).json(courses);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });    

        //get course by id
        app.get('/course/:id' ,async(req: Request, res: Response, next: NextFunction) => {
            try {
                var course = await this.courseService.getCourse(Number(req.params.id));
                res.status(200).json(course);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });  

        //get courses that the user does not have currently added
        app.get('/course/user/:userId',async(req: Request, res: Response, next: NextFunction) => {
            try {
                var course = await this.courseService.getCourseWithoutUser(Number(req.params.userId));
                res.status(200).json( course );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });
        
        //create course
       app.post('/course',[
            check('title',' title is required').not().isEmpty(),
            check('categoryId','categoryId is required').not().isEmpty(),
            check('chapters','chapters are required').not().isEmpty()
        ],async(req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }

                var course = new Course();
                var chapters: Chapter[];

                course = req.body;
                chapters = req.body.chapters;

                var course = await this.courseService.createCourse(course,chapters,req.body.categoryId);
                res.status(200).json( course );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({ 'Server error': error.message});
            }
        });  
        
        // update percentage chapter
        app.put('/chapter/:id' ,async(req: Request, res: Response, next: NextFunction) => {
            try {
                var chaptersBd = await this.courseService.updateChapterPerc(Number(req.params.id));
                res.status(200).json(chaptersBd);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        }); 
    }
}