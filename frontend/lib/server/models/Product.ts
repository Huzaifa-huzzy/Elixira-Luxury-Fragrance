import mongoose, { Model, Schema, Types } from "mongoose";

interface Review {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductDocument {
  user: Types.ObjectId;
  name: string;
  images: string[];
  description: string;
  ingredients?: string;
  price: number;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  range?: string;
  genre?: string;
  type?: string;
  season?: string;
  sillage?: string;
  lasting?: string;
  fragranceType: string;
  concentration?: string;
  stock: number;
  reviews: Review[];
  rating: number;
  numReviews: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new Schema<Review>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const productSchema = new Schema<ProductDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    ingredients: { type: String },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Men", "Women", "Unisex"] },
    range: { type: String, default: "Sensory" },
    genre: { type: String, default: "French" },
    type: { type: String, default: "Oriental" },
    season: { type: String, default: "Summer" },
    sillage: { type: String, default: "Medium" },
    lasting: { type: String, default: "Upto 12 hrs" },
    fragranceType: { type: String, required: true },
    concentration: { type: String, default: "50%" },
    stock: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const Product =
  (mongoose.models.Product as Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
