const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  ingredients: { type: String },
  price: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Men', 'Women', 'Unisex'] },
  range: { type: String, default: 'Sensory' },
  genre: { type: String, default: 'French' },
  type: { type: String, default: 'Oriental' },
  season: { type: String, default: 'Summer' },
  sillage: { type: String, default: 'Medium' },
  lasting: { type: String, default: 'Upto 12 hrs' },
  fragranceType: { type: String, required: true },
  concentration: { type: String, default: '50%' },
  stock: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
