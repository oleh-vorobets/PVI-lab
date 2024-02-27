import { Router } from 'express';
import {
    getStudents,
    deleteStudent,
    getStudent,
    updateStudent,
    postStudent,
} from '../controllers/studentsController.js';

const studentsRouter = Router();

studentsRouter.route('/').get(getStudents).post(postStudent);

studentsRouter
    .route('/:id')
    .get(getStudent)
    .delete(deleteStudent)
    .patch(updateStudent);

export default studentsRouter;
