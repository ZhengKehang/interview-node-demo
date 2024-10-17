"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isValidJsonFile_1 = __importDefault(require("./isValidJsonFile"));
const path_1 = __importDefault(require("path"));
const sayHello = (name) => {
    console.log(`Hello, ${name}!`);
};
sayHello("TypeScript");
(0, isValidJsonFile_1.default)(path_1.default.join(__dirname, 'assets/file/testSuccess.json')).then(resp => {
    console.log('testSuccess', resp);
});
(0, isValidJsonFile_1.default)(path_1.default.join(__dirname, 'assets/file/testFail.json'));
