// marvel api 
function getMarvelAPI(character) {

    var requestMarvelUrl = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=1&apikey=${marvelApi}&hash=${marvelHashKey}`

    fetch(requestMarvelUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (marvel) {
        console.log('Marvel api')
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
