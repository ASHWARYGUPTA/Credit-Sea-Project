"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CreditCardSchema = new mongoose_1.default.Schema({
    BankName: String,
    AccountNumber: String,
    Address: String,
    AccountOverdue: Number,
    CurrentBalance: Number,
});
const AccountInfoSchema = new mongoose_1.default.Schema({
    // Basic Info
    Name: String,
    MobileNumber: Number,
    CreditScore: Number,
    PanNumber: String,
    // Account Details
    NumberOfAccounts: Number,
    NumberOfActiveAccounts: Number,
    NumberOfClosedAccount: Number,
    CurrentBalanceAmount: Number,
    SecuredAccountsAmount: Number,
    UnsecuredAccountsAmount: Number,
    Last7DaysCreditEnquiries: Number,
    // Credit Cards Information
    CreditCardsInfos: [CreditCardSchema],
    // Reference to User
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
const AccountInfoModel = mongoose_1.default.model("AccountInfoDetails", AccountInfoSchema);
exports.default = AccountInfoModel;
