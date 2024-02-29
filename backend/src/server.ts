import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectToDB } from './db/databaseConnector.js';

const port: number = +process.env.PORT! || 3000;

async function startServer() {
    try {
        await connectToDB();
        console.log(`The database was connected successfully`);
        app.listen(port, () => {
            console.log(`Server is listening on ${port} port`);
        });
    } catch (err: any) {
        console.error('Error starting the server', err.message);
    }
}

await startServer();
