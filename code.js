let rows = 30;
let cols = 30;

let grid = Array.from(Array(rows), () => Array(cols).fill(0));




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



function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];
    
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


