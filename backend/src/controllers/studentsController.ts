import { NextFunction, Request, Response } from 'express';
import { isStudentValid } from '../utils/studentValidator.js';
import Student from '../models/studentModel.js';
import { StudentType } from '../types/studentTypes.js';

export async function getStudents(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const offset: number = req.query.page ? +req.query.page : 0;
        const limit: number = req.query.rowsCount ? +req.query.rowsCount : 4;

        const students = await Student.getStudents((offset - 1) * limit, limit);
        return res.status(200).json({
            status: 'success',
            data: students,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
        });
    }
}

export async function deleteStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const studentId = +req.params.id;
        const isDeleted = await Student.deleteStudentById(studentId);
        if (isDeleted) {
            return res.status(200).json({
                status: 'success',
            });
        } else {
            throw new Error('Student was not found!');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
        });
    }
}

export async function getStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const studentId = +req.params.id;
        const student = await Student.getStudentById(studentId);
        return res.status(200).json({
            status: 'success',
            data: student,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
        });
    }
}

export async function postStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const student: StudentType = req.body;
        if (!isStudentValid(student)) {
            throw new Error('Invalid student field(s)!');
        }
        const addedStudent = await Student.addStudent(student);

        return res.status(200).json({
            status: 'success',
            data: addedStudent,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
        });
    }
}

export async function updateStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const studentId: number = +req.params.id;
        const student = req.body;
        if (!isStudentValid(student)) {
            throw new Error('Invalid student field(s)!');
        }
        const updatedStudent = await Student.updateStudentById(
            studentId,
            student
        );

        return res.status(200).json({
            status: 'success',
            data: updatedStudent,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
        });
    }
}
