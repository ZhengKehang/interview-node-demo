import fs from 'fs';
import path from "path";

/**
 * 检查给定路径的文件是否为有效的JSON文件。
 * @param {string} filePath 文件路径。
 * @returns {Promise<boolean>} 返回一个Promise，解析成功返回true，失败返回false。
 */
async function isValidJsonFile(filePath: string): Promise<boolean | Object> {
  return new Promise<boolean>((resolve) => {
    fs.readFile(filePath, 'utf8', async (err, data) => {
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
      } catch (parseErr: any) {
        // 解析失败，打印错误信息并返回false
        console.error(`Invalid JSON: ${parseErr?.message}`);
        resolve(false);
      }
    });
  });
}

export default isValidJsonFile;
