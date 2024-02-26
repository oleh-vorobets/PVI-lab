import { NextFunction, Request, Response } from 'express';
import { StudentGender, StudentGroup } from '../types/studentTypes.js';

export async function validateStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const student = req.body;

    if (!Object.values(StudentGroup).includes(student.group)) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid group',
        });
    }
    if (!Object.values(StudentGender).includes(student.gender)) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid student gender',
        });
    }
    if (
        !/^[A-Z]/.test(student.initials.split(' ')[0]) ||
        !/^[A-Z]/.test(student.initials.split(' ')[1])
    ) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid student name or surname',
        });
    }
    const birthday = new Date(student.birthday);
    birthday.setFullYear(birthday.getFullYear() + 18);
    const today = new Date();
    if (today < birthday) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid student birthday date',
        });
    }
    return res.status(200).json({
        status: 'success',
    });
}
