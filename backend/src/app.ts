import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import studentsRouter from './routes/studentsRouter.js';
import morgan from 'morgan';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

app.use(morgan('dev'));

app.use(
    express.static(
        path.join(
            path.dirname(new URL(import.meta.url).pathname),
            '../../frontend'
        )
    )
);

app.use('/api/v1/students', studentsRouter);

app.use('/students', (req: Request, res: Response, next: NextFunction) => {
    const currentDir = path.dirname(new URL(import.meta.url).pathname);
    res.status(200).sendFile(
        path.resolve(currentDir, '../../frontend/views/index.html')
    );
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const currentDir = path.dirname(new URL(import.meta.url).pathname);
    res.status(404).sendFile(
        path.resolve(currentDir, '../../frontend/views/notFound.html')
    );
});

export default app;
