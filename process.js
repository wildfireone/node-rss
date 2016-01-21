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
"MxNZCmQbGyWTreBEfniMGTYegVTV5g7dQTNJmQAwDwFz8i6u7GN8XXRJyjiJJfjiet1UkFy0u3dSivQv5ktDXyd0k27GP2omd03ouaFN67KfVvCOwu0N28u3HBXNAXoX6rO1NM1qf0BeUXD762GoOMpLd4C8VgQ0tcuQOBk9u1Cqah4oqgGpoOdgXOnNsjD4sAAiDWZzoVYEYWZZwQQxjDPFB1y3vxjhAqdKC43n0upXWHtkSWdp0ifReRSSmsV"

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
                    "markdown": "![alt text]("+image+"\"Logo Title Text 1\"')"
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

