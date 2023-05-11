require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// my routes
const productRoutes = require("./routes/product");
const planRoutes = require("./routes/plan");

// DB CONNECTION

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// MIDDLEWARE

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES

app.use("/api", planRoutes);
app.use("/api", productRoutes);

//PORTS
const port = process.env.PORT || 8000;

// STARTING THE SERVER

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
