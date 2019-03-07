var path = require("path");
var friends = require("../data/friends");

module.exports = function(app){

    app.get('/api/friends', function(req, res){
        console.log("Reading API");
        res.json(friends);
    });

    app.post("/api/new", function(req, res) {
        var newFriend = req.body;
        var newScore = newFriend.scores;
        var total = 0;
        var bestMatch = 1000;
        var index = -1;

        for(var i = 0; i < friends.length; i++){
            total = 0;

            for(var j = 0; j < newScore.length; j++){
                var diff = Math.abs(newScore[j] - friends[i].scores[j]);
                total += diff;
            }
            if(total < bestMatch){
                bestMatch = total;
                index = i;
            }
        }
        console.log('Best Match:', friends[index]);
        friends.push(newFriend);
        res.json(friends[index]);
    });
};