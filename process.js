//
var request = require("request")

var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
"&api_key=0b65598faae308e7ad174b21270b3da5"+
"&user_id=55336091%40N08"+
"&per_page=1"+
"&page="+
"&format=json"+
"&nojsoncallback=1"


var ghosturl = "http://178.62.11.184:2368/ghost/api/v0.1/posts?access_token="+
"DkIoDtxEhJ4FDUq24pE2cq8vg2ZMJCV78qMlescLx9SRPP1lL2lg6J32AgLreGwLoWPQMRBju5eq70o87z2A67MWf5EMJGCOXgH2cdquJ1bWlQmP1rL3xWOA9KA6bRpCgHX0bNA9DCXGJM2klmSJ0KFwuvUa0uVtmSoFkYRfFHSChaWtl92uScOG6xlicDXAAu50x8drmSBures6vdM4UJYyOPfMzWAwMGyQtalH2jR8kGVCkf3Mjypt1hh902F"

request({
    url: url,
    json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
      body["photos"]["photo"].forEach(function(photo) {
          var imgurl = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_b.jpg";
          console.log("url:"+imgurl);
          getphotoinfo(photo.id, imgurl);
          
        
        });
  }
    
})

function getphotoinfo(photoid, imgurl){
    var infourl =  "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo"+
    "&api_key=0b65598faae308e7ad174b21270b3da5"+
    "&photo_id="+photoid+
    "&format=json"+
    "&nojsoncallback=1"
    request({
        url: infourl,
        json: true
        }, 
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("info:"+infourl);
                console.log(body.photo.title);
                ghostpost(imgurl, body.photo);
                //console.log(body["photo"].description);
                //console.log(body["photo"].dates.taken);
            }
            
        });
    
}

function ghostpost(image, photo){
    var requestdata = {
            "posts": [
                {
                    "status": "published",
                    "title": photo.title,
                    "markdown": "!["+photo.title+"]("+image+")\n"+
                                photo.description+"\n"+
                                "Taken on "+ photo.dates.taken
                                
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

