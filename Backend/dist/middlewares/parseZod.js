"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodSchema_1 = require("../schema/zodSchema");
const parseSignUp = (req, res, next) => {
    try {
        const data = zodSchema_1.userSignUpZod.safeParse(req.body);
        if (data.success) {
            next();
        }
        else {
            res.status(400).json({
                message: "Error Occured While Parsing Zod",
                value: false,
                error: data,
            });
            return;
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured at parseZod",
            value: false,
            error,
        });
    }
};
exports.default = parseSignUp;
