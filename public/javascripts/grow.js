
var x = [];

function grow() {
    console.timeStamp("I just clicked the button");
    x.push(new Array(1000000).join('x'));
}

document.getElementById('grow').addEventListener('click', grow);