import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    author: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Books", bookSchema);
