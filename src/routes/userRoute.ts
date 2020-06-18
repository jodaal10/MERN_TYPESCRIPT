import * as express from 'express';
import {  Request, Response, NextFunction } from 'express';
import { IUserService } from '../services/userService';
import { injectable, inject } from "inversify";
import { TYPES } from '../config/types'
import { User } from '../entity/User'
import {check, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import  * as bcrypt from 'bcryptjs'
import { RegistrableController } from '../config/Registrable';

@injectable()
export class UserRouter implements RegistrableController {
    private userService: IUserService;
    public router: express.Router;

    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService = userService;
        this.router = express.Router();
    }

    public register(app: express.Application): void  { // interface implementation

        //get users
        app.get('/users' ,async(req: Request, res: Response, next: NextFunction) => {
            try {
                var users = await this.userService.getUsers();
                res.status(200).json( users );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });

        //get user by id
        app.get('/users/:id',async(req: Request, res: Response, next: NextFunction) =>{
            try {
                var user = await this.userService.getUser(Number(req.params.id));
                res.status(200).json( user );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });

         //get user by email
         app.get('/users/getUserBy/:email',async(req: Request, res: Response, next: NextFunction) =>{
            try {
                var user = await this.userService.getUserByEmail(req.params.email);
                res.status(200).json( user );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });

        // asign course to user
        app.post('/users/asigncourse',[
        check('courseId',' courseId is required').not().isEmpty(),
        check('userId','userId is required').not().isEmpty()
        ],async(req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }              

                var userCourse = await this.userService.asignCourseToUser(req.body.userId,req.body.courseId);
                res.status(200).json( userCourse );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });  

        //delete user course
        app.delete('/users/deletecourse/:id',async(req: Request, res: Response, next: NextFunction) =>{
            try {
                var user = await this.userService.deleteUserCourse(Number(req.params.id));
                res.status(200).json( user );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });

        //register user
        app.post('/users',[
            check('firstName','First name is required').not().isEmpty(),
            check('lastName','Last name is required').not().isEmpty(),
            check('corporateEmail','Please include a valid email').isEmail(),
        ],async(req: Request, res: Response, next: NextFunction) =>{
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }

                var user = new User();
                user = req.body;
                user = await this.userService.registerUser(user);
    
                //Return jsonwebtoken
                const payload={
                    user:{
                        id:user.id
                    }
                };
    
                jwt.sign(
                    payload,
                    process.env['TOKEN_SECRET'] || '',
                    {expiresIn:36000},
                    (err,token) =>{
                        if(err) throw err;
                        res.status(200).json({token})
                    } );
                
                //res.status(200).json(user);
                console.log(req.body);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });

        //login user and get token 
        app.post('/users/login',[
            check('corporateEmail','Please include a valid email').isEmail(),
            check('password','password is required').not()
        ],async(req: Request, res: Response, next: NextFunction) =>{
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }

                var user = await this.userService.getUserByEmail(req.body.corporateEmail);
                if(!user){
                    return  res
                    .status(400)
                    .json({errors:[{msg:'The fields entered does not match in our records, please validate and try again'}]});
                }
                
                let password: string = req.body.password;
                let userPass: string = user.password? user.password: "";

                if ( password != null && password != '') {
                    const isMatch = await bcrypt.compare(password,userPass);
                    if (!isMatch) {
                        return res
                        .status(400)
                        .json({errors:[{msg:'The fields entered does not match in our records, please validate and try again'}]});
                    }
                }
               
                //Return jsonwebtoken
                const payload={
                    user:{
                        id:user.id
                    }
                };
    
                jwt.sign(
                    payload,
                    process.env['TOKEN_SECRET'] || '',
                    {expiresIn:36000},
                    (err,token) =>{
                        if(err) throw err;
                        res.status(200).json({token})
                    } );
                
                //res.status(200).json(user);
                console.log(req.body);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });

          // reister user pr

        // reister user progress
        app.post('/users/registerprogress',[
        check('chapterId',' chapterId is required').not().isEmpty(),
        check('userCourseId','userCourseId is required').not().isEmpty(),
        check('finishedOn','finishedOn is required').not().isEmpty()
        ],async(req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }              

                var userCourse = await this.userService.registerUserProgress(req.body.userCourseId,req.body.chapterId,req.body.finishedOn);
                res.status(200).json( userCourse );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });  
    
    }
}

