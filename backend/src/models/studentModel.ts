// models/studentModel.js
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';

import { StudentType } from '../types/studentTypes.js';

import { connectToDB } from '../db/databaseConnector.js';

class StudentModel {
    async getStudents(
        offset: number = 0,
        limit: number = 4
    ): Promise<StudentType[]> {
        try {
            const connection = await connectToDB();
            const [rows] = await connection.query(
                'SELECT * FROM students LIMIT ? OFFSET ?',
                [limit, offset]
            );
            connection.release();
            return rows as StudentType[];
        } catch (error) {
            throw error;
        }
    }

    async getStudentById(studentId: number): Promise<StudentType> {
        try {
            const connection = await connectToDB();
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
                await connection.query(
                    `SELECT * FROM students WHERE student_id = ?`,
                    [studentId]
                );
            connection.release();
            return rows[0] as StudentType;
        } catch (error) {
            throw error;
        }
    }

    async addStudent(student: StudentType): Promise<number> {
        try {
            const connection = await connectToDB();
            const values = [
                student.group,
                student.first_name,
                student.last_name,
                student.gender,
                student.birthday,
            ];
            const [result]: [ResultSetHeader, FieldPacket[]] =
                await connection.query(
                    `INSERT INTO students (\`group\`, first_name, last_name, gender, birthday) VALUES (?, ?, ?, ?, ?)`,
                    values
                );
            connection.release();
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async updateStudentById(
        studentId: number,
        student: StudentType
    ): Promise<boolean> {
        try {
            const connection = await connectToDB();
            const [result]: [ResultSetHeader, FieldPacket[]] =
                await connection.query(
                    `UPDATE students SET ? WHERE student_id = ?`,
                    [student, studentId]
                );

            connection.release();
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteStudentById(studentId: number): Promise<boolean> {
        try {
            const connection = await connectToDB();
            const [result]: [ResultSetHeader, FieldPacket[]] =
                await connection.query(
                    `DELETE FROM students WHERE student_id = ?`,
                    [studentId]
                );
            connection.release();
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default new StudentModel();
