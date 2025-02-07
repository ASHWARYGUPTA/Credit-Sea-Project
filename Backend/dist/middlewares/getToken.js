"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getToken = (req, res, next) => {
    try {
        if (!req.cookies.token) {
            res.status(400).json({
                message: "No Cookie Found",
                value: false,
            });
            return;
        }
        else {
            const token = req.cookies.token;
            req.body.token = token;
            next();
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured at getToken",
            value: false,
            error,
        });
    }
};
exports.default = getToken;
