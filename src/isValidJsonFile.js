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
const fs_1 = __importDefault(require("fs"));
/**
 * 检查给定路径的文件是否为有效的JSON文件。
 * @param {string} filePath 文件路径。
 * @returns {Promise<boolean>} 返回一个Promise，解析成功返回true，失败返回false。
 */
function isValidJsonFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            fs_1.default.readFile(filePath, 'utf8', (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(`Error reading file: ${err.message}`);
                    resolve(false);
                    return;
                }
                try {
                    // 尝试解析JSON字符串
                    const json = JSON.parse(data);
                    // 解析成功，返回true
                    resolve(json);
                }
                catch (parseErr) {
                    // 解析失败，打印错误信息并返回false
                    console.error(`Invalid JSON: ${parseErr === null || parseErr === void 0 ? void 0 : parseErr.message}`);
                    resolve(false);
                }
            }));
        });
    });
}
exports.default = isValidJsonFile;
