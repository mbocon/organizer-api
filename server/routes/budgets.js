const express = require('express');
const router = express.Router();
const { Budget } = require('../models/Budget');
const e = require('express');

//=================================
//             Budget
//=================================

router.get('/:userId/getBudgets', (req, res) => {
	Budget.find({}, function (err, budgets) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(budgets);
	});
});

router.get('/:id', (req, res) => {
	Budget.findById(req.params.id, function (err, budget) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(budget);
	});
});

router.post('/create', (req, res) => {
	console.log(req.body, 'from create Budget route');
	const budget = new Budget(req.body);

	budget.save((err, budget) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			Budget: budget,
		});
	});
});

router.delete('/delete/:userId/:id', (req, res) => {
	Budget.findById(req.params.id, function (err, item) {
		if (item.user.toString() === req.params.userId) {
			item.remove();
			res.json('Delete success');
		} else {
			res.json('User unauthorized', err);
		}
	});
});

router.put('/:id/:exerciseId', (req, res) => {
	Budget.findById(req.params.id)
	.then((Budget)=> {
		console.log(Budget, 'is the Budget')
		console.log(req.params.exerciseId)
		Budget.plan.map(exercise => {
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
		console.log(Budget, 'on 73')
		// Budget.save()
		// res.send(Budget)
	}).then((Budget)=>res.json(Budget.save()))
	.catch(err => res.status(400).send(err))
});

module.exports = router;
