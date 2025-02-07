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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const findUsername_1 = __importDefault(require("../middlewares/findUsername"));
const comparePass_1 = __importDefault(require("../middlewares/comparePass"));
const signCookie_1 = __importDefault(require("../middlewares/signCookie"));
const getToken_1 = __importDefault(require("../middlewares/getToken"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use((0, cookie_parser_1.default)());
router.post("/", findUsername_1.default, comparePass_1.default, signCookie_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Correct Credentials",
        value: true,
    });
}));
router.get("/isSignedIn", getToken_1.default, validateJWT_1.default, verifyJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Verified Successfully",
        value: true,
    });
}));
exports.default = router;
