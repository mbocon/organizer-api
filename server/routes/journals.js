const express = require('express');
const router = express.Router();
const { Journal } = require('../models/Journal');
const e = require('express');

//=================================
//             Journals
//=================================

router.get('/:userId/getJournals', (req, res) => {
	Journal.find({}, function (err, journals) {
		if (err) {
			res.send(err);
			return;
		}
		const filteredJournals = journals.filter(journal => journal.user.includes(req.params.userId));
		res.json(filteredJournals);
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
	const journal = new Journal(req.body);
	journal.save((err, journal) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			Journal: journal,
		});
	});
});

router.delete('/delete/:userId/:id', (req, res) => {
	Journal.findById(req.params.id, function (err, item) {
		if (item.user.toString() === req.params.userId) {
			item.remove();
			res.json('Delete success');
		} else {
			res.json('User unauthorized', err);
		}
	});
});

router.put('/:userId/:id', (req, res) => {
	Journal.findByIdAndUpdate(req.params.id, req.body, (err, updatedItem) => {
		if (err) {
			console.log(err, 'is  the  err');
		}
		res.json('successful update');
	});
});

module.exports = router;
