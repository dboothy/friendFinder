var friendsData = require("../data/friends");

module.exports = function(app) {
	

	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res) {

		if(friendsData.length < 1){
			friendsData.push(req.body);
			res.json(true);
		}
		else {
			friendsData.push(req.body);
			res.json(false);
		}
	});

	app.post("/api/clear", function(){
		friendsData =[];

		console.log(friendsData)
	})

}