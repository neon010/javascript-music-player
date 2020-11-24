let songsImage = document.getElementById("songsImage");
let songsName = document.getElementById("song-name");
let songSlider = document.getElementById("seekSlider");
let currentTime = document.getElementById("time-spent");
let duration = document.getElementById("song-duration");
let playOrPaused = document.getElementById("playOrPause");
let volumeSlider = document.getElementById("volume");
let volumeIcon = document.getElementById("volumeIcon");
let likeIcon = document.getElementById("like");
let musicPlayer = document.getElementById("music-player");


let state = true;

let song = new Audio();
let currentSongIndex = 0;
window.onload = playSongs;


function playSongs(){
    song.src = songsDetails[currentSongIndex].audioSrc;
    songsImage.src = songsDetails[currentSongIndex].imageSrc;
    songsName.textContent = songsDetails[currentSongIndex].title;
    song.play();
    setTimeout(showDuration, 500);
}
setInterval(updateSongSlider, 1000);

function updateSongSlider(){
    let c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c).min + ":" + convertTime(c).sec;
    if(song.ended){
        next();
    }
}
function convertTime(secs){
    let min = Math.floor(secs/60);
    let sec = secs % 60;
    min = (min < 10) ? "0"+min: min; 
    sec = (sec < 10)? "0"+sec: sec;
    return {min, sec};
}
function showDuration(){
    let d = Math.floor(song.duration);
    songSlider.setAttribute("max", d);
    duration.textContent = convertTime(d).min + ":" + convertTime(d).sec;
}
function playOrPause(){
    if(song.paused){
        song.play();
        playOrPaused.className = "fas fa-pause";
    }else{
        song.pause();
        playOrPaused.className = "fas fa-play";
    }
}

function next(){
    currentSongIndex++; 
    currentSongIndex = (currentSongIndex > songsDetails.length-1) ? 0 : currentSongIndex;
    playSongs();
}

function previous(){
    currentSongIndex--;
    currentSongIndex = (currentSongIndex < 0) ? songsDetails.length-1: currentSongIndex;
    playSongs();
}
function seekSong(){
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime).min + ":" + convertTime(song.currentTime).sec;
    console.log("its works");
}

function adjustVolume(){
    song.volume = volumeSlider.value/100;
    if(song.volume == 0) {
        volumeIcon.className = "fas fa-volume-mute";
    }else{
        volumeIcon.className = "fas fa-volume-up";
    }
}
function like(){
    if(state){
        likeIcon.className = "fas fa-heart";
        likeIcon.style.color = "red";
        state = false; 
    }else{
        likeIcon.className = "far fa-heart";
        state = true;
    }
}
function repeatSong(){
    if(song.loop){
        song.loop = false;
    }else{
        song.loop = true;
    }
}

function shufleSongs(){
    console.log("shufle Songs");
    currentSongIndex = Math.floor(Math.random() * songsDetails.length);
    song.src = songsDetails[currentSongIndex].audioSrc;
    songsImage.src = songsDetails[currentSongIndex].imageSrc;
    songsName.textContent = songsDetails[currentSongIndex].title;
    song.play();
}