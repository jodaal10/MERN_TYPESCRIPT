import * as express from 'express';
import {  Request, Response, NextFunction } from 'express';
import { ICategoryService } from '../services/categoryService';
import { TYPES } from '../config/types'
import { auth } from '../config/auth'
import { injectable, inject } from "inversify";
import { RegistrableController } from '../config/Registrable';
import {check, validationResult} from 'express-validator';
import { Category } from '../entity/Category';


@injectable()
export class CategoryRouter implements RegistrableController {
    private categoryService: ICategoryService;

    constructor(@inject(TYPES.ICategoryService) categoryService: ICategoryService) {
        this.categoryService = categoryService;
    }

    public register(app: express.Application): void  { // interface implementation

        app.get('/category' ,async(req: Request, res: Response, next: NextFunction) => {
            try {
                var categories = await this.categoryService.getCategories();
                res.status(200).json(categories);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });    

        app.get('/category/:id' ,async(req: Request, res: Response, next: NextFunction) => {
            try {
                var categories = await this.categoryService.getCategory(Number(req.params.id));
                res.status(200).json(categories );
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });    

        app.post('/category',[
            check('categoryName',' name is required').not().isEmpty(),
            check('type','type is required').not().isEmpty()
        ],async(req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }

                var category = new Category();
                category = req.body;

                var categoryBd = await this.categoryService.createCategory(category);
                res.status(200).json(categoryBd);
            } catch (error) {
                console.error(error.message);
                res.status(500).json({'Server error': error.message});
            }
        });    
    }
}
