import { RequestHandler } from 'express';
import { IProgressRepository } from '../repository/progessRepository';// Good!
import { injectable, inject } from "inversify";
import { TYPES } from '../config/types'
import "reflect-metadata";

/**
 * @class progess service
 * @desc Responsible for handling API requests for the
 * /chapter route.
 **/
@injectable()
export class ProgressService {
  private progessRepo: IProgressRepository; // like here

  constructor ( @inject(TYPES.IUserRepository) progessRepo: IProgressRepository,) { // and here
    this.progessRepo = progessRepo;
  }

   getProgess: RequestHandler = async(req, res) => {
    let progess = await this.progessRepo.getProgress();
    res.status(200).json(progess);
  };

}






