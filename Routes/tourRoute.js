const express = require('express');
const tourController = require('./../controller/tourController');

const router = express.Router();
router.param('id', (req, res, next, val) => {
  console.log(`the ID is :${val}`);
  next();
});

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
