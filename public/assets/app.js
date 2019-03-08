var userData;

function validateForm() {
  var isValid = true;
  $(".form-control").each(function() {
    if ($(this).val() === ""){
      isValid = false;
    }
  });

  $(".chosen-select").each(function() {
    if ($(this).val() === ""){
      isValid = false;
    }
  });
  return isValid;

console.log(this)
}

$(".container").one("submit", function(event) {
event.preventDefault();


if (validateForm()) {
var tempData =  $(".container").serializeArray()

console.log(tempData)

userData ={
  name: tempData[0].value,
  photo: tempData[1].value,
  score:[]
};
for(var i = 2; i < tempData.length; i++){
   userData.score.push(tempData[i].value)
}


};
console.log(userData)
fetch("/api/friends", {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify(userData)
})
.then( function(response){
  console.log(response)
  return response.json()
  // console.log(response)
 })
.then(function(data){
  console.log(data)
  var modal = $("#modal-body")
  var name = $("<span>")
  name.text(data.match.name)
  var picture = $("<img>")
  picture.attr("src", data.match.photo)
  picture.css({
    "height": "150px",
    "width" : "150px"
  })
  var score = $("<p>")
  score.text(data.match.score) 
  modal.append(name, picture, score)
  console.log(data.newUser)
  name = $("<span>")
  name.text(data.newUser.name)
  picture = $("<img>")
  picture.attr("src", data.newUser.photo)
  picture.css({
    "height": "150px",
    "width" : "150px"
  })
  score = $("<p>")
  score.text(data.newUser.score) 
  modal.append(name, picture, score)
 })

// $.post("/api/friends", JSON.stringify(userData), 
//   function(data){
  
//   console.log(data)

  // $("#match-name").text(data.name);
  // $("#match-img").attr("src", data.photo);
 

  // });


});

function compareScores (userScore, res){
  var leastDiff;
  var bestFriendIndex = 0;

  for (var i = 0; i < friendsData.length; i++){
    console.log(friendsData[i])
    var friendScore = friendsData[i].score
    var totalDiff = 0;
    for(var j = 0; j <friendScore.length; j++){

      var scoreA = parseInt(friendScore[j])
      var scoreB = parseInt(userScore[j])
      var currentDiff = Math.abs(scoreA - scoreB)
      
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
  
}
  function friendResults() {

    
    var currentURL = window.location.origin;


    $.ajax({ url: currentURL + "/api/friends", method: "GET" })
    .then(function(friendsData) {
      console.log("------------------------------------");
      console.log("URL: " + currentURL + "/api/friends");
      console.log("------------------------------------");

      console.log(friendsData);
      console.log("------------------------------------");

        var matchName = $("<h2>");
        matchName.text(friendsData.name);

        var matchPhoto = $("<img>");
        matchPhoto.attr("src", friendsData.photo)

        var matchScore = $("<h4>")
        matchScore.text(friendsData.score)

        $(".modal-body").append(matchName, matchPhoto, matchScore)

     

    });
  }

  friendResults()


