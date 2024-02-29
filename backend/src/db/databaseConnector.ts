import mysql from 'mysql2';
import dotenv from 'dotenv';
import AppError from '../utils/appError.js';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const connectToDB = async () => {
    try {
        return await pool.promise().getConnection();
    } catch (error) {
        throw new AppError(
            'Can not connect to Database. Please try again later...',
            500
        );
    }
};
