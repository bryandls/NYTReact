const mongoose = require("mongoose");
const db = require("../models");


newsArticles = {title: "My Fair Lady" , date: "2000", url: "http://mongoosejs.com/docs/queries.html"};



function seedData(newsArticles) {
      
        db.Article.create({newsArticles
        }).then(function (data, err) {
            if (err) {
                console.log("Something went wrong...")
            } else {
                console.log("That worked!")
            }
        })
    }


seedData(newsArticles);