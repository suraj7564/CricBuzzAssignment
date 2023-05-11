const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found in DB",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    // destructure the fields
    const { name, description, price} = fields;

    if (!name || !description || !price) {
      return res.status(400).json({
        error: "please include all fields",
      });
    }

    let product = new Product(fields);
    // save into DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "error......",
        });
      }
      res.json(product);
    });
  });
};


exports.getProduct = (req, res) => {
  return res.json(req.product);
};

//product listing

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};


