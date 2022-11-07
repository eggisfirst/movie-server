import { plainToClass, Type } from "class-transformer";
import { ArrayMinSize, IsInt, IsNotEmpty, Max, Min, IsArray, validate } from "class-validator";
import "reflect-metadata";

export class Movie {
  @IsNotEmpty({ message: "电影名称不能为空" })
  @Type(() => String) // 平面对象类型丢失  使用Type装饰器
  public name: string;

  @IsNotEmpty({ message: "电影类型不能为空" })
  @ArrayMinSize(1, { message: "电影类型至少有一个" })
  @IsArray({ message: "电影类型必须是数组" })
  @Type(() => String) // 平面对象类型丢失，数组检查不出来，可以直接使用数组中每一项的类型，会自动帮你转换
  public types: string[];

  @IsNotEmpty({ message: "上映地区不能为空" })
  @ArrayMinSize(1, { message: "上映地区至少有一个" })
  @IsArray({ message: "上映地区必须是数组" })
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({ message: "时长不能为空" })
  @IsInt({ message: "时长必须是整数" })
  @Min(1, { message: "时长最小1分钟" })
  @Max(9999, { message: "时长过长" })
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({ message: "是否热映不能为空" })
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({ message: "是否即将上映不能为空" })
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({ message: "是否经典影片不能为空" })
  @Type(() => Boolean)
  public isClassic: boolean = false;

  @Type(() => String)
  public description?: string;

  @Type(() => String)
  public poster?: string;
  /**
   * 验证当前对象
   * @returns 返回错误数组。
   */
  public async validateThis(skipMiss = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMiss,
    });
    return errors.map(e => Object.values(e.constraints)).flat();
  }

  /**
   * 把一个平面对象转换成movie对象
   * @param plainObject 平面对象
   * @returns movie对象
   */
  public static transformer(plainObject: object): Movie {
    if (plainObject instanceof Movie) {
      return plainObject;
    }
    return plainToClass(Movie, plainObject);
  }
}
