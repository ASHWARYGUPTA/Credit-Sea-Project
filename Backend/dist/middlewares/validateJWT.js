"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateJWT = (req, res, next) => {
    try {
        if (!process.env.JWT_SECRET) {
            res.status(400).json({
                message: "JWT NOT AVAILABLE",
                value: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured at validatingJWT",
            value: false,
            error,
        });
    }
};
exports.default = validateJWT;
