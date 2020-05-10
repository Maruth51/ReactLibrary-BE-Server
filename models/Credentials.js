var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CredentialSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  passwordHash: { type: String, required: true },
  password: { type: String },
});

// Virtual for book's URL

//Export model
module.exports = mongoose.model("Cread", CredentialSchema);
