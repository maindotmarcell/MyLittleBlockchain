"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = __importDefault(require("./wallet"));
class SatoshiNakamoto extends wallet_1.default {
}
exports.default = SatoshiNakamoto;
SatoshiNakamoto.instance = new wallet_1.default();
