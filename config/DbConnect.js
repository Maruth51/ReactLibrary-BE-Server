const Mongoose = require("mongoose");

//Mongoose.connect(process.env.MONGO_URL);
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://Maruth51:a7PzyvtM2wbLCWji@cluster0-qofv3.gcp.mongodb.net/ReactLibrary?retryWrites=true&w=majority";
Mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
const db = Mongoose.connection;

db.then(result => {
  console.log("Connected to DB:", result.name);
}).catch(err => {
  console.log("DB Connection Failed");
});

module.exports = db;
