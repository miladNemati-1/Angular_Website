//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');

const app = express();
let path = require("path");

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
const actors = require('./routers/actor');
const movies = require('./routers/movie');




app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete("/actors/:aid/:mid", actors.deleteMovieById);
app.delete("/actors/deleteplus/:id", actors.deleteMoviesById)


//Movie RESTFul  endpoints
app.get("/moviesfindx", movies.findallX);
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete("/movies/:title", movies.deleteOne);
app.delete("/movies/:year1/:year2", movies.deleteYear);

app.post("/movies/:mid/actors/:aid", movies.addActor);

