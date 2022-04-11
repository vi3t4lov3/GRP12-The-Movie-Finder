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
    var marvelHashKey ='01dcb492e9aeb8c255d6ff032fac2122';
    var omdbApiKey ="77e3425e"
    var giphyApiKey = 'ngancOjMQqKMUDs0pp3lMqtR67sdDMIC'
    var character = characterEl.value.replace(/ /g, '%20').trim();
    if (character) {
        if (character == null) {
           characterEl.value = "Please eneter character" 

        } else {
        //    getOmdbApi(character, omdbApiKey); 
        //    getGiphyApi(character, giphyApiKey);
        }
        getMarvelAPI(character, marvelApi, marvelHashKey);
        
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
        // console.log(data)
        // for (var i = 0; i < data.length; i++) {
            
        // }
    })
}

function getMarvelAPI(character, marvelApi, marvelHashKey) {

    var requestMarvelUrl = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=1&apikey=${marvelApi}&hash=${marvelHashKey}`

    fetch(requestMarvelUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        for (var i = 0; i < data.data.results.length; i++) {
            var name = data.data.results[i].name
           console.log(name) 
        }
    })
}

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
        // console.log(data)
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