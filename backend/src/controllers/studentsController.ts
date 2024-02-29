import { NextFunction, Request, Response } from 'express';
import { isStudentValid } from '../utils/studentValidator.js';
import Student from '../models/studentModel.js';
import { StudentType } from '../types/studentTypes.js';
import AppError from '../utils/appError.js';

export async function getStudents(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const offset: number = req.query.page ? +req.query.page : 1;
        const limit: number = req.query.rowsCount ? +req.query.rowsCount : 4;

        const students = await Student.getStudents((offset - 1) * limit, limit);
        return res.status(200).json({
            status: 'success',
            data: students,
        });
    } catch (err) {
        return next(err);
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
            return res.status(204).json({
                status: 'success',
            });
        } else {
            return next(
                new AppError(
                    `Can't find student with such id: ${studentId}`,
                    404
                )
            );
        }
    } catch (err) {
        return next(err);
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
        if (student) {
            return res.status(200).json({
                status: 'success',
                data: student,
            });
        } else {
            return next(
                new AppError(
                    `Can't find student with such id: ${studentId}`,
                    404
                )
            );
        }
    } catch (err) {
        return next(err);
    }
}

export async function postStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const student: StudentType = req.body;
        const studentErrors = isStudentValid(student);
        if (studentErrors.length > 0) {
            return next(new AppError(getNonValidString(studentErrors), 404));
        }
        const addedStudentId = await Student.addStudent(student);
        const addedStudent = await Student.getStudentById(addedStudentId);

        return res.status(201).json({
            status: 'success',
            data: addedStudent,
        });
    } catch (err) {
        return next(err);
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
        const studentErrors = isStudentValid(student);
        if (studentErrors.length > 0) {
            return next(new AppError(getNonValidString(studentErrors), 404));
        }
        const ifStudentUpdated = await Student.updateStudentById(
            studentId,
            student
        );

        if (!ifStudentUpdated) {
            return next(
                new AppError(
                    `Can't find student with such id: ${studentId}`,
                    404
                )
            );
        }

        const updatedStudent = await Student.getStudentById(studentId);
        return res.status(200).json({
            status: 'success',
            data: updatedStudent,
        });
    } catch (err) {
        return next(err);
    }
}

function getNonValidString(error: string): string {
    return `You did not pass validation: ` + error + '. Please try agian.';
}
