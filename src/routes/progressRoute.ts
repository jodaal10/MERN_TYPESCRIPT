import { Router } from 'express';
import { ProgressService } from '../services/progressService';
import { IProgressRepository } from '../repository/progessRepository';
import { myContainer } from '../config/dependency'
import { TYPES } from '../config/types'

const router = Router();
let inject = myContainer.get<IProgressRepository>(TYPES.IProgressRepository);
let service= new ProgressService(inject);

router.get('/', (req, res, next) =>{
    service.getProgess(req, res, next);
});

export default router;