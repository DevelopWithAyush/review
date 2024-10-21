import { model, Schema, Types } from "mongoose";

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  reviews: [
    {
      type: Types.ObjectId,
      ref: "Review",
    },
  ],
});

export const Business = model("Business", businessSchema);
