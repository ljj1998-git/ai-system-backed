import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import dayjs from 'dayjs';
import 'dayjs/plugin/timezone.js';
import _ from 'lodash';

@Injectable()
export class CreatorPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const user = this.request.user;

    value.createBy = _.toNumber(user.userId);
    // MySQL DATETIME 存储驱动序列化 Date 的 UTC 字面值，偏移 +8h 使 UTC 表示等于东八区本地时间
    value.createTime = dayjs().toDate();

    return value;
  }
}
