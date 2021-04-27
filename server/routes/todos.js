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

router.put('/:userId/:id', (req, res) => {
	Todo.findByIdAndUpdate(req.params.id,  req.body, (err, updatedItem) => {
		if(err) {
			console.log(err, 'is  the  err')
		}
		res.json('successful update')
	})
});

module.exports = router;
