var friendsData = require("../data/friends");
/*gives access to the friendsArray which stores the array of objects and their match scores*/

module.exports = function(app) {
/*built in function that exports the apiRoutes.js, passing app in creates an instance of the method
*/

	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res) {
	console.log("post")
	console.log(req.body)
		// var userData = JSON.parse(req.body);
		var scores = [];
		console.log(req.body.score)
		var bestFriend = compareScores(req.body.score)
		// compareScores([ 1, 2, 3, 4, 3, 2, 4, 2, 1, 1 ])
		friendsData.push(req.body)
		res
		.status(200)
		.json({
			match: bestFriend,
			newUser: req.body
			})
		// if(friendsData.length < 1){
		// 	friendsData.push(req.body);
		// 	res.json(userData);
		// }
		// else {
		// 	friendsData.push(req.body);
		// 	res.json(false);
		// }
	});

	app.get("/api/clear", function(req, res){
		res.send("spiderman")
	})
	app.post("/api/clear", function(){
		friendsData =[];

		console.log(friendsData)
	})


}


function compareScores (userScore){
	var leastDiff;
	var bestFriendIndex = 0;

	for (var i = 0; i < friendsData.length; i++){
		console.log(friendsData[i])
		var friendScore = friendsData[i].score
		var totalDiff = 0;
		for(var j = 0; j <friendScore.length; j++){

			var scoreA = parseInt(friendScore[j])
			var scoreB = parseInt(userScore[j])
			var	currentDiff = Math.abs(scoreA - scoreB)
			
			totalDiff += currentDiff

		}
		if(i === 0){
			console.log("firsttime")
			leastDiff = totalDiff

		}
		console.log(leastDiff, totalDiff, "outsideIf") 
		if(leastDiff > totalDiff){
			console.log("totaldiff", totalDiff)
			console.log(leastDiff, "leastDiff")
			leastDiff = totalDiff
			bestFriendIndex = i
			console.log(i, "currentindex")
			console.log(bestFriendIndex, "bestfriendindex")
		}
	}
	console.log(leastDiff)
	console.log(bestFriendIndex)
	return friendsData[bestFriendIndex]
}
