import "reflect-metadata";
import { MovieModel } from "./db";
import { Movie } from "./entities/Movie";
import { MovieService } from "./services/MovieService";

// function getRandom(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min) + min);
// }

// for (let index = 0; index < 100; index++) {
//   const m = new Movie();
//   m.name = "电影" + (index + 1);
//   m.areas = ["中国大陆"];
//   m.timeLong = getRandom(22, 100);
//   m.types = ["喜剧"];
//   MovieService.addMovie(m);
// }
const con: any = {
  page: 2,
  limit: 4,
  key: "2"
};
MovieService.find(con).then(res => {
  if (res.errors.length > 0) {
    console.log(res.errors);
  } else {
    res.data.forEach(m => console.log(m.name));
    // console.log(res.data, res.count);
  }
});
