import { Command } from 'commander';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, extname } from 'path';
// @ts-ignore
import OpenCC from 'opencc-js';

const program = new Command();
const openccS2T = OpenCC.Converter({ from: 'cn', to: 'tw' }); // 简体到繁体
const openccT2S = OpenCC.Converter({ from: 'tw', to: 'cn' }); // 繁体到简体

// Helper function to convert json content
async function convertFileContent(filePath: string, conversion: 's2t' | 't2s') {
  const content = readFileSync(filePath, 'utf-8');
  const convertedContent = conversion === 's2t'
    ? await openccS2T(content)
    : await openccT2S(content);

  writeFileSync(filePath, convertedContent, 'utf-8');
  console.log(`Converted: ${filePath}`);
}

// Helper function to recursively convert files in a directory
function convertDirectory(dirPath: string, conversion: 's2t' | 't2s') {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = resolve(dirPath, file);
    if (extname(fullPath)) {
      // Convert json if it has an extension (likely a json, not a folder)
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

const conversionType: 's2t' | 't2s' = options.s2t ? 's2t' : 't2s';

// Execute the conversion
convertDirectory(resolve(options.directory), conversionType);
