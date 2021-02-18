const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const hpp = require("hpp");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());

// import Routes
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRoutes");
const orderRouter = require("./routes/orderRouter");
const cartRouter = require("./routes/cartRouter");

// Using These route
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);

app.use(express.static("client/build"));
app.use(express.static("booksappimages"));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(function (err, req, res, next) {
	res
		.status(err.status || 500)
		.json({ success: false, message: "Internal Server Error! Try later." });
});

module.exports = app;
