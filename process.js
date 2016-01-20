//
var feed = require("feed-read");
feed("https://api.flickr.com/services/feeds/photos_public.gne?id=55336091@N08&lang=en-us&format=rss_200", function(err, articles) {
  if (err) throw err;
  articles.forEach(function(article) {
    console.log(article.title);
  });
  // Each article has the following properties:
  // 
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  // 
});
