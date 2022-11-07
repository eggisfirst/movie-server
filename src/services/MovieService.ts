import { IMovie } from "../db/MovieSchema";
import { Movie } from "../entities/Movie";
import { MovieModel } from "../db";

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
    const errors = await movieObj.validateThis(true);
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

  public static async find(id: string): Promise<IMovie | null> {
    return MovieModel.findById(id);
  }
}
