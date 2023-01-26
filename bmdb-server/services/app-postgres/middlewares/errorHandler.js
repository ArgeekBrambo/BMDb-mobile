function errorHandler(err, req, res, next) {
    console.log(err);
    // console.log(err.name, '<<<<<');
    // console.log(err.errors.message, '<<<<<');
    let status = 500;
    let message = "Internal Server Error";

    switch(err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = err.errors[0].message;
            break;

        case "LoginFailed":
            status = 400;
            message = "Invalid email or password";
            break;

        case "NotFound":
            status = 404;
            message = "Data not found";
            break;

        case "Unauthorized":
            status = 401;
            message = "You are not authorized to access this page";
            break;

        case "Forbidden":
            status = 403;
            message = "You are not allowed to access this page";
            break;
        
        case "JsonWebTokenError":
            status = 401;
            message = "You are not authorized to access this page";
            break;

        case "BadRequest":
            status = 400;
            message = "Bad Request";
            break;
    }

    res.status(status).json({ message });
}

module.exports = errorHandler;
