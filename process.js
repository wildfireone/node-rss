//
var request = require("request")

var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
"&api_key=0cd074c5f7746588e9d018df9ecafb77"+
"&user_id=55336091%40N08"+
"&per_page=500"+
"&page="+
"&format=json"+
"&nojsoncallback=1"




request({
    url: url,
    json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
      body["photos"]["photo"].forEach(function(photo) {
          var imgurl = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_b.jpg";
        console.log(imgurl);
        });
  }
    
})


