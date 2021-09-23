import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  Movietitle: string = "";
  Movieyear: number = 0;
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item: { name: string; bYear: number; _id: string; }) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item: { _id: string; }) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  onDeleteMovie(title: string) {
    this.dbService.deleteMovie(title).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovieBetweenYears(year1: string, year2: string) {
    this.dbService.deleteMovieByYear(year1, year2).subscribe(result => {
      this.onGetMovies();
    });
  }

  onAddActor(movieId: any,actorId: any){
    console.log(movieId);
    console.log(actorId);
    this.dbService.addActor(movieId, actorId).subscribe(result => {
      this.onGetMovies();
    });

  }

  onSaveMovie() {
    let obj = { title: this.Movietitle, year: this.Movieyear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });

  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }
  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.Movietitle = "";
    this.Movieyear = 0;
  }
}