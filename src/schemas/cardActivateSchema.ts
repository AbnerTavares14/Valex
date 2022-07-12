import joi from "joi";

const cardActivateSchema = joi.object({
    id: joi.number().required(),
    password: joi.string().pattern(new RegExp(/^[0-9]{4}$/)),
    cvv: joi.string().required()
});

export default cardActivateSchema;