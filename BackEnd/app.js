// backend/app.js

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
const app = express();
const product = require('./controller/product')
const path = require('path')
const orders = require('./controller/orders')

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Serve static files for uploads and products

if(process.env.Node_ENV !== "PRODUCTION"){
  require("dotenv").config({
    path:"backend/config/.env" ,
  })
}
// Import Routes
const user = require("./controller/user");

// Route Handling
app.use("/api/v2/user", user);

app.use("/api/v2/product", product)

//Serve static files for uploads and products
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));

// Error Handling Middleware
app.use(ErrorHandler);

module.exports = app;