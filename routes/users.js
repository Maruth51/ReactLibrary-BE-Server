var Router = require("express").Router();
const User = require("../models/UserModel");
const Book = require("../models/BookModel");

/* GET users listing. */
Router.get("/books", async (req, res) => {
  try {
    const { email } = req.decode;
    const user = await User.findOne({ email }, "books").populate("books");
    res.send({ status: "Success", books: user.books });
  } catch {
    res.status(500);
  }
})
  .get("/cart", async (req, res) => {
    try {
      const { email } = req.decode;
      const user = await User.findOne({ email: email }, "cart").populate(
        "cart"
      );
      res.send({ status: "Success", cart: user.cart });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  })
  .post("/cart", async (req, res) => {
    try {
      const { bookId } = req.body;
      const { email } = req.decode;
      const user = await User.findOne({ email: email });
      if (user.books.includes(bookId) || user.cart.includes(bookId)) {
        res.send({ status: "exsist" });
      } else {
        const book = await Book.findById(bookId);
        if (book.count) {
          await User.findOneAndUpdate(
            { email: email },
            {
              $push: { cart: bookId }
            }
          );

          await Book.findByIdAndUpdate(bookId, {
            $inc: { count: -1 }
          });
          res.send({ status: "Success" });
        } else {
          res.send({ status: "Unavailable" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  })
  .patch("/cart", async (req, res) => {
    try {
      const { bookId } = req.body;
      const { email } = req.decode;
      //add bookid to user cart and update count by -1 in book collection
      await User.updateOne({ email: email }, { $pull: { cart: bookId } });
      await Book.findByIdAndUpdate(bookId, {
        $inc: { count: 1 }
      });
      res.send({ status: "Success" });
    } catch (e) {
      console.log(e);
      res.status(500).send("Network Error");
    }
  })
  .patch("/book", async (req, res) => {
    try {
      const { email } = req.decode;
      //get the user cart
      const user = await User.findOne({ email: email }, "cart");
      //add books from cart to users book array
      await User.updateOne(
        { email: email },
        { $push: { books: { $each: user.cart } } }
      );
      //update cart to null
      await User.findOneAndUpdate({ eamil: email }, { cart: [] });
      res.send({ status: "Success" });
    } catch (e) {
      console.log(e);
      res.status(500).send("Network Error");
    }
  })
  .patch("/returnbook", async (req, res) => {
    try {
      const { email } = req.decode;
      const { bookId } = req.body;
      //remove book from user books array
      await User.findOneAndUpdate({ email }, { $pull: { books: bookId } });
      //increment book count by 1 in the book collection
      await Book.findByIdAndUpdate(bookId, {
        $inc: { count: 1 }
      });
      res.send({ status: "Success" });
    } catch (e) {
      console.log(e);
      res.status(500).send("Network Error");
    }
  });

module.exports = Router;
