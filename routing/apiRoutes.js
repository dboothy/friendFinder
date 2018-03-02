var friendsData = require("../data/friends");

module.exports = function(app) {
	

	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res) {
	console.log("post")
	console.log(req.body)
		var userData = req.body;
		var scores = [];
		userData.added = true
		res.json(userData)
		// if(friendsData.length < 1){
		// 	friendsData.push(req.body);
		// 	res.json(userData);
		// }
		// else {
		// 	friendsData.push(req.body);
		// 	res.json(false);
		// }
	});

	app.post("/api/clear", function(){
		friendsData =[];

		console.log(friendsData)
	})

}