import { resolve } from 'path';
import {getGeoInfo, parseIPFromLog} from "./utils";


// 聚合IP到区域的映射
async function aggregateIPRegions(ips: string[]) {
  const regionMap: { [region: string]: number } = {};

  for (const ip of ips) {
    const geoInfo = await getGeoInfo(ip);
    if (geoInfo && geoInfo.country) {
      const region = `${geoInfo.country}, ${geoInfo.city || 'Unknown'}`;
      if (regionMap[region]) {
        regionMap[region]++;
      } else {
        regionMap[region] = 1;
      }
    }
  }

  return regionMap;
}

// 打印聚合结果
function printAggregatedRegions(regionMap: { [region: string]: number }) {
  console.log('Aggregated IP Regions:');
  for (const region in regionMap) {
    console.log(`${region}: ${regionMap[region]} IPs`);
  }
}

// 主函数
async function main() {
  // 解析IP日志文件
  const logFilePath = resolve(__dirname, '../public/ip.txt');
  const ips = parseIPFromLog(logFilePath);
  console.log(`Found ${ips.length} IPs in the log.`);

  // 聚合IP到区域
  const regionMap = await aggregateIPRegions(ips);

  // 打印结果
  printAggregatedRegions(regionMap);
}

main().catch(console.error);
