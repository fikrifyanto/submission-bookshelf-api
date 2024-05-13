import {ResponseError} from "../error/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false,
    })
    if (result.error) {
        throw new ResponseError(result.error.message.includes('tidak ditemukan') ? 404 : 400, result.error.message);
    } else {
        return result.value;
    }
}

export {
    validate
}
