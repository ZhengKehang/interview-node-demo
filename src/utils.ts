import * as geoip from "fast-geoip";
import axios from "axios";
import {readFileSync} from "fs";

export async function getGeoInfo(ip: string) {
  // 首先使用 fast-geoip
  let geo = await geoip.lookup(ip);
  if (geo && geo.city) {
    return {
      ip: ip,
      country: geo.country,
      city: geo.city,
      latitude: geo.ll[0],
      longitude: geo.ll[1]
    };
  }

  // 如果 city 为 Unknown，则调用 ip-api
  const url = `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon,query`;
  const response = await axios.get(url);
  const data = response.data;
  console.log('data', data)
  if (data.status === 'success') {
    return {
      ip: data.query,
      country: data.country,
      city: data.city,
      latitude: data.lat,
      longitude: data.lon
    };
  } else {
    return null;
  }
}

// 从本地文件解析IP日志
export function parseIPFromLog(filePath: string): string[] {
  const logContent = readFileSync(filePath, 'utf-8');
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
  const ips = logContent.match(ipRegex) || [];
  return ips;
}
