"use strict";

require("babel-polyfill");

(function () {
    "use strict";
    //find our controls

    var _marked = [factorialize].map(regeneratorRuntime.mark);

    var inputBox = document.getElementById("factorialLimit");
    var goButton = document.getElementById("goFigure");
    var currentFactorial = document.getElementById("currentFactorial");

    function factorialize(limit) {
        var factSoFar, i;
        return regeneratorRuntime.wrap(function factorialize$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        factSoFar = 1;
                        i = 1;
                        i;

                    case 3:
                        if (!(i <= limit)) {
                            _context.next = 10;
                            break;
                        }

                        factSoFar = factSoFar * i;
                        _context.next = 7;
                        return factSoFar;

                    case 7:
                        i += 1;
                        _context.next = 3;
                        break;

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, _marked[0], this);
    }

    function handleClick(event) {
        var isDone = false;
        var counter = 1;
        var number = parseInt(inputBox.value);
        var myfac = factorialize(number);
        var intervalId = setInterval(function () {
            var newFac = myfac.next();
            if (!newFac.done) {
                currentFactorial.innerHTML = counter++ + "! = " + newFac.value;
            } else {
                clearInterval(intervalId);
            }
        }, 500);
    }

    goButton.addEventListener('click', handleClick);
})();