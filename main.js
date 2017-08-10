/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
function searching() {
  fetch(`https://itunes.apple.com/search?term=${searchTermLocation.value}`)
    .then(convertFromJson)
    .then(builtTheArray)
}

function convertFromJson(results) {
  return results.json()
}

let resultsArea = document.querySelector(".resultsArea");
let searchTermLocation = document.querySelector("#searchField")
let arrayOfSongs = [];
let searchButt = document.querySelector("#submitButton")
searchButt.addEventListener("click", searching);
let songLocation = document.querySelector("#music-player");
let videoLocation = document.querySelector("#video-player");

document.querySelector(".resultsArea").addEventListener("click", function(bananapants) {
  let lastThree = bananapants.target.value.slice(-3);
  console.log(lastThree);

  if (lastThree === "m4v") {
    videoLocation.src = bananapants.target.value;
    videoLocation.autoplay = "true";
    songLocation.style.display = "none"
    videoLocation.style.display = "block"

  } else if (lastThree === "m4a") {
    songLocation.src = bananapants.target.value;
    songLocation.autoplay = "true";
    videoLocation.style.display = "none"
    songLocation.style.display = "block"
  }
});


function builtTheArray(data) {
  resultsArea.innerHTML = "";
  arrayOfSongs = data;
  console.log(arrayOfSongs);
  for (var i = 0; i < arrayOfSongs.results.length; i++) {
    resultsArea.innerHTML += `
  <div class="song" id="song${i}">
  <img src="${arrayOfSongs.results[i].artworkUrl100}">
  <a href="${arrayOfSongs.results[i].trackViewUrl}"><h3>${arrayOfSongs.results[i].trackName}</h3></a>
  <p>${arrayOfSongs.results[i].artistName}</p>
  <button type="button" name="Button${i}" id="Button${i}" value=${arrayOfSongs.results[i].previewUrl}>Play a sample!</button>
</div>
  `

  }
}
