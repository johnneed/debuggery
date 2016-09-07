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

    function *getVote(catData) {
        for (let i = 0, len = catData.length; i < len; i += 2) {
            yield {candidate1: catData[i], candidate2: catData[i + 1]};
        }
    }


    function startVoteRound(catData, generator) {
        var catContest = generator.next();
        candidate01Pic.attr('src', `/images/${catContest.value.candidate1.filename}`);
        candidate02Pic.attr('src', `/images/${catContest.value.candidate2.filename}`);
        candidate01Name.html(catContest.value.candidate1.name);
        candidate02Name.html(catContest.value.candidate2.name);
        candidate01CoffeePreference.html(catContest.value.candidate1.coffeePreference);
        candidate02CoffeePreference.html(catContest.value.candidate2.coffeePreference);
        //candidate01Votes.html(catContest.value.candidate1.vote)
        //candidate02Votes.html(catContest.value.candidate2.vote);
    }

    $.get('/api/cats').done(function (data) {
        var generator = getVote(data.cats);
        startVoteRound(data.cats, generator);
    }).catch(function (err) {
        // We Failed :-(
    });
}(jQuery));