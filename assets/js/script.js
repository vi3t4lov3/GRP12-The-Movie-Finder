// Universal variables for all functions
var characterEl = document.querySelector('#character')
var searchButton = document. getElementById('search-button');
var characterSearchEL = document.querySelector('#search-form')
var gif = document.getElementById('#gif-column');
var outputEl = document.querySelector('#actors')
var outputPosterEl = document.getElementById('#movie=card');
var ratingEl = document.getElementById('#rating');
//golbal variables
var marvelApi = '8dab1b84220523126c00f0c92d4bcb32';
var marvelHashKey ='01dcb492e9aeb8c255d6ff032fac2122';
var omdbApiKey ='77e3425e';
var giphyApiKey = 'ngancOjMQqKMUDs0pp3lMqtR67sdDMIC';
var tmdbpiKey = '048b1b9e7d22100a1f7a619469d30c91';

//handler the search button form
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
            theMoviedbApi(character);
            $('#movie-details').empty();  
        }
        
    }
}

// call API for GIF, side column
function theMoviedbApi(character) {
    var requestTMDBApi = `https://api.themoviedb.org/3/search/person?api_key=${tmdbpiKey}&query=${character}`

    fetch(requestTMDBApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(TMDB)
        var profileId = data.results[0].id
        getCharacterProfile(profileId) 
        // console.log(profileId);
    })
}
function getCharacterProfile(profileId) {
    var url = `https://api.themoviedb.org/3/person/${profileId}?api_key=${tmdbpiKey}&language=en-US`

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (tmdb) {
        $('#character-bio').empty();
        console.log(tmdb)
        var profileImg = `https://www.themoviedb.org/t/p/w1280/${tmdb.profile_path}`
        for (var i = 0; i < tmdb.also_known_as.length; i++) {
            var otherName = tmdb.also_known_as[i];
            // console.log(profileImg)
        }
        $('#character-bio').append(`
           <div> <img src="${profileImg}"></div>
            <div>
                <h1>Name: ${tmdb.name}</h1>
                <p>Biography: ${tmdb.biography}</p>
                <p>Birthday: ${tmdb.birthday}</p>
                <p>Place of birth: ${tmdb.place_of_birth}</p>
                <p>${tmdb.known_for_department}</p>
                <p>Also know as: ${otherName}</p>
        </div> 
        `)
    })
}


// call API for GIF, side column
function getGiphyApi(character) {
    var requestGiphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${character}&limit=3&offset=0&rating=g&lang=en`

    fetch(requestGiphyApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (giphy) {
        $('#giphy-gif').empty();
        // console.log(giphy)
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
        var data = marvel.data.results[0];
        var marvelCharacterImg = `${data.thumbnail.path}.jpg`;
        $('#marvel-info').empty()
        $('#marvel-info').append(`
           <div class="marvel-img">
                <img src='${marvelCharacterImg}'>
            </div>
            <div>
                <h3>Name: ${data.name}</h3>
                <p id="marvel-character-bio">${data.description}</p>
                <p id="marvel-comics">Comic Available: ${data.comics.available}</p>
                <p id="marvel-series">Seriesl Available: ${data.series.available}</p>
                <p id="marvel-stories">Stories Available: ${data.stories.available}</p>
        </div> 
        `)
    })
}

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
    })
}
//display the list of array from the OMDB database
function displayMovieList(movies) {
    $('#list-item').empty()
    for (var i = 0; i < movies.length; i++) {
        var movieListItem = movies[i].imdbID;
        var moviePoster = movies[i].Poster;
        // console.log(movieListItem);
        $('#list-item').append(`<div onclick="loadMovieDetail('${movieListItem}')" class = 'search-item-thumbnail'><p>${movies[i].Title}</p><img src='${moviePoster}' /><p>${movies[i].Year}</p></div>
        `);
    }
}

//fetch the detail movie form the search list & display
function loadMovieDetail(movieId) {
    var movieDetailUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=${omdbApiKey}`;
    fetch(movieDetailUrl)
    .then(function (response) {
        // console.log(response)
        return response.json();
    })
    .then(function (details) {
        console.log(details)
        $('#movie-details').empty(); 
        $('#movie-details').append(`
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