const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');

let lastHole, timeUp=false, currentScore=0;


const randomTime = (min, max) => Math.floor(Math.random() * (max - min) + min);

function randomHole (holes){
    const index = Math.floor(Math.random() * holes.length);
    
    if (lastHole === holes[index]){
        console.log('same hole as previous one. Selecting another one');
        return randomHole(holes);
    }
    lastHole = holes[index];
    return holes[index];
}

function peep(){
    const hole = randomHole(holes);
    console.log(hole);

}

function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    currentScore = 0;
    peep();
    setTimeout(()=>timeUp = true, 15000);
}