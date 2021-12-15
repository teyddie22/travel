const fs = require('fs');

const express = require('express');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//! Get all tours method;
const getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		result: tours.length,
		data: {
			tours,
		},
	});
};

//! Get specific tour  method;
const getTour = (req, res) => {
	console.log(req.params);
	const id = +req.params.id;
	const tour = tours.find((el) => el.id === id);

	//? Params not found ?;
	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id',
		});
	}

	//?Params found ?;
	res.status(200).json({
		status: 'success',
		data: {
			tour,
		},
	});
};

//! Post method;

const createTour = (req, res) => {
	//* Creating a new id for the object;

	const newID = tours[tours.length - 1].id + 1;

	//* Creating a new Tour object
	const newTour = Object.assign({ id: newID }, req.body);
	tours.push(newTour);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour,
				},
			});
		}
	);
};

//! Update tour method;

const updateTours = (req, res) => {
	if (+req.params.id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id',
		});
	}
	res.status(200).json({
		status: 'success',
		data: {
			tours: '<Updated tour....>',
		},
	});
};

//!  Delete Tour method;

const deleteTours = (req, res) => {
	if (+req.params.id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id',
		});
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
};

const router = express.Router();

//* Get and Post
router.route('/').get(getAllTours).post(createTour);

//* Patch,Update,Delete
router.route('/:id').patch(updateTours).get(getTour).delete(deleteTours);

module.exports = router;
