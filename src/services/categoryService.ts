import { RequestHandler } from 'express';
import { ICategoryRepository } from '../repository/categoryRepository';// Good!
import { injectable, inject } from "inversify";
import { TYPES } from '../config/types'
import "reflect-metadata";
import { Category } from '../entity/Category';

export interface ICategoryService {
  getCategories() : Promise<Category[]>;
  getCategory(id: number) : Promise<Category>;
  createCategory(category: Category): Promise<Category>;
}

@injectable()
export class CategoryService implements ICategoryService{
  private categoryRepo: ICategoryRepository; 
  
  constructor ( @inject(TYPES.ICategoryRepository) categoryRepo: ICategoryRepository,) {
    this.categoryRepo = categoryRepo;
  }

  async getCategories() : Promise<Category[]> {
    return await this.categoryRepo.getCategories()
  };

  async getCategory(id: number) : Promise<Category> {
    return await this.categoryRepo.getCategory(id);
  };

  async createCategory(category: Category): Promise<Category>{
    //See if category exists
    let categoryBd = await this.categoryRepo.getCategoryByName(category.categoryName);
    if (categoryBd) {
        return categoryBd;
    }
    return await this.categoryRepo.createCategory(category);
  }

}






