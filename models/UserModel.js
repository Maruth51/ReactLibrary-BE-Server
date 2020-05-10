const Mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  first_name: String,
  DOB: Date,
  email: String,
  last_name: String,
  address: {
    street: String,
    city: String,
    zipcode: String
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Book" }]
});

UserSchema.virtual("userName").get(function() {
  return this.first_name + " " + this.last_name;
});

UserSchema.virtual("dob").get(function() {
  return this.DOB;
});

module.exports = Mongoose.model("User", UserSchema);
