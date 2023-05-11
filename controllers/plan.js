const Plan = require("../models/plan");
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getPlanById = (req, res, next, id) => {
  Plan.findById(id)
    .exec((err, plan) => {
      if (err) {
        return res.status(400).json({
          error: "Plan not found in DB",
        });
      }
      req.plan = plan;
      next();
    });
};


exports.createPlan = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      // destructure the fields
      const {name, price, discount} = fields;
  
      if (!name || !price) {
        return res.status(400).json({
          error: "please include all fields",
        });
      }
  
      let plan = new Plan(fields);
  
      plan.save((err, plan) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "failed...",
          });
        }
        res.json(plan);
      });
    });
  };


  const getProductById = (id) => {
    let product = Product.findById(id)
      .exec((err, product) => {
        console.log(product);
        return product;
      });
      //return product;
  };


  exports.getPlan = (req, res) => {
    let productIds = req.plan.products;
    Product.find().where('_id').in(productIds).exec((err, records) => {
      req.plan['products'] = records;
      return res.json(req.plan);
    });
  };
  
  //product listing
  
  exports.getAllPlans = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  
    Plan.find()
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, plans) => {
        if (err) {
          return res.status(400).json({
            error: "No product found",
          });
        }
        res.json(plans);
      });
  };
  
  
  


