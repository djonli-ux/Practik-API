let searchButton =  document.getElementById('search-btn')
let searchBar = document.getElementById('search-bar')
let show = document.querySelector('#show')

searchButton.addEventListener('click', (e) =>{
    showItunesData()
})


const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}


function showItunesData(){
    let link = 'https://itunes.apple.com/search?term='+ searchBar.value;
    
   
    fetch(link)
    .then(data => data.json() )
    .then(json => {
        console.log(json)  
        let finalHTML = ''
        
        json.results.forEach( track => {
          
            finalHTML +=

    `
    <div id="block">
        <div id="picture">
            <img src="${track.artworkUrl100}" alt="" srcset="">
        </div>

        <div id="grid-input">
            <div id="input-item">${track.artistName}</div>
            <div id="input-item">${track.trackCensoredName}</div>
            <div id="input-item">${track.collectionName}</div>
            <div id="input-item">${track.primaryGenreName}</div>
        </div>

        <div id="details">
            <span id="pls-btn"><i class="fa-solid fa-plus"></i></span>
        </div>
    </div>

    <div id="track-details" hidden>
        <h2>${track.trackCensoredName} -${track.trackCensoredName} <i class="fa-solid fa-music"></i> </h2>
        
        <div id="column">
            <ul>
                <li><b>Collection:</b> ${track.collectionName}</li>
                <li><b>Track count:</b> ${track.trackCount}</li>
                <li><b>Price:</b> ${track.collectionPrice} USD</li>
            </ul>
        </div>

        <div id="column">
            <ul>
                <li><b>Track duration:</b> ${millisToMinutesAndSeconds(track.trackTimeMillis)}</li>
                <li><b>Track price:</b> ${track.trackPrice} USD</li>
            </ul>
        </div>
    </div>
    `  
        });
        show.innerHTML = finalHTML
        const btnPlus = document.querySelectorAll('#pls-btn');

        const showDetails=(e)=>{
            const element = e.target;
            const trackDetails = element.closest('#block').nextElementSibling;
            trackDetails.hidden = !trackDetails.hidden;
            element.closest('#pls-btn').classList.toggle('opened');
        }

        btnPlus.forEach(btn => btn.addEventListener('click', showDetails));
    })
    .catch(error => console.log(error))
}

