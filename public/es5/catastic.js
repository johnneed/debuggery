"use strict";

(function ($) {
    var _marked = [bracketGenerator].map(regeneratorRuntime.mark);

    var votingBooth = $("#votingBooth");
    var candidate01 = $("#candidate01");
    var candidate01Pic = $("#candidate01Pic");
    var candidate01Name = $("#candidate01Name");
    var candidate01CoffeePreference = $("#candidate01CoffeePreference");
    var candidate01Votes = $("#candidate01Votes");
    var candidate01VoteButton = $("#candidate01VoteButton");
    var candidate02 = $("#candidate02");
    var candidate02Pic = $("#candidate02Pic");
    var candidate02Name = $("#candidate02Name");
    var candidate02CoffeePreference = $("#candidate02CoffeePreference");
    var candidate02Votes = $("#candidate02Votes");
    var candidate02VoteButton = $("#candidate02VoteButton");
    var electionResults = $("#electionResults");
    var newElectionButton = $("#newElectionButton");
    var winnerWinnerChickenDinner = $("#winnerWinnerChickenDinner");

    function calculateByes(numTeams) {
        var n = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var minuend = Math.pow(2, n);
        var byes = minuend - numTeams;
        return byes >= 0 ? byes : calculateByes(numTeams, n + 1);
    }

    function bracketGenerator(teams) {
        var byes = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var shuffledTeams, shuffle, i, len;
        return regeneratorRuntime.wrap(function bracketGenerator$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        shuffle = function shuffle(contestantData) {
                            var mixes = typeof arguments[1] === "number" ? arguments[1] : contestantData.length * 2;
                            var oneMix = contestantData.sort(function (c1, c2) {
                                return Math.random() - Math.random();
                            });
                            return mixes > 0 ? shuffle(oneMix, mixes - 1) : oneMix;
                        };

                        shuffledTeams = shuffle(teams);

                        i = 0, len = shuffledTeams.length - byes;

                    case 3:
                        if (!(i < len)) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 6;
                        return { candidate1: shuffledTeams[i], candidate2: shuffledTeams[i + 1] };

                    case 6:
                        i += 2;
                        _context.next = 3;
                        break;

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _marked[0], this);
    }

    function startVote(generator, contestants) {
        var catContest = generator.next();

        function eliminationFunction(looserId) {
            return contestants.map(function (contestant) {
                if (looserId === contestant.id) {
                    contestant.eliminated = true;
                }
                return contestant;
            });
        }

        function nextVote(eliminateFunc) {
            // var rand = Math.random();
            // if (rand < .2) {
            //     throw new Error("oops");
            // }
            var winnersAndLosers = eliminateFunc();
            startVote(generator, winnersAndLosers);
            return null;
        }

        if (catContest.done) {
            return startVoteRound(contestants);
        }
        candidate01Pic.attr("src", "/images/" + catContest.value.candidate1.contestant.filename);
        candidate02Pic.attr("src", "/images/" + catContest.value.candidate2.contestant.filename);
        candidate01Name.html(catContest.value.candidate1.contestant.name);
        candidate02Name.html(catContest.value.candidate2.contestant.name);
        candidate01CoffeePreference.html(catContest.value.candidate1.contestant.coffeePreference);
        candidate02CoffeePreference.html(catContest.value.candidate2.contestant.coffeePreference);
        candidate01VoteButton.off("click");
        candidate02VoteButton.off("click");
        candidate01VoteButton.click(nextVote.bind(null, eliminationFunction.bind(null, catContest.value.candidate2.id)));
        candidate02VoteButton.click(nextVote.bind(null, eliminationFunction.bind(null, catContest.value.candidate1.id)));
        electionResults.click(restart);
    }

    function announceWinner(winner) {
        electionResults.className = electionResults.removeClass("is-hidden");
        winnerWinnerChickenDinner.attr("src", "/images/" + winner.filename);
        votingBooth.addClass("is-hidden");
    }

    function startVoteRound(contestants) {
        var byes = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        try {
            throw new Error("Muhahahahahaha!!!!");
        } catch (err) {
            logError(err);
        }
        var winners = contestants.filter(function (contestant) {
            return !contestant.eliminated;
        });
        var bGenerator;

        if (winners.length === 1) {
            return announceWinner(winners[0].contestant);
        }

        console.info("We have " + winners.length + " cats left in the competition");
        bGenerator = bracketGenerator(winners, byes);

        startVote(bGenerator, winners);
        return void 0;
    }

    function addBracketMetaData(data) {
        return data.map(function (datum, i) {
            return {
                id: i,
                eliminated: false,
                contestant: datum
            };
        });
    }

    function restart() {

        electionResults.className = electionResults.addClass("is-hidden");
        votingBooth.removeClass("is-hidden");
        start();
    }

    function logError(err) {
        debugger;
        console.log("oh nos! there was an error!");
        console.log(err.message);
        // window.location=`https://www.google.com/#q=%22${err.statusText.replace(" ","+")}%22`
    }

    function start() {
        $.get("/api/cats").done(function (data) {
            var numByes = calculateByes(data.cats.length);
            var modifiedData = addBracketMetaData(data.cats);
            startVoteRound(modifiedData, numByes);
        }).catch(function (err) {
            logError(err);
        });
        return void 0;
    }

    start();
})(jQuery);