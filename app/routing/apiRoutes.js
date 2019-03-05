var friends = require("../data/friends.js");

module.exports = function (app) { //Your `apiRoutes.js` file should contain two routes:
    // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // A POST routes `/api/friends`. This will be used to handle incoming survey results, compare, store, and send back match. 
    app.post("/api/friends", function (req, res) {
        console.log("post request received.\n");
        /* Determine the user's most compatible friend using the following as a guide: *
        Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4,
        5, 1, 2, 5, 4, 1]`).*/
        var totalDifference = 50; //maximum allowed difference between users. 5 points per 10 questions (5 * 10 = 50)
        var matchedFriend; //empty friend object to send back
        var currentFriend = req.body; //set post request object to currentFriend
        console.log("current friend: " + currentFriend + "\n");
        friends.forEach(function (friend) { //scan each friend object in friends.js
            var difference = 0; //init
            for (i = 0; i < friend.scores.length; i++) {
                difference += Math.abs(friend.scores[i] - currentFriend.scores[i]);
            }
            if (difference < totalDifference) {
                /* The closest match will be the user with the least amount of difference. 
                Lower totalDifference if current difference is lower than current totalDifference */
                totalDifference = difference;
                matchedFriend = friend; //set matchedFriend to current scanned friend
            };
        });
        res.json(matchedFriend); 
        friends.push(req.body); //friend results
    });
};