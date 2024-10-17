import { resolve } from "path";
import { writeFileSync } from "fs";
import {getGeoInfo, parseIPFromLog} from "./utils";

interface GeoInfo {
  ip: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}

async function main() {
  // 解析IP日志文件
  const logFilePath = resolve(__dirname, '../public/ip.txt');
  const outputFilePath = resolve(__dirname, '../public/geoInfo.json');
  const ips = parseIPFromLog(logFilePath);
  console.log(`Found ${ips.length} IPs in the log.`);

  // 存储解析结果
  const geoResults: GeoInfo[] = [];

  for (const ip of ips) {
    const geoInfo = await getGeoInfo(ip);
    if (geoInfo) {
      geoResults.push(geoInfo);
    }
  }

  // 将结果保存为JSON文件
  writeFileSync(outputFilePath, JSON.stringify(geoResults, null, 2), 'utf-8');
  console.log(`Geo information saved to ${outputFilePath}`);
}

main().catch(console.error);
