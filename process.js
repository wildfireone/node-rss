//
var request = require("request")

var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
"&api_key=0cd074c5f7746588e9d018df9ecafb77"+
"&user_id=55336091%40N08"+
"&per_page=500"+
"&format=json"+
"&nojsoncallback=1"+
"&auth_token=72157663627636931-ae46ba6fea9b2a1e"+
"&api_sig=bcace3cc573c9b2ed13a1aafeac3d846"




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


