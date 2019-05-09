/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err));

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = (app) => {
  app
    .route('/api/books')
    .get(async (req, res) => {
      try {
        const data = await Book.find();

        const responseData = data.map(book => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        }));

        res.json(responseData);
      } catch (err) {
        res.status(500).json(err);
      }
    })

    .post(async (req, res) => {
      const { title } = req.body;

      if (!title) {
        res.send('missing title');
        return;
      }

      const newBook = new Book({
        title,
        comments: [],
      });

      try {
        const data = await newBook.save();
        res.json(data);
      } catch (err) {
        res.status(500).json(err);
      }
    })

    .delete(async (req, res) => {
      try {
        const data = await Book.deleteMany();
        res.send('conplete delete successful');
      } catch (err) {
        res.status(500).json(err);
      }
    });

  app
    .route('/api/books/:id')
    .get(async (req, res) => {
      const bookid = req.params.id;

      try {
        const data = await Book.findById(bookid);
        if (data) {
          res.json(data);
        } else {
          res.send('no book exists');
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })

    .post(async (req, res) => {
      const bookid = req.params.id;
      const { comment } = req.body;

      try {
        const data = await Book.findByIdAndUpdate(
          bookid,
          { $push: { comments: comment } },
          { new: true },
        );

        res.json(data);
      } catch (err) {
        res.status(500).json(err);
      }
    })

    .delete(async (req, res) => {
      const bookid = req.params.id;

      try {
        const data = await Book.findByIdAndDelete(bookid);
        res.send(data ? 'delete successful' : 'no book exists');
      } catch (err) {
        res.status(500).json(err);
      }
    });
};
