/**
 * @interface ICategoryRepository
 * @desc Responsible for pulling categories from persistence.
 **/
import { injectable } from "inversify";
import "reflect-metadata";
import {getRepository} from 'typeorm';
import {Category} from '../entity/Category'

export interface ICategoryRepository {
     getCategories (): Promise<Category[]>;
     getCategory (id: number): Promise<Category> ;
     getCategoryByName (name: string): Promise<Category> ;
     createCategory(category: Category): Promise<Category>;
}

enum PrintMedia {
    Programming_Language = 1,
    Softskill = 2,
    Framework = 3,
    Library = 4,
    DevOps = 5,
    Testing = 6,
    Security = 7,
    Version_Control = 8,
    Platforms = 9,
    Other = 10
}

@injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor () {}
  
    async getCategories (): Promise<Category[]> {
        const categories = await getRepository(Category).find();
        console.log(categories);
        return categories;
    }

    async getCategory (id: number): Promise<Category> {
        return  await getRepository(Category).findOne({id: id }) as Category;
    }


    async getCategoryByName (name: string): Promise<Category> {
        return  await getRepository(Category).findOne({categoryName: name }) as Category;
    }

    async createCategory(category: Category): Promise<Category>{
        category.isActive = true;
        category.CreatedOn = new Date();
        var newCategory = getRepository(Category).create(category);
        var result = await getRepository(Category).save(newCategory);
        return result;
    }
}


