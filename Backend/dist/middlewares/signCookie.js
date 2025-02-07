"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signCookie = (req, res, next) => {
    try {
        const dataToSign = req.body.dataToSign;
        if (!process.env.JWT_SECRET) {
            res.status(403).json({
                message: "JWT SECRET NOT AVAILABLE UPDATE ENV FILE",
                value: false,
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign(dataToSign, process.env.JWT_SECRET);
        res.cookie("token", token, {
            sameSite: true,
            secure: true,
            expires: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured at signCookies",
            value: false,
            error,
        });
    }
};
exports.default = signCookie;
