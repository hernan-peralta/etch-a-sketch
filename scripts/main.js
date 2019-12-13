let $container = document.querySelector(".container");
const $newCanvas = document.querySelector("#new-canvas");
const $resetCanvas = document.querySelector("#reset-canvas");
const $randomColor = document.querySelector("#random-color");
let $cells = document.querySelectorAll(".cell");
let $isRandom = document.querySelector("#is-random");
let randomActivated = false;



function drawCanvas(squares){
    for (let i = 0; i<squares; i++){
        let div = document.createElement("div");
        $container.appendChild(div).classList.add("row");
        
        for (let j = 0; j<squares; j++){
            let div2 = document.createElement("div");
            $container.lastElementChild.appendChild(div2).classList.add("cell");
        }
    }
}


function resetCanvas(){
    $cells.forEach(cell => cell.style.backgroundColor = 'white');
}


function paint(){
    $cells = document.querySelectorAll(".cell");
    if (randomActivated === false){
        $cells.forEach(cell => cell.addEventListener('mouseover', function(){userSelectedColor(cell)}));
    }

    if (randomActivated === true){
        $cells.forEach(cell => cell.addEventListener('mouseover', function(){randomColor(cell)}));
    }
}


function userSelectedColor(cell){
    let colorSelected = document.querySelector("#color-selector").value;
    cell.style.backgroundColor = colorSelected;
}


function randomColor(cell){
    let randomizedColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}) // https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    cell.style.backgroundColor = randomizedColor;
}


function newCanvas(){
    randomActivated = false;
    $container.innerHTML = '';
    let squares = Number(prompt("Enter the size of the canvas"));
    drawCanvas(squares);
    let height = (700/squares)-2;//I subtract 2 because of the 1px border of each cell
    document.querySelectorAll(".cell").forEach(cell => cell.setAttribute('style', 'height:'+height+'px;'));

    paint();  
}


$newCanvas.onclick = newCanvas;
$resetCanvas.onclick = resetCanvas;
$randomColor.onclick = function(){
    randomActivated = !randomActivated
    $isRandom.innerText = 'Random color activated: ' + `${randomActivated}`;
    return paint()
};
