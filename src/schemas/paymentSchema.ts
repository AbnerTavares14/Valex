import joi from "joi";

const paymentSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().pattern(new RegExp(/^[0-9]{4}$/)),
    businessId: joi.number().required(),
    amount: joi.number().required()
});

export default paymentSchema;