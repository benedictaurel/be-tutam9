const baseResponse = require("../utils/baseResponse.util");

const validateUser = (req, res, next) => {
    const { email, password, name } = Object.keys(req.body).length ? req.body : req.query;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*\W).{8,}$/;

    if (!emailRegex.test(email)) {
        console.log(email)
        return baseResponse(res, false, 400, "Invalid email format", null);
    }

    if (!passwordRegex.test(password)) {
        return baseResponse(res, false, 400, "Password must be at least 8 characters long and contain a number and a special character", null);
    }

    next();
};

module.exports = { validateUser };
