/**
 * 抛异常工具类
 */
export class ThrowUtils {
  /**
   * 条件成立则抛出异常
   * @param condition 判断条件
   * @param error 异常对象
   */
  static throwIf(condition: any, error: Error): void {
    if (condition) {
      throw error;
    }
  }
}
