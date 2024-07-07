import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  photoUrl: String,
  subs: [{}],
});

delete mongoose.models.categories;
const Category = mongoose.model("categories", categorySchema);

export default Category;
