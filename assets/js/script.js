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

keyCheck();

