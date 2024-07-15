let rows = 30;
let cols = 30;

let playing = false;
let grid = new Array(rows);

let nextGrid = new Array(rows);



function createTable(){
    let gridContainer = document.getElementById('gridContainer');
    let table = document.createElement('table');
    for(let i = 0; i < rows; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < cols; j++){
            let cell = document.createElement('td');
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute('class',"dead");
            cell.onclick = cellClickHandler;
            
            tr.appendChild(cell);
        }
        table.appendChild(tr)
    }
    gridContainer.appendChild(table);
}

createTable();
updateView();


function cellClickHandler() {
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

function applyingRules(col,row){
    let neighbourCount = countLiveNeighbors(col,row);
    if(grid[row][col] === 1){
        if(neighbourCount < 2){
            nextGrid[row][col] = 0;
        }else if(neighbourCount === 2 && neighbourCount === 3){
            nextGrid[row][col] = 1;
        }else if(neighbourCount > 3){
            nextGrid[row][col] = 0;
        }
    }else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}


function countLiveNeighbors(col,row){
    let neighbor = 0;
    for(let i = -1; i < 1; i++){
        for(let j = -1; j < 1; j++){
            if(i === 0 && j===0) continue
            let newRow = row+1;
            let newCol = col+1;
            if(newRow >=0 && newRow < rows && newCol >= 0 && newCol < cols){
                neighbor += grid[newRow][newCol];
            }
        }
    }

    return neighbor
}





