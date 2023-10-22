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