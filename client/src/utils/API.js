import axios from "axios";

// The getArticles method retrieves articles from the server
// It accepts a "query" or term to search the New York Times api for articles with the specified topic, start date and end date

export default {
  // gets the articles saved to the database
  getSavedArticles: function () {
    return axios.get("/api/articles");
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },
  // gets the queried articles from the New York Times api
  getArticles: function (articles) {
    return axios.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
        'q': articles.topic,
        'begin_date': articles.startDate,
        'end_date': articles.endDate,
        'fl': "web_url,heading,pub_date"
      },
    }, function (err, response, body) {
      body = JSON.parse(body);
      console.log(body);
    });
  },
};