import joi from "joi";

const block = joi.object({
    id: joi.number().required(),
    password: joi.string().pattern(new RegExp(/^[0-9]{4}$/))
});

export default block;