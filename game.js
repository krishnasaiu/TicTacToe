var X = "X"
var O = "O"
var table = [["none", "none", "none"],
             ["none", "none", "none"],
             ["none", "none", "none"]]
var turn = true

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function change( el, i, j) {
    if ( table[i][j] === "none" && turn){
        document.getElementById(el).innerHTML = X;
        table[i][j] = X;
        turn = false
    }
    else
        document.getElementById("msg").innerHTML = "Invalid Selection";
    computerTurn();
}
