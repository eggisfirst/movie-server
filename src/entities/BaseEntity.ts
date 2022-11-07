import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { validate } from "class-validator";

/**
 * 抽象类，不允许实例化
 */
export abstract class BaseEntity {
  /**
   * 验证当前对象
   * skipMiss: true 编辑的时候没有传入的属性跳过验证。
   * @returns 返回错误数组。
   */
  public async validateThis(skipMiss = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMiss,
    });
    return errors.map(e => Object.values(e.constraints)).flat();
  }
  /**
   * protected 允许在类的内部及继承的子类中调用
   * 把一个平面对象转换成movie对象
   * @param plainObject 平面对象
   * @returns movie对象
   */
  protected static baseTransformer<T>(cls: ClassType<T>, plainObject: object): T {
    // 如果传入的是该类，直接返回
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject);
  }
}
