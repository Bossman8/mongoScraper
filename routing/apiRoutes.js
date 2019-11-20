var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
  app.get("/all", function(req, res) {
    db.Article.find({}, function(err, found) {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });
  app.get("/scrape", function(req, res) {
    axios.get("https://sports.yahoo.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      $("h4").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .parent("a")
          .text();
        result.link = $(this)
          .parent("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });
      res.send("Scrape Complete");
    });
  });
};
