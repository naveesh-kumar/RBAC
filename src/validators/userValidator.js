const Joi = require("joi");

const registerUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(8).required(),
    role: Joi.string().valid('ADMIN', 'USER', 'MANAGER').required()
})

const loginUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(8).required(),
})

const validateRegisterUser = (req, res, next) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0]?.message
        })
    }
    next();
}

const validateLoginUser = (req, res, next) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0]?.message
        })
    }
    next();
}

module.exports = {
    validateLoginUser,
    validateRegisterUser
}