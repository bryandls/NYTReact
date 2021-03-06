const router = require("express").Router();
const newsController = require("../../controllers/newsController");

// Matches with "/api/articles"
router.route("/")
  .get(newsController.findAll)
  .post(newsController.create);


// Matches with "/api/books/:id"
router.route("/:id")
  .delete(newsController.remove);

module.exports = router;





