"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SignUpSchema_1 = __importDefault(require("../schema/SignUpSchema"));
const findUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const data = yield SignUpSchema_1.default.findOne({
            username,
        });
        if (!data) {
            res.status(400).json({
                message: "Invalid Username",
                value: false,
            });
            return;
        }
        if (!data.password) {
            res.status(400).json({
                message: "No Password Available",
                value: false,
            });
            return;
        }
        req.body.data = data;
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured At findUsername",
            value: false,
            error,
        });
    }
});
exports.default = findUsername;
