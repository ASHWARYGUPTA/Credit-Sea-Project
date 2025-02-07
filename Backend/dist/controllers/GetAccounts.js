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
const getToken_1 = __importDefault(require("../middlewares/getToken"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const AccountInfo_1 = __importDefault(require("../schema/AccountInfo"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use((0, cookie_parser_1.default)());
// router.use(
//   cors({
//     origin: "http://localhost:3000", // Your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//     credentials: true, // Include credentials if needed (e.g., cookies)
//   })
// );
router.get("/", getToken_1.default, validateJWT_1.default, verifyJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield AccountInfo_1.default.find({
            userId: req.body._id,
        });
        res.status(200).json({
            message: "Data Fetched",
            value: true,
            response,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured At GetAccounts",
            value: false,
            error,
        });
    }
}));
//@ts-ignore
router.delete("/delete", getToken_1.default, validateJWT_1.default, verifyJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers["delete_id"]) {
            return res.status(400).json({
                message: "No Id Sent",
                value: false,
            });
        }
        console.log("delete_id: ", req.headers["delete_id"]);
        yield AccountInfo_1.default.findByIdAndDelete(req.headers["delete_id"]);
        res.status(200).json({
            message: "Deleted Successfully",
            value: true,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Unkown Error Occured At Deleting Data",
            value: false,
            error,
        });
    }
}));
exports.default = router;
