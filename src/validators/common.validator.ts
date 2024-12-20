
import { body, header } from 'express-validator';

//TEXT FIELD VALIDATOR FUNCTION
const requiredTextField = (field: string, message: string, options: { min: number; max: number }) => {
    return body(field)
        .trim()
        .exists()
        .notEmpty()
        .withMessage(`The ${message} field is required`)
        .bail()
        .isLength({
            min: options.min,
            max: options.max,
        })
        .withMessage(`${message} must be between ${options.min} and ${options.max} characters`);
};

//EXPORT
export { requiredTextField };
