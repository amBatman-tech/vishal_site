window.addEventListener('load', () =>{
    const sounds = document.querySelectorAll('.sound');
    const pads = document.querySelectorAll('.pads div');
    const colorBalls = document.querySelector('.colorballs');
    const colors = [
        'darkorchid',
        'forestgreen',
        'hotpink',
        'rgb(2, 97, 134)',
        'rgb(243, 175, 48)',
        'rgb(0, 141, 94)'
    ];

    //making sound
    pads.forEach((pad, index) =>{
        pad.addEventListener('click', function(){
            sounds[index].currentTime=0;
            sounds[index].play();

            createBall(index);
        });
    });

    //function for color balls
    const createBall = (index) => {
        const ball = document.createElement('div');
        colorBalls.appendChild(ball);
        ball.style.backgroundColor = colors[index];
        ball.style.animation = 'jump 1s ease';
        ball.addEventListener('animationend', function(){
            colorBalls.removeChild(this);
        });
    };

});