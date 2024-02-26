import { Router } from 'express';
import { validateStudent } from '../controllers/studentsController.js';

const studentsRouter = Router();

studentsRouter.route('/validate').post(validateStudent);

export default studentsRouter;
