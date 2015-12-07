var msg = "msg"
var X = "X"
var O = "O"
var table = [[null, null, null],
             [null, null, null],
             [null, null, null]]
var moves = ["00", "01", "02", "10", "11", "12", "20", "21", "22"]
var turn = true
var gameover = false

function didWin(player) {
    if (table[0][0] == table[1][1] && table[1][1] == table[2][2] && table[2][2] == player)
        return { value: true, t1: "t00", t2: "t11", t3: "t22"};
    
    else if (table[0][2] == table[1][1] && table[1][1] == table[2][0] && table[2][0] == player)
        return { value: true, t1: "t02", t2: "t11", t3: "t20"};
    
    else if (table[0][0] == table[0][1] && table[0][1] == table[0][2] && table[0][2] == player)
        return { value: true, t1: "t00", t2: "t01", t3: "t02"};
    
    else if (table[1][0] == table[1][1] && table[1][1] == table[1][2] && table[1][2] == player)
        return { value: true, t1: "t10", t2: "t11", t3: "t12"};
    
    else if (table[2][0] == table[2][1] && table[2][1] == table[2][2] && table[2][2] == player)
        return { value: true, t1: "t20", t2: "t21", t3: "t22"};
    
    else if (table[0][0] == table[1][0] && table[1][0] == table[2][0] && table[2][0] == player)
        return { value: true, t1: "t00", t2: "t10", t3: "t20"};
    
    else if (table[0][1] == table[1][1] && table[1][1] == table[2][1] && table[2][1] == player)
        return { value: true, t1: "t01", t2: "t11", t3: "t21"};
    
    else if (table[0][2] == table[1][2] && table[1][2] == table[2][2] && table[2][2] == player)
        return { value: true, t1: "t02", t2: "t12", t3: "t22"};
    
    else
        return { value: false, t1: null, t2: null, t3: null}
}

// Randomly picks bot's move
// TODO: Intelligently select bot's next move
function randomTurn() {
    if (moves.length != 0){
        var index = Math.floor(Math.random() * moves.length);
        console.log(index)
        var move = moves[index]
        return {
            x: parseInt(move[0]),
            y: parseInt(move[1])
        };
    } else {
        return {
            x: null,
            y: null
        };
    }
}

function computerTurn() {
    var turn = randomTurn();
    if (turn.x != null) {
        console.log("(" + turn.x.toString() + ", " + turn.y.toString() + ")");
        table[turn.x][turn.y] = O;
        document.getElementById(turn.x.toString() + turn.y.toString()).innerHTML = O;
        
        var index = moves.indexOf(turn.x.toString() + turn.y.toString());
        if (index > -1)
            moves.splice(index, 1);
        console.log(moves)
    
        var result = didWin(O)
        if (result.value) {
            document.getElementById(msg).innerHTML = "Computer Won";
            gameover = true;
            document.getElementById(result.t1).style.backgroundColor = "#ffff00";
            document.getElementById(result.t2).style.backgroundColor = "#ffff00";
            document.getElementById(result.t3).style.backgroundColor = "#ffff00";
        } else
            document.getElementById(msg).innerHTML = "Your turn";
    } else {
        gameover = true;
        document.getElementById(msg).innerHTML = "Game Over!!";
    }
}

function change(i, j) {
    if ( table[i][j] === null && turn && !gameover){
        console.log("(" + i.toString() + ", " + j.toString() + ")");
        document.getElementById(i.toString() + j.toString()).innerHTML = X;
        var index = moves.indexOf(i.toString() + j.toString());
        if (index > -1)
            moves.splice(index, 1);
        console.log(moves)
        
        table[i][j] = X;
        var result = didWin(X);
        if (result.value) {
            document.getElementById(msg).innerHTML = "You Won";
            gameover = true;
            document.getElementById(result.t1).style.backgroundColor = "#99ff33";
            document.getElementById(result.t2).style.backgroundColor = "#99ff33";
            document.getElementById(result.t3).style.backgroundColor = "#99ff33";
        } else {
            turn = false;
            document.getElementById(msg).innerHTML = "Computer's turn";
            //setTimeout(computerTurn, 1000);
            computerTurn();
            turn = true;
        }
    } else if (gameover) {
        document.getElementById(msg).innerHTML = "Game Over!!";
    } else
        document.getElementById(msg).innerHTML = "Invalid Selection";
}