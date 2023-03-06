const router = require("express").Router();
const db = require("../models");

// GET /books to get all books
router.get("/", async (req, res) => {
  try {
    const books = await db.Books.find().orFail();
    res.json(books);
  } catch (error) {
    res.status(400).send(error).json({ message: "BOOKS WERE NOT FOUND" });
  }
});

// GET /books/:id to get a book
router.get("/:id", async (req, res) => {
  try {
    const book = await db.Books.findById(req.params.id).orFail();
    res.json(book);
  } catch (error) {
    res.status(400).send(error).json({ message: "BOOK WAS NOT FOUND" });
  }
});

// POST /books to create a book
router.post("/", async (req, res) => {
  try {
    const book = await db.Books.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).send(error).json({ message: "BOOK WAS NOT CREATED" });
  }
});

// PUT /books/:id to update a book
router.put("/:id", async (req, res) => {
  try {
    const book = await db.Books.updateOne(
      { _id: req.params.id },
      req.body
    ).orFail();
    res.json(book);
  } catch (error) {
    res.status(400).send(error).json({ message: "BOOK WAS NOT UPDATED" });
  }
});

// DELETE /books/:id to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await db.Books.deleteOne({ _id: req.params.id }).orFail();
    res.json({ message: "Book was deleted" });
  } catch (error) {
    res.status(400).send(error).json({ message: "BOOK WAS NOT DELETED" });
  }
});

module.exports = router;
