//
var request = require("request")

var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search"+
"&api_key=0cd074c5f7746588e9d018df9ecafb77"+
"&user_id=55336091%40N08&per_page=50"+
"&format=json&auth_token=72157663627636931-ae46ba6fea9b2a1e"+
"&api_sig=fd66e4e1250072b3be95f5220f589921"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})
