import Books from "../models/books.js";
export async function search(req, res) {
  try {
    const { term, filters } = req.query;

    const matchQuery = {
      $match: {},
    };

    if (filters.price) {
      matchQuery.$match = {};
    }

    const data = await Books.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: `${term}`, $options: "i" } },
            { author: { $regex: `${term}`, $options: "i" } },
          ],
        },
      },
    ]);
    // const aggregateQuery = [
    res.status(200).send(data);
    // ]
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
