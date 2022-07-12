import joi from "joi";

const cardSchema = joi.object({
    type: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    employeeID: joi.number().required()
});

export default cardSchema;