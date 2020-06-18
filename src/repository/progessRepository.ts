/**
 * @interface IProgessRepository
 * @desc Responsible for pulling progress from persistence.
 **/
import { injectable } from "inversify";
import "reflect-metadata";
import {getRepository} from 'typeorm';
import {DetailProgress} from '../entity/DetailProgress'

export interface IProgressRepository {
    getProgress (): Promise<DetailProgress[]>;
    getProgressByUser (userCourseId: number): Promise<DetailProgress[]>;
    registerUserProgress(progess: DetailProgress): Promise<DetailProgress>;
}

@injectable()
export class ProgressRepository implements IProgressRepository {
    constructor () {}
  
    async getProgress (): Promise<DetailProgress[]> {
        const progess = await getRepository(DetailProgress).find();
        console.log(progess);
        return progess;
    }

    async getProgressByUser (userCourseId: number): Promise<DetailProgress[]> {
        const progess = await getRepository(DetailProgress)
            .createQueryBuilder("progress")
            .leftJoinAndSelect("progress.UserCourse", "uc")
            .where("uc.id = :id ", { id: userCourseId })
            .andWhere("progress.isActive = isactive:",{ isactive: true})
            .andWhere("uc.isActive = state:",{ state: true})
            //.printSql()
            .getMany();
        return progess
    }

    async registerUserProgress(progess: DetailProgress): Promise<DetailProgress>{
        var newProgress = getRepository(DetailProgress).create(progess);
        var result = await getRepository(DetailProgress).save(newProgress);
        return result;
    }


}


