import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorEnum } from '@/constants/error-code.constant.js';

export class BusinessException extends HttpException {
  private errCode: number;

  constructor(error: ErrorEnum | string) {
    const colonIndex = error.indexOf(':');
    const potentialCode = colonIndex > -1 ? error.slice(0, colonIndex) : '';
    // 判断是否符合 ErrorEnum 的格式（存在冒号且冒号前为有效数字）
    const isEnumFormat =
      colonIndex > -1 &&
      !isNaN(Number(potentialCode)) &&
      potentialCode.trim() !== '';

    // 如果是非 ErrorEnum (不包含冒号，或者冒号前不是数字)
    if (!isEnumFormat) {
      super(
        HttpException.createBody({
          code: ErrorEnum.SERVER_ERROR?.split(':')[0], // 比如 500
          message: error, // 普通的字符串，如 "余额不足"
        }),
        HttpStatus.OK, // HTTP 状态码始终返回 200 OK
      );
      this.errCode = Number(ErrorEnum.SERVER_ERROR?.split(':')[0]);
      return;
    }

    // 如果是 ErrorEnum (包含冒号 ':' 且前缀为数字)
    const code = potentialCode;
    const message = error.slice(colonIndex + 1); // 截取第一个冒号后的全部内容，避免截断后续冒号
    super(
      HttpException.createBody({
        code,
        message,
      }),
      HttpStatus.OK,
    );

    this.errCode = Number(code);
  }

  getErrorCode(): number {
    return this.errCode;
  }
}
