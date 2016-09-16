 import "babel-polyfill";
(function () {
    "use strict";
    // THIS IS HERE TO BE FOUND
    //find our controls
    var inputBox = document.getElementById("factorialLimit");
    var goButton = document.getElementById("goFigure");
    var currentFactorial = document.getElementById("currentFactorial");

    function *factorialize(limit) {
        var factSoFar = 1;
        var i = 1;
        for (i; i <= limit; i += 1) {
            factSoFar = factSoFar * i;
            yield factSoFar;
        }
    }

    function handleClick(event) {
        var isDone = false;
        var counter = 1;
        var number = parseInt(inputBox.value);
        var myfac = factorialize(number);
        var intervalId = setInterval(function () {
            let newFac = myfac.next();
            if (!newFac.done) {
                currentFactorial.innerHTML = `${counter++}! = ${newFac.value}`;
            } else {
                clearInterval(intervalId);
            }
        }, 500);
    }

    goButton.addEventListener('click', handleClick);
}());