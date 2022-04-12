// Universal variables for all functions
var characterEl = document.querySelector('#character')
var searchButton = document. getElementById('search-button');
var characterSearchEL = document.querySelector('#search-form')
var gif = document.getElementById('gif-table');
var outputEl = document.querySelector('#actors')
var outputPosterEl = document.getElementById('#movie=card');
var ratingEl = document.getElementById('#rating');

//golbal variables
var marvelApi = "8dab1b84220523126c00f0c92d4bcb32";
var marvelHashKey ='01dcb492e9aeb8c255d6ff032fac2122';
var omdbApiKey ="77e3425e"
var giphyApiKey = 'ngancOjMQqKMUDs0pp3lMqtR67sdDMIC'

//handler the search button
var formSubmitHandler = function(event) {
    event.preventDefault();
    var character = characterEl.value.replace(/ /g, '%20').trim();
    if (character) {
        if (character == null) {
           characterEl.value = "Please eneter character" 

        } else {
            getMarvelAPI(character);
            getOmdbApi(character); 
            getGiphyApi(character);
        }
        
    }
}
// call API for GIF, side column
function getGiphyApi(character) {
    var requestGiphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${character}&limit=25&offset=0&rating=g&lang=en`

    fetch(requestGiphyApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (giphy) {
        console.log(giphy)
        for (var i = 0; i < giphy.data.length; i++) {
            var giphygif = giphy.data[i].images.original.url
            // console.log(giphygif)
            $('#giphy-gif').append(`<img src="${giphygif}">`)
        }
    })
}

function getMarvelAPI(character) {

    var requestMarvelUrl = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=1&apikey=${marvelApi}&hash=${marvelHashKey}`

    fetch(requestMarvelUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (marvel) {
        // console.log(marvel);
        var data = marvel.data.results[0]
        var marvelCharacterImg = `${data.thumbnail.path}.jpg`
        $('#marvel-character-name').append(data.name);
        $('#marvel-character-img').append(`<img src='${marvelCharacterImg}'>`);
        $('#marvel-character-bio').append(data.description);
        $('#marvel-comics').append(`Comic Available: <a href="${data.comics.collectionURI}" target="_blank"> ${data.comics.available} </a>`);
        $('#marvel-series').append(`Series Available: ${data.series.available}`);
        $('#marvel-stories').append(`Storie Available: ${data.stories.available}`);
    })
}
dskljsdl

//list of 20 characters from database
// function getMarvelAPI(character, marvelApi) {

//     var requestMarvelUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=8dab1b84220523126c00f0c92d4bcb32&hash=01dcb492e9aeb8c255d6ff032fac2122`

//     fetch(requestMarvelUrl)
//     .then(function (response) {
//         // console.log(response)
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//         for (var i = 0; i < data.data.results.length; i++) {
//             var name = data.data.results[i].name
//            console.log(name) 
//         }
//     })
// }


// OMDB API for media
function getOmdbApi(character) {
var requestOmdbUrl = `https://omdbapi.com/?s=${character}&page=1&apikey=${omdbApiKey}`;
    // console.log(requestOmdbUrl)
    fetch(requestOmdbUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (OMBDdata) {
        // console.log(OMBDdata)
        displayMovieList(OMBDdata.Search); //display the movies on the list
    //     var characterName = data.Title;
    //     var posterImg = data.Poster;
    //     var ratingList = data.Ratings;
    // $('#actors').append(characterName);
    // $('#poster').append(`<img src='${posterImg}'>`);
    // $('#rating').append(ratingList);
    })
}
//display the list of array from the OMDB database
function displayMovieList(movies) {
    for (var i = 0; i < movies.length; i++) {
        var movieListItem = movies[i].imdbID;
        var moviePoster = movies[i].Poster;
        // console.log(movieListItem);
        $('#search-list').append(`<div onclick="loadMovieDetail('${movieListItem}')" class = 'search-item-thumbnail'> <img src='${moviePoster}' /></div>
        <div class = 'search-item-info'> <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
        `);
    }
}

//fetch the detail movie form the search list & display
function loadMovieDetail(movieId) {
    var movieDetailUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=${omdbApiKey}`;
    fetch(movieDetailUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (details) {
        // console.log(details)
        $('#search-list-item').append(`
            <div class = 'movie-poster'>
                <img src = '${(details.Poster != 'N/A') ? details.Poster : 'image_not_found.png'}' alt = 'movie poster'>
            </div>
            <div>
                <h3 class = 'movie-title'>${details.Title}</h3>
                <ul class = 'movie-misc-info'>
                    <li class = 'year'>Year: ${details.Year}</li>
                    <li class = 'rated'>Ratings: ${details.Rated}</li>
                    <li class = 'released'>Released: ${details.Released}</li>
                </ul>
                <p class = 'genre'><b>Genre:</b> ${details.Genre}</p>
                <p class = 'writer'><b>Writer:</b> ${details.Writer}</p>
                <p class = 'actors'><b>Actors: </b>${details.Actors}</p>
                <p class = 'plot'><b>Plot:</b> ${details.Plot}</p>
                <p class = 'language'><b>Language:</b> ${details.Language}</p>
                <p class = 'awards'><b><i class = 'fas fa-award'></i></b> ${details.Awards}</p>
            </div>
        `)
})
}
characterSearchEL.addEventListener('submit', formSubmitHandler)