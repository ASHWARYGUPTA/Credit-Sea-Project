"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user = new mongoose_1.default.Schema({
    name: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    isSignedIn: { type: Boolean, default: false }
});
const userModel = mongoose_1.default.model("user", user);
exports.default = userModel;
