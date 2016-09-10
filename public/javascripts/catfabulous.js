(function ($) {
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


    function calculateByes(numTeams, n = 0) {
        var minuend = Math.pow(2, n);
        var byes = minuend - numTeams;
        return byes >= 0 ? byes : calculateByes(numTeams, n + 1);
    }

    function *bracketGenerator(teams, byes = 0) {
        var shuffledTeams;

        function shuffle(contestantData) {
            var mixes = typeof arguments[1] === "number" ? arguments[1] : contestantData.length * 2;
            var oneMix = contestantData.sort((c1, c2) => (Math.random() - Math.random()));
            return mixes > 0 ? shuffle(oneMix, mixes - 1) : oneMix;
        }

        shuffledTeams = shuffle(teams);


        for (let i = 0, len = shuffledTeams.length - byes; i < len; i += 2) {
            yield {candidate1: shuffledTeams[i], candidate2: shuffledTeams[i + 1]};
        }
    }

    function startVote(generator, contestants) {
        var catContest = generator.next();


        function eliminationFunction(looserId) {
            return contestants.map(contestant=> {
                if (looserId === contestant.id) {
                    contestant.eliminated = true;
                }
                return contestant;
            });
        }

        function nextVote(eliminateFunc) {

            var winnersAndLosers = eliminateFunc();
            startVote(generator, winnersAndLosers);
            return null;
        }

        if (catContest.done) {
            return startVoteRound(contestants);
        }
        candidate01Pic.attr('src', `/images/${catContest.value.candidate1.contestant.filename}`);
        candidate02Pic.attr('src', `/images/${catContest.value.candidate2.contestant.filename}`);
        candidate01Name.html(catContest.value.candidate1.contestant.name);
        candidate02Name.html(catContest.value.candidate2.contestant.name);
        candidate01CoffeePreference.html(catContest.value.candidate1.contestant.coffeePreference);
        candidate02CoffeePreference.html(catContest.value.candidate2.contestant.coffeePreference);
        candidate01VoteButton.off("click");
        candidate02VoteButton.off("click");
        candidate01VoteButton.click(nextVote.bind(null, eliminationFunction.bind(null, catContest.value.candidate2.id)));
        candidate02VoteButton.click(nextVote.bind(null, eliminationFunction.bind(null, catContest.value.candidate1.id)));

    }

    function announceWinner(winner) {
        alert(winner.name);
    }

    function startVoteRound(contestants, byes = 0) {
        var winners = contestants.filter(contestant => !contestant.eliminated);
        var bGenerator;

        if (winners.length === 1) {
            return announceWinner(winners[0].contestant);
        }

        console.log(winners.length);
        bGenerator = bracketGenerator(winners, byes);

        startVote(bGenerator, winners);
    }


    function addBracketMetaData(data) {
        return data.map((datum, i) => ({
            id: i,
            eliminated: false,
            contestant: datum
        }));
    }

    $.get('/api/cats').done(function (data) {
        var numByes = calculateByes(data.cats.length);
        var modifiedData = addBracketMetaData(data.cats);
        startVoteRound(modifiedData, numByes);
    }).catch(function (err) {
        // We Failed :-(
    });

}(jQuery));

