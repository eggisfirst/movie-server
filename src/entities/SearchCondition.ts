import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity {
  @IsInt({ message: "页码必须是一个整数" })
  @Min(1, { message: "页码最小值为1" })
  @Type(() => Number)
  public page: number = 1;

  @IsInt({ message: "页容量必须是一个整数" })
  @Min(1, { message: "页容量最小值为1" })
  @Type(() => Number)
  public limit: number = 10;

  @Type(() => String)
  public key: string = "";

  /**
   * 把一个平面对象转换成movie对象，调用父类的方法简化
   * @param plainObject 平面对象
   * @returns movie对象
   */
  public static transformer(plainObject: object): SearchCondition {
    return super.baseTransformer(SearchCondition, plainObject);
  }
}
