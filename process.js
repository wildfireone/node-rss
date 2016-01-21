//
var request = require("request")

var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
"&api_key=0cd074c5f7746588e9d018df9ecafb77"+
"&user_id=55336091%40N08"+
"&per_page=500"+
"&page="+
"&format=json"+
"&nojsoncallback=1"


var ghosturl = "http://178.62.11.184:2368/ghost/api/v0.1/posts?access_token=pS0l9YmQewwaPfWeXqi0KFSmXROfGsXW8sFOzjRDCuMBuSbSJelTSqQsHawHPxrAY7QJNxDDoDqvL364wzswOEs0rs7Nf9c6XrW5Cb0xOJthVL9dps0PymsHndAamuTpqKEWGEfp32wMG0o63JZP4iI5MIPdWRbruMlvRifzpAcnxLAr3FOYoF5RL1Y8XsZ4EyXw6NwTwAdkVURVJsmycZL1ZjAa536tDPPQk5d8TtNoRyKF9YwkLsUbxSadXNM"

request({
    url: url,
    json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
      body["photos"]["photo"].forEach(function(photo) {
          var imgurl = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_b.jpg";
          
          ghostpost(imgurl, imgtitle);
        console.log(imgurl);
        });
  }
    
})

function ghostpost(image, title){
    var requestdata = {
            "posts": [
                {
                    "status": "published",
                    "title": title,
                    "markdown": "![alt text]("+image+"'Logo Title Text 1')"
                }
                ]
            }
    request({
        url: ghosturl,
        method: "POST",
        json: requestData
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        }
        else {

            console.log("error: " + error)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusText)
        }
    })
}

