const express = require('express');
const router = express.Router();
const { Workout } = require('../models/Workout');
const e = require('express');

//=================================
//             WORKOUTS
//=================================

router.get('/getworkouts', (req, res) => {
	Workout.find({}, function (err, workouts) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(workouts);
	});
});

router.get('/:id', (req, res) => {
	Workout.findById(req.params.id, function (err, workout) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(workout);
	});
});

router.post('/create', (req, res) => {
	console.log(req.body, 'from create workout');
	const workout = new Workout(req.body);

	workout.save((err, workout) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			workout: workout,
		});
	});
});

router.delete('/:userId/:id', (req, res) => {
	Workout.findById(req.params.id, function (err, post) {
		if (post.user.toString() === req.params.userId) {
			post.remove();
			res.json('Delete success');
		} else {
			res.json('User unauthorized');
		}
	});
});

router.put('/:id/:exerciseId', (req, res) => {
	Workout.findById(req.params.id)
	.then((workout)=> {
		console.log(workout, 'is the workout')
		console.log(req.params.exerciseId)
		workout.plan.map(exercise => {
			console.log(exercise, 'is the exer')
			if(exercise._id === req.params.exerciseId){
				console.log(exercise, 'is BEFORE')
				exercise.activity = req.body.activity;
				exercise.distance = req.body.distance;
				exercise.sets = req.body.sets;
				exercise.reps = req.body.reps;
				exercise.weight = req.body.weight;
				console.log(exercise, 'is AFTER')
				// exercise.save()
			}
		})
		console.log(workout, 'on 73')
		// workout.save()
		// res.send(workout)
	}).then((workout)=>res.json(workout.save()))
	.catch(err => res.status(400).send(err))
});

module.exports = router;
