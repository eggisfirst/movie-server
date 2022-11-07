import { IMovie } from "../db/MovieSchema";
import { Movie } from "../entities/Movie";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";

export class MovieService {
  public static async addMovie(movie: Movie): Promise<IMovie | string[]> { // 返回imovie或者错误信息
    // 1. 转换类型
    movie = Movie.transformer(movie);
    // 2. 数据验证
    const errors = await movie.validateThis();
    // 3. 添加到数据库
    if (errors.length > 0) {
      return errors;
    }
    return MovieModel.create(movie);
  }

  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1. 转换类型
    const movieObj = Movie.transformer(movie);
    // 2. 数据验证
    const errors = await movieObj.validateThis(true);  // 如果直接使用movie验证，有默认值
    // 3. 添加到数据库
    if (errors.length > 0) {
      return errors;
    }
    await MovieModel.updateOne({ _id: id }, movie);
    return errors;
  }

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id });
  }

  public static async findById(id: string): Promise<IMovie | null> {
    return MovieModel.findById(id);
  }

  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
    // 1. 转换类型
    const conObj = SearchCondition.transformer(condition);
    // 2. 数据验证
    const errors = await conObj.validateThis();
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors,
      };
    }
    const result = await MovieModel.find({
      name: { $regex: new RegExp(conObj.key) },
    }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
    const count = await MovieModel.find({
      name: { $regex: new RegExp(conObj.key) },
    }).countDocuments();
    return {
      count,
      data: result,
      errors: [],
    };
  }
}
