import {ResponseError} from "../error/response-error.js";
import {logger} from "../app/logging.js";

const errorMiddleware = (request, h) => {
    const response = request.response;

    if (response instanceof ResponseError) {
        console.log(response)
        return h.response({
            status: 'fail',
            message: response.message
        }).code(response.statusCode);
    }

    return h.continue;
}

export {
    errorMiddleware
}
