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
            // getMarvelAPI(character);
            getOmdbApi(character); 
            getGiphyApi(character);
            theMoviedbApi(character);
            searchMovieInfo (character)
            // $('#movie-details').empty();  
        }
        
    }
}

// theMoviedbApi
function theMoviedbApi(character) {
    var requestTMDBApi = `https://api.themoviedb.org/3/search/person?api_key=${tmdbpiKey}&query=${character}`

    fetch(requestTMDBApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(TMDB)
        var profileId = data.results[0].id
        getCharacterProfile(profileId) ;
        getSocial(profileId) ;
        getmovie (profileId)
        // console.log(profileId);
    })
}
//the movie db getCharacterProfile
function getCharacterProfile(profileId) {
    var url = `https://api.themoviedb.org/3/person/${profileId}?api_key=${tmdbpiKey}&language=en-US`

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (tmdb) {
        $('#character-bio').empty();
        // console.log(tmdb)
        var profileImg = `https://www.themoviedb.org/t/p/w1280/${tmdb.profile_path}`
        var names = ''
        for (var i = 0; i < tmdb.also_known_as.length; i++) {
            var otherName = tmdb.also_known_as[i];
            names += `<li>${otherName}</li>\n`;
        }
        $('#character-bio').append(`
            <div> 
                <img src="${profileImg}">
                <div class="social-link">
                    <p id="facebook"></p>
                    <p id="twitter"></p>
                    <p id="instagram"></p>
                </div>
            </div>
            <div>
                <h1>Name: ${tmdb.name}</h1>
                <p>Biography: ${tmdb.biography}</p>
                <p>Birthday: ${tmdb.birthday}</p>
                <p>Place of birth: ${tmdb.place_of_birth}</p>
                <p>${tmdb.known_for_department}</p>
                <p>Also know as: </p>
                <ul>${names}</ul>
            </div> 
        `)
    })
}

// the movie db get extra social media link
function getSocial (profileId) {
    var url = `https://api.themoviedb.org/3/person/${profileId}/external_ids?api_key=${tmdbpiKey}&language=en-US`
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // $('#character-bio').empty();
        // console.log(data)
        if (data.facebook_id) {
            $('#facebook').append(`
            <a href="https://www.facebook.com/${data.facebook_id}" target="_blank"><i class="fab fa-facebook" alt="facebook icon"></i></a>
            `)    
        }
        if (data.twitter_id) {
        $('#twitter').append(`
            <a href="https://twitter.com/${data.twitter_id}" target="_blank"><i class="fab fa-twitter" alt="twitter icon"></i></a>
            `)    
        }
        if (data.instagram_id) {
            $('#instagram').append(`
            <a href="https://instagram.com/${data.instagram_id}" target="_blank"><i class="fab fa-instagram" alt="instagram icon"></i></a>
            `)
        }
        
    })  
}

// the movie db get movie
function getmovie (profileId) {
    var url = `https://api.themoviedb.org/3/person/${profileId}/movie_credits?api_key=${tmdbpiKey}&language=en-US`
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        for (var i = 0; i < data.cast.length; i++) {
            var castPoster = data.cast[i].poster_path;
            // console.log(castPoster)
            $('#character-cast').append(`<div><p>${data.cast[i].title}</p><img src='https://www.themoviedb.org/t/p/w1280/${castPoster}' /><p>${data.cast[i].release_date}</p></div>
        `);
        }
    })  
}
//search by the movie tittle by
function searchMovieInfo (character) {
    var url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbpiKey}&language=en-US&query=${character}&page=1&include_adult=false`
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) { 
        $('#movie-search-display').empty();
        // console.log(data)
        for (var i = 0; i < data.results.length; i++) {
            var movieId = data.results[i].id;
            console.log(movieId)
            // getVideoLink(themovieId)
            var moviePoster = data.results[i].poster_path;
            $('#movie-search-display').append(`
            <div class='movie-results'>
                <div class = 'movie-poster'>
                    <img src = 'https://www.themoviedb.org/t/p/w1280/${moviePoster}'>
                </div>
                <div class ='movie-detail'>
                    <h3 class = 'movie-title'>${data.results[i].title}</h3>
                    <ul class = 'movie-misc-info'>
                        <li class = 'rated'>Ratings: ${data.results[i].vote_average}</li>
                        <li class = 'rated'>People Voted: ${data.results[i].vote_count}</li>
                        <li class = 'released'>Released: ${data.results[i].release_date}</li>
                    </ul>
                    <p class = 'plot'><b>Overview:</b> ${data.results[i].overview}</p>
                    <p class = 'language'><b>Language:</b> ${data.results[i].original_language}</p>
                </div>
            </div>
            `)
        }
    })  
}

// get video from the movie id
function getVideoLink(themovieId) {
    var url = `https://api.themoviedb.org/3/movie/${themovieId}/videos?api_key=048b1b9e7d22100a1f7a619469d30c91&language=en-US`
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
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
        console.log(marvel);
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

//fetch the detail movie form the search list & display from OMBDdata
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
