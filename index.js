const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/books', bookRoutes);      // Books + Reviews
app.use('/books', reviewRoutes);    // Reviews (protected)
app.use('/users', userRoutes);      // User Register/Login

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
