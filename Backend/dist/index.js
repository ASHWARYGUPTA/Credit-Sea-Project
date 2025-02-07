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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const SignUp_1 = __importDefault(require("./controllers/SignUp"));
const SignIn_1 = __importDefault(require("./controllers/SignIn"));
const UploadFile_1 = __importDefault(require("./controllers/UploadFile"));
const GetAccounts_1 = __importDefault(require("./controllers/GetAccounts"));
const Logout_1 = __importDefault(require("./controllers/Logout"));
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MOONGOOSE_STRING) {
        console.log("MOONGOSE STRING NOT PRESENT IN ENV");
        return;
    }
    yield mongoose_1.default.connect(process.env.MOONGOOSE_STRING).then(() => {
        console.log("Connected to DB Successfully");
    });
});
const app = (0, express_1.default)();
connectDb();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Include credentials if needed (e.g., cookies)
}));
app.use("/signup", SignUp_1.default);
app.use("/signin", SignIn_1.default);
app.use("/upload", UploadFile_1.default);
app.use("/getAccounts", GetAccounts_1.default);
app.use("/logout", Logout_1.default);
app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("Listing on port");
    }
    else {
        console.log(error);
    }
});
