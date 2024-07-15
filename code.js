let rows = 30;
let cols = 30;

let playing = false;
let grid = new Array(rows);
let timer;
let nextGrid = new Array(rows);
let reproductionTime = 100;



function createTable(){
    let gridContainer = document.getElementById('gridContainer');
    let table = document.createElement('table');
    for(let i = 0; i < rows; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < cols; j++){
            let cell = document.createElement('td');
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute('class',"dead");
            cell.onclick = cellClick;
            
            tr.appendChild(cell);
        }
        table.appendChild(tr)
    }
    gridContainer.appendChild(table);
}




function cellClick() {
    var rowcol = this.id.split("_");
    var row = parseInt(rowcol[0]);
    var col = parseInt(rowcol[1]);
    
    var classes = this.getAttribute("class");
    if(classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }
    
}


function updateView(){
    for(let i =0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let cell = document.getElementById(i + "_" + j)
            if(grid[i][j] === 0){
                cell.setAttribute("class","dead");
            }else{
                cell.setAttribute("class","live");
            }
        }
    }
}

function Rules(row,col){
    let neighbourCount = countLiveNeighbors(col,row);
    if(grid[row][col] === 1){
        if(neighbourCount < 2){
            nextGrid[row][col] = 0;
        }else if(neighbourCount === 2 || neighbourCount === 3){
            nextGrid[row][col] = 1;
        }else if(neighbourCount > 3){
            nextGrid[row][col] = 0;
        }
    }else if (grid[row][col] == 0) {
        if (neighbourCount == 3) {
            nextGrid[row][col] = 1;
        }
    }
}


function countLiveNeighbors(col,row){
    let neighbor = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i === 0 && j===0) continue
            let newRow = row + i;
            let newCol = col + j;
            if(newRow >=0 && newRow < rows && newCol >= 0 && newCol < cols){
                neighbor += grid[newRow][newCol];
            }
        }
    }

    return neighbor
}


function setUpControlButtons(){
    let startButton = document.getElementById('start');
    startButton.onclick = startButtonHandle;

    let clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandle;
    
    
    let randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandle;
}


function startButtonHandle() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer); 
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}


function clearButtonHandle(){
    let startButton = document.getElementById('start');

    playing = false;

    startButton.innerHTML = "Start";
    clearTimeout(timer);

    let liveCells = document.getElementsByClassName('live');
    let cells = []

    for(let i = 0; i < liveCells.length; i++){
        cells.push(liveCells[i]);

    }

    for(let i = 0; i < cells.length; i++){
        cells[i].setAttribute('class','dead')
    }

    resetGrids();


}


function randomButtonHandle() {
    if (playing) return;
    clearButtonHandle();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function play() {
    computeNextGen();
    
    if (playing) {
        clearTimeout(timer)
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            Rules(i, j);
        }
    }
    
    
    copyAndResetGrid();
    
    updateView();
}



function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setUpControlButtons();
}

window.onload = initialize;