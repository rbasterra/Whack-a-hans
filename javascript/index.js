//obtenemos todos los objetos que necesitamos manipular
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');

//definimos variables necesarias
let lastHole, timeUp=false, currentScore=0;


//funcion que crea un tiempo aleatorio en base a una maximo y un minimo
const randomTime = (min, max) => Math.floor(Math.random() * (max - min) + min);

//funcion para seleccionar uno de los agujeros aleatoriamente. Si el agujero aleatorio generado coincide con el ulimo agujero seleccionado (lastHole),
//llamamos de nuevo a la funcion hasta que nos devuelva un numero de agujero aleatorio diferente 
function randomHole (holes){
    const index = Math.floor(Math.random() * holes.length);
    
    if (lastHole === holes[index]){
        console.log('same hole as previous one. Selecting another one');
        return randomHole(holes);
    }
    lastHole = holes[index];
    return holes[index];
}

//funcion que muestra los Hans Topo. Para ello, llama a las dos funciones aleatorias anteriores:
// randomHole --> selecciona un agujero aleatorio entre 0 y holes.length
// randomTime --> genera un numero de milisegundos aleatorio entre 500 y 1000
// setTimeout --> tras el tiempo aleatorio,  elimina la clase 'up' para que desaparezca el Hans topo. 
//                Si el tiempo de juego no ha transcurrido, vuelve a llamar a peep() para que aparezca otro Hans topo

function peep(){
    const hole = randomHole(holes);
    console.log(hole);
    const initClass = hole.className;
    //añadimos la clase 'up' para que aparezca el Hans topo
    hole.className = initClass + ' up';

    setTimeout(() => {hole.className = initClass
        if (!timeUp){
            peep();
        }
    }, randomTime(500,1000));
}
    
//funcion que resetea las variables y comienza el juego. Deshabilita tambien el boton de Start para que no pueda haber dos juegos a la vez
function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    currentScore = 0;

    const btnStart = document.querySelector('button');
    btnStart.disabled = true;
    
    setTimeout(()=>{timeUp = true;
    btnStart.disabled=false;}, 15000);
    peep();
   
}



// function wack(e) {
//     const className = e.target.parentElement.className;
//     const index = className.indexOf(' up');
//     e.target.parentElement.className = className.slice(0,index);
    
//     currentScore++;
//     scoreBoard.textContent=currentScore;

// }

//añadimos un eventListener a cada Hans topo. Si el usuario hace click, se suma +1 al score

for (mole of moles){
    // mole.addEventListener('click', wack);
    mole.addEventListener('click', (e) => {
        const className = e.target.parentElement.className;
        const index = className.indexOf(' up');
        e.target.parentElement.className = className.slice(0,index);
        
        currentScore++;
        scoreBoard.textContent=currentScore;
    });

}