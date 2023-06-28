let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let arr = [];
let count = 0;
let timer;

canvas.onclick = function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    arr[y][x] = 1;
    drawField();
}

function goLife(){
    let x = 80, y = 80;
    for(let i=0; i<y; i++){
        arr[i] = [];
        for(let j=0; j<x; j++){
            arr[i][j] = 0;
        }
    }
}

function drawField(){
    ctx.clearRect(0, 0 ,800, 800);
    for(let i=0; i<80; i++){
        for(let j=0; j<80; j++){
            if(arr[i][j] == 1){
                ctx.fillRect(j*10, i*10, 10, 10);
            }
        }
    }
}

function Start(){
    let subArr = [];
    for(let i=0; i<80; i++){
        subArr[i] = [];
        for(let j=0; j<80; j++){
            let surrCells = 0;
            if (arr[fpx(i)-1][j] == 1) surrCells++;
            if (arr[i][fpy(j)+1] == 1) surrCells++;
            if (arr[fpy(i)+1][j] == 1) surrCells++;
            if (arr[i][fpx(j)-1] == 1) surrCells++;
            if (arr[fpx(i)-1][fpy(j)+1] == 1) surrCells++;
            if (arr[fpy(i)+1][fpy(j)+1] == 1) surrCells++;
            if (arr[fpy(i)+1][fpx(j)-1] == 1) surrCells++;
            if (arr[fpx(i)-1][fpx(j)-1] == 1) surrCells++;

            if (arr[i][j]==1 && (surrCells==2 || surrCells==3)) subArr[i][j] = 1;
            else subArr[i][j] = 0;

            if (surrCells == 3) subArr[i][j] = 1;
        }
    }
    arr = subArr;
    drawField();
    count++;
    document.getElementById("count").innerHTML = count;
    timer = setTimeout(Start, 200);
}

function fpx(i){
    if(i==0) return 80;
    else return i;
}
function fpy(j){
    if(j==79) return -1;
    else return j;
}

goLife();

document.getElementById("start").onclick = Start;