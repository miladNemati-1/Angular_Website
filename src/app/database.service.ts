import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }

  getMovies() {
    return this.http.get("/movies");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }
  createMovie(data: any) {
    return this.http.post("/movies", data, httpOptions);
  }
  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteMovie(title: string) {
    let url = "/movies/" + title;
    return this.http.delete(url, httpOptions);
  }

  deleteMovieByYear(year1: string, year2: string) {
    let url = "/movies/" + year1 + "/" + year2;
    console.log(url);
    return this.http.delete(url, httpOptions);
  }

  addActor(movieId: any,actorId: any){
    let url = "/movies/" + movieId+ "/actors/" + actorId
    console.log(url);

    return this.http.post(url, httpOptions)
  }
}