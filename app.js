const express = require("express");
const db = require("./config/DbConnect");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const bookRouter = require("./routes/bookRouter");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const authMiddleware = require("./middlewares/authMiddleware");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/book", bookRouter);
app.use("/user", authMiddleware, userRouter);

const server = app.listen(process.env.port || 3000, () => {
  console.log(`server runnin on ${server.address().port} `);
});
