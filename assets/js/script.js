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
            // getOmdbApi(character); 
            getGiphyApi(character);
            theMovieDbSearch(character)
            // getTheMoviedpAPIs(character)
            // searchMovieInfo (character)
            // $('#movie-details').empty();  
        }
        
    }
}


// BEGIN THE themoviedb.org API
// function to search for person (character) from themoviedb.org
function getTheMoviedpAPIs(character) {
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
    })
}
//this function to get the detail profile of character by using the id above
function getCharacterProfile(profileId) {
    var url = `https://api.themoviedb.org/3/person/${profileId}?api_key=${tmdbpiKey}&language=en-US`

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $('#character-bio').empty();
        // console.log(data)
        var profileImg = `https://www.themoviedb.org/t/p/w1280/${data.profile_path}`
        var names = ''
        for (var i = 0; i < data.also_known_as.length; i++) {
            var otherName = data.also_known_as[i];
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
                <h1>Name: ${data.name}</h1>
                <p>Biography: ${data.biography}</p>
                <p>Birthday: ${data.birthday}</p>
                <p>Place of birth: ${data.place_of_birth}</p>
                <p>${data.known_for_department}</p>
                <p>Also know as: </p>
                <ul>${names}</ul>
            </div> 
        `)
    })
}
// this function to get the social media link for character from the Id
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

// this function to get the movie relate with the character
function getmovie (profileId) {
    var url = `https://api.themoviedb.org/3/person/${profileId}/movie_credits?api_key=${tmdbpiKey}&language=en-US`
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data.cast[0].id)

        for (var i = 0; i < data.cast.length; i++) {
            var castPoster = data.cast[i].poster_path;
            // console.log(data.cast[0].id)
            $('#character-cast').append(`<div class="list-item"><p>${data.cast[i].title}</p><img src='https://www.themoviedb.org/t/p/w1280/${castPoster}' /><p>${data.cast[i].release_date}</p></div>
        `);
        }
    })  
}

// this function to Search Person, Movie, Tvshow... from themoviedb.org
function theMovieDbSearch(character) {
    var url = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbpiKey}&language=en-US&query=${character}&page=1&include_adult=false`
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log('search multi')
        // console.log(data);
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].media_type == 'movie') {
                $('#character-bio').empty();
                // displayMovieDetail(data.results[i].id);
                for (var i = 0; i < data.results.length; i++) {
                    // var movieId = data.results[i].id;
                    var moviePoster = data.results[i].poster_path;
                    $('#movie-search-display').append(`
                    <div class="row">
                            <div class="columns medium-6 large-4" onclick="loadTheMovieDetail('${data.results[i].id}')" class = 'movie-poster'>
                                <img src = 'https://www.themoviedb.org/t/p/w1280/${moviePoster}'>
                            </div>
                            <div class="columns medium-6 large-8">
                                <h3 class = 'movie-title'>Movie: ${data.results[i].title}</h3>
                                <ul class = 'movie-misc-info'>
                                    <li class = 'rated'>Ratings: ${data.results[i].vote_average}</li>
                                    <li class = 'rated'>People Voted: ${data.results[i].vote_count}</li>
                                    <li class = 'released'>Released: ${data.results[i].release_date}</li>
                                </ul>
                                <p class = 'plot'><b>Overview:</b> ${data.results[i].overview}</p>
                                <p class = 'language'><b>Language:</b> ${data.results[i].original_language}</p>
                                <p><a href = 'https://www.themoviedb.org/movie/${data.results[i].id}' target = '_blank'>View The Detail</a></p>
                            </div>
                    </div>
                    `)
                }
            }
        }
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].media_type == 'person') {
                $('#movie-search-display').empty();
            // console.log('by name')
            // console.log(data.results[i].name)
            getTheMoviedpAPIs(character)
        }
        }
        
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].media_type == 'tv') {
            var moviePoster = data.results[i].poster_path;
            $('#tvshow-search-display').append(`
            <div class='row tv-search-display'>
                <div class="columns medium-6 large-8">
                <h3 class = 'movie-title'>TV Show: ${data.results[i].original_name}</h3>
                <ul class = 'movie-misc-info'>
                    <li class = 'rated'>Ratings: ${data.results[i].vote_average}</li>
                    <li class = 'rated'>People Voted: ${data.results[i].vote_count}</li>
                    <li class = 'released'>Released: ${data.results[i].first_air_date}</li>
                </ul>
                <p class = 'plot'><b>Overview:</b> ${data.results[i].overview}</p>
                <p class = 'language'><b>Language:</b> ${data.results[i].original_language}</p>
                <p><a href = 'https://www.themoviedb.org/tv/${data.results[i].id}' target = '_blank'>View The Detail</a></p>
                </div>
                <div class="columns medium-6 large-4" onclick="loadTheTvShowDetail('${data.results[i].id}')" class = 'movie-poster'>
                    <img src = 'https://www.themoviedb.org/t/p/w1280/${moviePoster}'>
                </div>
            </div>
            `)
        }
        }
    });
}

//load & play the Movie trial 
function loadTheMovieDetail(movieId) {
    var movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbpiKey}&language=en-US`;
    fetch(movieDetailUrl)
    .then(function (response) {
        // console.log(response)
        return response.json();
    })
    .then(function (data) {
        // console.log(data.results[0].key)
        $('#media-player').append(`
        <div class="video">
        <div class="overlay">
        <iframe width="420" height="315" src="https://www.youtube.com/embed/${data.results[0].key}"></iframe>
        </div>
        `)
})
}

//load & play the TV Show trial 
function loadTheTvShowDetail(movieId) {
    var movieDetailUrl = `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${tmdbpiKey}&language=en-US`;
    fetch(movieDetailUrl)
    .then(function (response) {
        // console.log(response)
        return response.json();
    })
    .then(function (data) {
        // console.log(data.results[0].key)
        $('#media-player').append(`
        <div class="video">
        <div class="overlay">
        <iframe width="420" height="315" src="https://www.youtube.com/embed/${data.results[0].key}"></iframe>
        </div>
        `)
})
}



// END THE themoviedb.org API

// BEGIN GIPHY API
// function call API for GIF
function getGiphyApi(character) {
    var requestGiphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${character}&limit=5&offset=0&rating=g&lang=en`

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
// END GIPHY API

//BEGIN MARVEL API



// BEGIN OMDB API
// Function get OMDB API data
function getOmdbApi(character) {
var requestOmdbUrl = `https://omdbapi.com/?s=${character}&page=1&apikey=${omdbApiKey}`;
    // console.log(requestOmdbUrl)
    fetch(requestOmdbUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        displayMovieList(data.Search); //display the movies on the list
    })
}

characterSearchEL.addEventListener('submit', formSubmitHandler)


//display the list of array from the OMDB database
// function displayMovieList(movies) {
//     $('#list-item').empty()
//     for (var i = 0; i < movies.length; i++) {
//         var movieListItem = movies[i].imdbID;
//         var moviePoster = movies[i].Poster;
//         console.log(movieListItem);
//         $('#list-item').append(`<div onclick="loadMovieDetail('${movieListItem}')" class = 'search-item-thumbnail'><p>${movies[i].Title}</p><img src='${moviePoster}' /><p>${movies[i].Year}</p></div>

//         `);
//     }
// }

//fetch the detail movie form the search list & display from OMBDdata
// function loadMovieDetail(movieId) {
//     var movieDetailUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=${omdbApiKey}`;
//     fetch(movieDetailUrl)
//     .then(function (response) {
//         // console.log(response)
//         return response.json();
//     })
//     .then(function (movieDetails) {
//         console.log('Movie details from OMDB')
//         console.log(movieDetails)
//         $('#movie-details').empty(); 
//         $('#movie-details').append(`
//             <div class = 'movie-poster'>
//                 <img src = '${(movieDetails.Poster != 'N/A') ? movieDetails.Poster : 'image_not_found.png'}' alt = 'movie poster'>
//             </div>
//             <div>
//                 <h3 class = 'movie-title'>${movieDetails.Title}</h3>
//                 <ul class = 'movie-misc-info'>
//                     <li class = 'year'>Year: ${movieDetails.Year}</li>
//                     <li class = 'rated'>Ratings: ${movieDetails.Rated}</li>
//                     <li class = 'released'>Released: ${movieDetails.Released}</li>
//                 </ul>
//                 <p class = 'genre'><b>Genre:</b> ${movieDetails.Genre}</p>
//                 <p class = 'writer'><b>Writer:</b> ${movieDetails.Writer}</p>
//                 <p class = 'actors'><b>Actors: </b>${movieDetails.Actors}</p>
//                 <p class = 'plot'><b>Plot:</b> ${movieDetails.Plot}</p>
//                 <p class = 'language'><b>Language:</b> ${movieDetails.Language}</p>
//                 <p class = 'awards'><b><i class = 'fas fa-award'></i></b> ${movieDetails.Awards}</p>
//             </div>
//         `)
// })
// }

