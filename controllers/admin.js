import Books from "../models/books.js";

export async function createBook(req, res) {
  try {
    const book = await Books.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    const book = await Books.findOne({ _id: id });
    if (!book) {
      throw new Error("Book not found!");
    }
    await Books.updateOne(
      { _id: id },
      {
        $set: {
          ...data,
        },
      }
    );
    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function getOneBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Books.findOne({ _id: id });
    if (!book) {
      throw new Error("Book not found!");
    }
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function getAllBook(req, res) {
  try {
    const books = await Books.find({});
    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Books.findOne({ _id: id });
    if (!book) {
      throw new Error("Book not found!");
    }
    await Books.deleteOne({ _id: id });
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
