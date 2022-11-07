import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

export interface IMovie extends Movie, Mongoose.Document { }

const movieSchema = new Mongoose.Schema<IMovie>({
  areas: [String],
  name: String,
  types: [String],
  timeLong: Number,
  isHot: Boolean,
  isComing: Boolean,
  isClassic: Boolean,
  description: String,
  poster: String,
}, {
  versionKey: false,
});
export default Mongoose.model<IMovie>("Movie", movieSchema);
