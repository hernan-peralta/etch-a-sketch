let $container = document.querySelector(".container");
const $newCanvas = document.querySelector("#new-canvas");
const $resetCanvas = document.querySelector("#reset-canvas");
const $randomColor = document.querySelector("#random-color");
const $darken = document.querySelector("#darken");
let $cells = document.querySelectorAll(".cell");
let $isRandom = document.querySelector("#is-random");
let randomActivated = false;
let $isDarken = document.querySelector("#is-darken");
let darkenActivated = false;


function drawCanvas(squares){
    for (let i = 0; i < squares; i++) {
        let div = document.createElement("div");
        $container.appendChild(div).classList.add("row");

        for (let j = 0; j < squares; j++) {
            let div2 = document.createElement("div");
            $container.lastElementChild.appendChild(div2).classList.add("cell");
        }
    }
}


function resetCanvas() {
    $cells = document.querySelectorAll(".cell");
    for (let i = 0; i < $cells.length; i++) {
        $cells[i].style.backgroundColor = "white";
        $cells[i].style.filter = "";
    }
}


function paint(cell) {
    if (randomActivated === true){
        randomColor(cell);
    } 
    else if (darkenActivated === true){
        darken(cell);
    } 
    else {
        userSelectedColor(cell);
    }
}


function userSelectedColor(cell) {
    let colorSelected = document.querySelector("#color-selector").value;
    cell.style.backgroundColor = colorSelected;
    cell.style.filter = "";
}


function randomColor(cell) {
    let randomizedColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16)}) // https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    cell.style.backgroundColor = randomizedColor;
    cell.style.filter = "";
}


function darken(cell){
    if (cell.style.filter.includes("brightness") === false){
        cell.style.filter = "brightness(90%)";
    }

    if (cell.style.filter.includes("brightness(0%)")){
        return "";
    }

    else{
        let brightness = cell.style.filter.slice(11, 13);
        brightness = Number(brightness) - 10;
        cell.style.filter = "brightness(" + brightness + "%)";
        console.log(cell.style.filter);
    }
}


function newCanvas(){
    randomActivated = false;
    $container.innerHTML = "";
    let squares = Number(prompt("Enter the size of the canvas"));
    drawCanvas(squares);
    let height = 700 / squares - 2; //I subtract 2 because of the 1px border of each cell
    document
      .querySelectorAll(".cell")
      .forEach(cell => cell.setAttribute("style", "height:" + height + "px;"))

    resetCanvas();
}


$newCanvas.onclick = newCanvas;
$resetCanvas.onclick = resetCanvas;

$randomColor.onclick = function (){
    randomActivated = !randomActivated;
    $isRandom.innerText = "Random color activated: " + `${randomActivated}`;
}

$darken.onclick = function () {
    darkenActivated = !darkenActivated;
    $isDarken.innerText = "Darken activated: " + `${darkenActivated}`;
}

$container.onmouseover = function(event){
    let cell = event.target.closest('.cell');
    paint(cell);
}
