const Router = require("express").Router();
const Book = require("../models/BookModel");

Router
  .get("/", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json({ books });
    } catch (err) {
      console.err(err);
      res.status(404).send("Internal Server Error");
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      res.status(200).json({ book });
    } catch (err) {
      console.error(err);
    }
  });

  module.exports =  Router
