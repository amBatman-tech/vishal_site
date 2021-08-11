const app = () =>{

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');


    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //get length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //play sound(
    play.addEventListener('click', () => {
        checkIfPlaying(song);

    });

    //select different sound

    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkIfPlaying(song);
        });
    });


    //select time duration

    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)} :${Math.floor(duration % 60)}`;
        });
    });


    //create function to stop and play sounds
    const checkIfPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';

        }
        else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //for animating the circle and time
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let passedTime = duration - currentTime;
        let seconds = Math.floor(passedTime % 60);
        let min = Math.floor(passedTime / 60);

        //animating the circle
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animate the clock
        timeDisplay.textContent = `${min}:${seconds}`;
        if(currentTime >= duration){
            song.pause();
            song.currentTime = 0;
            play.src = 'svg/play.svg';
            video.pause();
        }
    };
};

app();