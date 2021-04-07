const express = require('express');
const router = express.Router();
const { Todo } = require('../models/Todo');
const e = require('express');

//=================================
//             Todos
//=================================

router.get('/:userId/getTodos', (req, res) => {
	Todo.find({}, function (err, todos) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(todos);
	});
});

// router.get('/:id', (req, res) => {
// 	Budget.findById(req.params.id, function (err, budget) {
// 		if (err) {
// 			res.send(err);
// 			return;
// 		}
// 		res.json(budget);
// 	});
// });

router.post('/create', (req, res) => {
	const todo = new Todo(req.body);
	todo.save((err, todo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			task: todo
		});
	});
});

router.delete('/delete/:userId/:id', (req, res) => {
	Todo.findById(req.params.id, function (err, item) {
		if (item.user.toString() === req.params.userId) {
			item.remove();
			res.json('Delete success');
		} else {
			res.json('User unauthorized', err);
		}
	});
});

// router.put('/:id/:exerciseId', (req, res) => {
// 	Budget.findById(req.params.id)
// 	.then((Budget)=> {
// 		console.log(Budget, 'is the Budget')
// 		console.log(req.params.exerciseId)
// 		Budget.plan.map(exercise => {
// 			console.log(exercise, 'is the exer')
// 			if(exercise._id === req.params.exerciseId){
// 				console.log(exercise, 'is BEFORE')
// 				exercise.activity = req.body.activity;
// 				exercise.distance = req.body.distance;
// 				exercise.sets = req.body.sets;
// 				exercise.reps = req.body.reps;
// 				exercise.weight = req.body.weight;
// 				console.log(exercise, 'is AFTER')
// 				// exercise.save()
// 			}
// 		})
// 		console.log(Budget, 'on 73')
// 		// Budget.save()
// 		// res.send(Budget)
// 	}).then((Budget)=>res.json(Budget.save()))
// 	.catch(err => res.status(400).send(err))
// });

module.exports = router;
