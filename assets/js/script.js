// Universal variables for all functions
var characterEl = document.querySelector('#character')
var searchButton = document. getElementById('search-button');
var characterSearchEL = document.querySelector('#search-form')
var gif = document.getElementById('gif-table');
var outputEl = document.querySelector('#actors')
var outputPosterEl = document.getElementById('#movie=card');
var ratingEl = document.getElementById('#rating');


var formSubmitHandler = function(event) {
    event.preventDefault();
    var marvelApi = "8dab1b84220523126c00f0c92d4bcb32";
    var omdbApiKey ="77e3425e"
    var giphyApiKey = 'ngancOjMQqKMUDs0pp3lMqtR67sdDMIC'
    var character = characterEl.value.trim();
    if (character) {
        if (character == null) {
           characterEl.value = "Please eneter character" 

        } else {
           getOmdbApi(character, omdbApiKey); 
           getGiphyApi(character, giphyApiKey);
        }
        // getMarvelAPI(character, marvelApi);
        
    }
}
// call API for GIF, side column
function getGiphyApi(character, giphyApiKey) {
    var requestGiphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${character}&limit=25&offset=0&rating=g&lang=en`

    fetch(requestGiphyApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // for (var i = 0; i < data.length; i++) {
            
        // }
    })
}

// Marvel API for bio
function getMarvelAPI(marvelApi) {
    var requestMarvelUrl = `https://gateway.marvel.com/v1/public/characters?name=character&apikey=${marvelApi}`
    
    // console.log(requestMarvelUrl)

    fetch(requestMarvelUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        // for (var i = 0; i < data.length; i++) {
            
        // }
    })
}


// OMDB API for media
function getOmdbApi(character, apikey) {
    // two url required for character information and movie posters/pictures, both OMDb
var requestOmdbUrl = `http://www.omdbapi.com/?t=${character}&apikey=77e3425e`;
//  var requestOmdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&`;
 var requestPosterOmdbURL = 'http://img.omdbapi.com/?i=tt3896198&h=600&apikey=7b42330f';
    console.log(requestOmdbUrl)
    // console.log(requestPosterOmdbURL)

    fetch(requestOmdbUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var characterName = data.Title;
        var posterImg = data.Poster;
        var ratingList = data.Ratings;

        // console.log(posterImg)
        // outputEl.innerHTML = characterName;
        // outputPosterEl.innerHTML = `<img src="${posterImg}">`;
        // console.log(outputPosterEl)
        
    $('#actors').append(characterName);
    $('#poster').append(`<img src='${posterImg}'>`);
    $('#rating').append(ratingList);
    
    })

}

characterSearchEL.addEventListener('submit', formSubmitHandler)