import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const chinaTimestamp = winston.format.timestamp({
  format: () => dayjs().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss"),
});

export const winstonConfigModule = WinstonModule.forRoot({
  transports: [
    // 控制台（开发友好格式）
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(chinaTimestamp, nestWinstonModuleUtilities.format.nestLike("MyApp", { prettyPrint: true })),
    }),
    // 错误文件轮转
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD", // 日志轮换的频率，此处表示每天。
      level: "error",
      maxFiles: "30d", // 保留日志文件的最大天数，此处表示自动删除超过 30 天的日志文件。
      format: winston.format.combine(chinaTimestamp, winston.format.json()),
    }),
    // 所有日志文件轮转
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: winston.format.combine(chinaTimestamp, winston.format.json()),
    }),
  ],
});
