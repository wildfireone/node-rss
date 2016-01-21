//
var request = require("request")

var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
"&api_key=0b65598faae308e7ad174b21270b3da5"+
"&user_id=55336091%40N08"+
"&per_page=5"+
"&page="+
"&format=json"+
"&nojsoncallback=1"


var ghosturl = "http://178.62.11.184:2368/ghost/api/v0.1/posts?access_token="+
"ChjFN4lCxBbqS8dsF4SMNeDKfOWwlDOxcpWKCAdapgvVWognttqsqAad8Hg9X4Rd30NDFYBgnn12sbUnEllnXPZzZL5pjXevLaKHeyWWQkD1w4AHsOyFUNQkF4L7ft95rHu3bit1Ewpg6DaAy3GmItq2MZ4KhS2OLj6ohJOqXPuvUvGdr7APwtvN7HIIGYIskAfeMAcv2O8VfVOpmJy5CwS12bopdlxWuOeZ5J8gl0lRh7BMjm76JqN7M31MkKp"

request({
    url: url,
    json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
      body["photos"]["photo"].forEach(function(photo) {
          var imgurl = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_b.jpg";
          
          ghostpost(imgurl, photo.title);
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
                    "markdown": "!["+title+"]("+image+")"
                }
                ]
            }
    request({
        url: ghosturl,
        method: "POST",
        json: requestdata
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

