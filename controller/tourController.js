const { query } = require('express');
const fs = require('fs');
const Tour = require('./../model/tourModel');

//exports.checkId = (req, res, next, val) => {

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    //BUILDING QUERY
    //1A) Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);

    const tour = JSON.parse(queryStr);

    //1B) Advanced filtering

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b (gte|gt|lte|lt) \b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryStr));

    //2) SORTING

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join('');

      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt');
    }
    ///EXECUTING QUERY

    const tours = await query;

    ///SENDING RESPONSE
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  try {
    const tour = await Tour.find(req.query);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  //const newId = tours[tours.length - 1].id + 1;
  // const newTour = { id: newId, ...req.body };

  // tours.push(newTour);

  //   fs.writeFile(
  //     `${__dirname}/dev-data/data/tours-simple.json`,
  //     JSON.stringify(tours),
  //     (err) => {
  //       res.status(201).json({
  //         status: 'success',
  //       });
  //     }
  //   );
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(404).json({
      status: 'fail',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
