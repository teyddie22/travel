const express = require("express");

const {
  aliasingTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTours,
  deleteTours,
  getTourStats,
  getMonthlyPlan,
} = require("./../Controllers/tourController");

const { protect, restrictTo } = require("./../Controllers/authController");

//! Checking the Routes;
const router = express.Router();

//! Aliasing Router

router.route(`/top-5-tours`).get(aliasingTopTours, getAllTours);

//!Aggregation Pipelining

router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);

//! Creating a body middleware;
//* Get and Post
router.route("/").get(protect, getAllTours).post(createTour);

//* Patch,Update,Delete
router
  .route("/:id")
  .patch(updateTours)
  .get(getTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTours);

module.exports = router;
