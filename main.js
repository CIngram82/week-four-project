let resultsArea = document.querySelector("#resultsArea");
let searchTermLocation = document.querySelector("#searchField")
let arrayOfSongs = [];
let searchButt = document.querySelector("#submitButton")
searchButt.addEventListener("click", searching);
let songLocation = document.querySelector("#music-player");
let videoLocation = document.querySelector("#video-player");
let tabArea = document.querySelector(".tabs");
let bodyArea = document.querySelector("body");
tabArea.addEventListener("click", tabChange);

function convertFromJson(results) {
  return results.json()
}


function searching() {
  fetch(`https://itunes.apple.com/search?term=${searchTermLocation.value}`)
    .then(convertFromJson)
    .then(builtTheArray)
}
function tabChange(tabClicked){
  console.log(tabClicked.target.id);
  if (tabClicked.target.id === "songTab") {
    bodyArea.className = "songs";
  }else if (tabClicked.target.id === "videoTab") {
      bodyArea.className = "videos";
  }else if (tabClicked.target.id === "podcastTab") {
    bodyArea.className = "podcasts";
  }
}

resultsArea.addEventListener("click", function(bananapants) {
  let lastThree = bananapants.target.value.slice(-3);

  if (lastThree === "m4v") {
    videoLocation.src = bananapants.target.value;
    videoLocation.autoplay = "true";
  } else if (lastThree === "m4a") {
    songLocation.src = bananapants.target.value;
    songLocation.autoplay = "true";
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
