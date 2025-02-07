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
const bcrypt_1 = __importDefault(require("bcrypt"));
const comparePass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const username = req.body.username;
        const compare = yield bcrypt_1.default.compare(req.body.password, data.password);
        if (compare) {
            yield SignUpSchema_1.default.findByIdAndUpdate(data._id, {
                isSignedIn: true,
            });
            const dataToSign = {
                _id: data._id,
                username,
            };
            req.body.dataToSign = dataToSign;
            next();
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured At Compare Password",
            value: false,
            error,
        });
    }
});
exports.default = comparePass;
