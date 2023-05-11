const express = require("express");
const router = express.Router();

const {
  getPlanById,
  createPlan,
  getPlan,
  getAllPlans
} = require("../controllers/plan");

router.param("planId", getPlanById);

router.post(
  "/plan/create/",
  createPlan
);

router.get("/plan/:planId", getPlan);
router.get("/plans", getAllPlans);

module.exports = router;
