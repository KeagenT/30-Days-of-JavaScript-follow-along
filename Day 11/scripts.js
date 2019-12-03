//the container for the video and all the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
//the bar that holds the amount that's been played
const progress = player.querySelector('.progress');
//the amount that's been played so far
const progressBar = player.querySelector('.progress__filled');
//the play button "toggle"
const toggle = player.querySelector('.toggle');
//The fast forward 25s and backwards 15s buttons
const skipButtons = player.querySelectorAll('[data-skip]');
//The sliders for volume and playback speed
const ranges = player.querySelectorAll('.player__slider');

//the Function to actually play or pause the video upon doing something
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    /*if(video.paused) {
        video.play();
    }else{
        video.pause();
    }*/
}
function updateButton() {
    //If the video object is paused then the button icon is play if it's not then it's pause
    //NOTE paused property is DIFFERENT from pause event
    const icon = this.paused ? '►' : '❚❚';
    console.log(icon);
    toggle.textContent = icon;
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
//since the property that the values modify is the same as the attribute name
    video[this.name] = this.value;

}

//for this to work you must listen for the video to emit a "time update" event
function handleProgress(){
    //the visual progress is linked to a css property called flex-basis which is a percentage
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//clicking on the video object
video.addEventListener('click', togglePlay);
//clicking on the play button
toggle.addEventListener('click', togglePlay);

//add an event listener for the pause event for reasons besides clicking pause
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);
//since this is a node list/array
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
//runs scrub only if mouse is down and scrub has an event (both are true)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
//Toggles mousedown with the event
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mouseup = true);
