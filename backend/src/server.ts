import app from './app.js';

const port: number = +process.env.PORT! || 3000;

async function startServer() {
    try {
        // await connectToDatabase();
        // console.log(`The database was connected successfully`);
        app.listen(port, () => {
            console.log(`Server is listening on ${port} port`);
        });
    } catch (err: any) {
        console.error('Error starting the server', err.message);
    }
}

startServer();
