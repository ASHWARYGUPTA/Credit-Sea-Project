"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyJWT = (req, res, next) => {
    try {
        const token = req.body.token;
        if (!process.env.JWT_SECRET)
            return;
        try {
            const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            //   console.log("verify", verify);
            //@ts-ignore
            if (verify._id) {
                //@ts-ignore
                req.body._id = verify._id;
                // console.log(req.body._id);
                next();
            }
        }
        catch (error) {
            res.status(400).json({
                message: "Error In Signing JWT",
                value: false,
                error,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured at VerifyJWT",
            value: false,
            error,
        });
    }
};
exports.default = verifyJWT;
