"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUpZod = void 0;
const zod_1 = require("zod");
exports.userSignUpZod = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    username: zod_1.z.string().min(3).max(255),
    password: zod_1.z.string().min(8),
    email: zod_1.z.string().email().min(1)
});
