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
const express_1 = __importDefault(require("express"));
const SignUpSchema_1 = __importDefault(require("../schema/SignUpSchema"));
const parseZod_1 = __importDefault(require("../middlewares/parseZod"));
const bcrypt_1 = require("bcrypt");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/", parseZod_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password, email } = req.body;
        const genPass = yield (0, bcrypt_1.hash)(password, 10);
        yield SignUpSchema_1.default.create({
            name,
            username,
            password: genPass,
            email,
        });
        res.status(200).json({
            message: "Sign Up Successfull",
            value: true,
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Error Occured While Parsing or Uploading data to DB",
            value: false,
            error,
        });
    }
}));
exports.default = router;
