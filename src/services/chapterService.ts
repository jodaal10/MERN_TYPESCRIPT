import { RequestHandler } from 'express';
import { IChapterRepository } from '../repository/chapterRepository';// Good!
import { injectable, inject } from "inversify";
import { TYPES } from '../config/types'
import "reflect-metadata";

/**
 * @class chapterservice
 * @desc Responsible for handling API requests for the
 * /chapter route.
 **/
@injectable()
export class ChapterService {
  private chapterRepo: IChapterRepository; // like here

  constructor ( @inject(TYPES.IUserRepository) chapterRepo: IChapterRepository,) { // and here
    this.chapterRepo = chapterRepo;
  }

   getChapters: RequestHandler = async(req, res) => {
    let chapters = await this.chapterRepo.getChapters();
    res.status(200).json(chapters);
  };

}






