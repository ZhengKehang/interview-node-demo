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
const commander_1 = require("commander");
const fs_1 = require("fs");
const path_1 = require("path");
// @ts-ignore
const node_opencc_1 = __importDefault(require("node-opencc"));
const program = new commander_1.Command();
const openccS2T = new node_opencc_1.default('s2t.json'); // Simplified to Traditional
const openccT2S = new node_opencc_1.default('t2s.json'); // Traditional to Simplified
// Helper function to convert file content
function convertFileContent(filePath, conversion) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = (0, fs_1.readFileSync)(filePath, 'utf-8');
        const convertedContent = conversion === 's2t'
            ? yield openccS2T.convertPromise(content)
            : yield openccT2S.convertPromise(content);
        (0, fs_1.writeFileSync)(filePath, convertedContent, 'utf-8');
        console.log(`Converted: ${filePath}`);
    });
}
// Helper function to recursively convert files in a directory
function convertDirectory(dirPath, conversion) {
    const files = (0, fs_1.readdirSync)(dirPath);
    files.forEach((file) => {
        const fullPath = (0, path_1.resolve)(dirPath, file);
        if ((0, path_1.extname)(fullPath)) {
            // Convert file if it has an extension (likely a file, not a folder)
            convertFileContent(fullPath, conversion);
        }
    });
}
// Configure CLI commands and options
program
    .version('1.0.0')
    .description('A tool to convert Simplified Chinese to Traditional Chinese or vice versa.')
    .requiredOption('-d, --directory <path>', 'directory path to process')
    .option('--s2t', 'convert Simplified Chinese to Traditional Chinese')
    .option('--t2s', 'convert Traditional Chinese to Simplified Chinese');
program.parse(process.argv);
const options = program.opts();
if (!options.s2t && !options.t2s) {
    console.error('Please specify a conversion type: --s2t or --t2s');
    process.exit(1);
}
const conversionType = options.s2t ? 's2t' : 't2s';
// Execute the conversion
convertDirectory((0, path_1.resolve)(options.directory), conversionType);
