// globally scoped variables
var modal = document.getElementById("welcomeModal");
var helpModal = document.getElementById("helpModal");
var aboutModal = document.getElementById("aboutModal");
var helpButton = document.getElementById("help-button");
var helpClose = document.getElementById("helpClose");
var aboutClose = document.getElementById("aboutClose");
var aboutButton = document.getElementById("about-button");
var celebList = document.getElementById("CelebrityNames");
var movieList = document.getElementById("lower-card");
var searchHistory = document.getElementById("search-history");
var celebLimit=5;

// placeholder for the default person image
placeholderImg="./assets/images/person-image.jpg"

// imdb key
var imdbKey="57df2f59f73d6513b02f8a10cd393e77"

// welcome Modal close
var span = document.getElementById("welcomeClose");

// Close modal when user clicks on the span
span.onclick = function() {
    modal.style.display = "none";
    localStorage.setItem("isFirstTime", false);
}

// When user clicks anywhere outside the modal, close the modal window.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        localStorage.setItem("isFirstTime", false);
    }
}

// Check isFirstTime key for modal request - display welcome modal if isFirstTime is true
function keyCheck() {
    if (localStorage.getItem("isFirstTime")=== null){modal.style.display="block"}
}

// invoke key check for the first time modal
keyCheck();

// Help and About Modal display controls for user click response
helpButton.onclick = function() {
    helpModal.style.display = "block";
}

helpClose.onclick = function() {
    helpModal.style.display = "none";
}

aboutButton.onclick = function() {
    aboutModal.style.display = "block";
}

aboutClose.onclick = function() {
    aboutModal.style.display = "none";
}

// function to invoke an api call using our team project key

function getOnThisDay(datearray) {
    const APIkey = "5545ff51d38bd9595e5804234560ff279eb49fe5";

    let apiRequest= `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${datearray[0]}/${datearray[1]}`
    fetch(apirequest,)

    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        let textArray=extractText(data);
        let thespArray = textArray.filter(isThespian)
        let nameArray = thespArray.map(extractName)
        clearDiv(celebList)
        clearDiv(movieList)

        for (i=0; i < celebLimit; i ++) {
            renderCelebrityNames(nameArray[i])
            getMovietitles(api=imdbKey, celeb=nameArray[i]);
        }
    })
}

// function to invoke an api call and recieve movie titles

function getMovieTitles(api,celeb) {
    let requestURL= `https://api.themoviedb.org/3/search/person?api_key=${api}&query=${celeb}`

    data = fetch(requestURL)
        .then(function (response) {
            if (!response.ok) {
                return
            }
            return response.json()
        })

        .then(function(data) {
            console.log(data)
            renderMovieName(data.results[0].known_for[0].title,
                data.results[0].known_for[0].poster_path,
                data.results[0].known_for[0].release_date,
                data.results[0].known_for[0].vote_average,
                data.results[0].known_for[0].overview,
                data.results[0].known_for[0].name,
                data.results[0].known_for[0].first_air_date,
                data.results[0].known_for[0].name
                )

                appendCelebImage(celeb,data)
        })
}

//append celeb image to main card

function appendCelebImage(celeb,data) {
    let subCard = document.querySelector("#" + celeb.replace(/\s/g, ''))
    subCard.setAttribute("style", "margin-right:20px; padding:10px")
    let img = document.createElement("img")
    if (data.results[0].profile_path) {
        img.setAttribute("src", `https://image.tmdb.org/t/p/original${data.results[0].profile_path}`)
    } else {
        img.setAttribute("src",placeholderImg)
    }
    img.setAttribute("style","width: 180px; margin-right:20px; box-shadow: 5px 5px 5px lightblue")
    subCard.appendChild(img)
}

//We tried to extract the Movie title from the celebrity api call, possibly to provide the match details in the card. research completing this if possible.
// function that extracts movie title from celebrity api call
// function extractTitle(data) {
//   // let title = data.results[0].description
//   let title = "(III) (Actress, La La Land (2016))"
//   trueTitle = title.match(/,\s(.*)\s\([0-9]*\)/i)
//   // console.log(title)
//   // console.log(trueTitle[1])
// }
// function pulls from the imdb api

//Extract text data from api call
function extractText(data) {
    let allText = Array()
    allText.length = data.births.length
    for (let i = 0; i < data.births.length; i++) {
        allText[i]=data.births[i].text
    }
    //console.log(allText)
    return allText
}

//filter for actors and actresses
function isThespian(value) {
    thesp = value.includes("actor") | value.includes("actress")
    return thesp
}

//extract name from record
function extractName(apiText) {
    let celebName=apiText.substr(0, apiText.indexOf(,));
    return celebName
}

