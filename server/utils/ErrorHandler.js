// It is a Error class (OOPs concept) to handle all kind of small error :-

class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
}

export default ErrorHandler;