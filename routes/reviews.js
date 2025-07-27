const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const books = require('../data/books.json');

const router = express.Router();

router.post('/:isbn/reviews', auth, (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Ensure reviews array exists
    book.reviews = book.reviews || [];

    const { review } = req.body;
    const existing = book.reviews.find(r => r.userId === req.user.id);

    if (existing) {
        existing.text = review;
        return res.json({ message: "Review updated", reviews: book.reviews });
    } else {
        const newReview = { id: uuidv4(), userId: req.user.id, text: review };
        book.reviews.push(newReview);
        return res.json({ message: "Review added", reviews: book.reviews });
    }
});

router.delete('/:isbn/reviews/:reviewId', auth, (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.reviews = book.reviews || [];
    const index = book.reviews.findIndex(r => r.id === req.params.reviewId && r.userId === req.user.id);
    if (index === -1) return res.status(403).json({ message: "Not authorized to delete this review" });

    book.reviews.splice(index, 1);
    res.json({ message: "Review deleted", reviews: book.reviews });
});

module.exports = router;
