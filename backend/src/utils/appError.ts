class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
    }
}

export default AppError;
