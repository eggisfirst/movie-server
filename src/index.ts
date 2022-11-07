import "reflect-metadata";
import { MovieModel } from "./db";
import { Movie } from "./entities/Movie";
import { MovieService } from "./services/MovieService";

const m: any = {};

MovieService.find("63688ac07d9b061ef56ad2ba").then(result => {
  console.log(result);
});
