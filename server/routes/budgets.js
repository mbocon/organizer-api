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
	let oldDate = req.body.date;
	let month = oldDate.substr(5, 3);
	let day = oldDate.substr(8, 2);
	day = day + '-';
	let year = oldDate.substr(0, 4);
	let newDate = month + day + year;
	req.body.date = newDate;
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

router.put('/:itemId/update', (req, res) => {
	console.log(req.body, 'IS MY UPDATE REQ BODY')
	console.log(req.body.type, 'is req type')
	let oldDate = req.body.date;
	let month = oldDate.substr(5, 3);
	let day = oldDate.substr(8, 2);
	day = day + '-';
	let year = oldDate.substr(0, 4);
	let newDate = month + day + year;
	req.body.date = newDate;
	Budget.findByIdAndUpdate(req.params.itemId, req.body, (err, updated)=>{
		console.log(updated, 'is the updated item')
		res.json('success')
	})
	.catch(err => res.status(400).send(err))
});

module.exports = router;
