/**
 * @interface IChapterRepository
 * @desc Responsible for pulling chapters from persistence.
 **/
import { injectable } from "inversify";
import "reflect-metadata";
import {getRepository} from 'typeorm';
import { Chapter } from '../entity/Chapter';

export interface IChapterRepository {
     getChapters (): Promise<Chapter[]>;
     getChapter (id: number): Promise<Chapter>;
     getChaptersByCourseId (courseId: number): Promise<Chapter[]>;
     createChapter(chapter: Chapter): Promise<Chapter>;
     updateChapter(chapter: Chapter): Promise<Boolean>;
}

@injectable()
export class ChapterRepository implements IChapterRepository {
    constructor () {}
  
    async getChapters (): Promise<Chapter[]> {
        const chapters = await getRepository(Chapter).find();
        console.log(chapters);
        return chapters;
    }

    async getChapter (id: number): Promise<Chapter>{
        return  await getRepository(Chapter).findOne({id: id}) as Chapter;
    }

    async getChaptersByCourseId (courseId: number): Promise<Chapter[]>{
        return  await getRepository(Chapter).find({ Course: { id: courseId } }) ;
    }

    async createChapter(chapter: Chapter): Promise<Chapter>{
        chapter.isActive = true;
        chapter.CreatedOn = new Date();
        var newChapter = getRepository(Chapter).create(chapter);
        var result = await getRepository(Chapter).save(newChapter);
        return result;
    }

    async updateChapter(chapter: Chapter): Promise<Boolean>{
        chapter.LastModifiedOn = new Date();
        var updatedChapter = await getRepository(Chapter).update(chapter.id,{percentage: chapter.percentage});
        return true;
    }

}


