const axios = require('axios');

// Task 10: async callback
function getAllBooks(callback) {
    axios.get('http://localhost:3000/books')
        .then(res => callback(null, res.data))
        .catch(err => callback(err));
}
getAllBooks((err, data) => {
    if (err) console.error(err);
    else console.log("All Books:", data);
});

// Task 11: Promise
function getBookByISBN(isbn) {
    return axios.get(`http://localhost:3000/books/isbn/${isbn}`);
}
getBookByISBN('123')
    .then(res => console.log("Book By ISBN:", res.data))
    .catch(err => console.error(err));

// Task 12: async/await (author)
async function getBooksByAuthor(author) {
    try {
        const res = await axios.get(`http://localhost:3000/books/author/${author}`);
        console.log("Books By Author:", res.data);
    } catch (err) {
        console.error(err);
    }
}
getBooksByAuthor('Author 1');

// Task 13: async/await (title)
async function getBooksByTitle(title) {
    try {
        const res = await axios.get(`http://localhost:3000/books/title/${title}`);
        console.log("Books By Title:", res.data);
    } catch (err) {
        console.error(err);
    }
}
getBooksByTitle('Book A');
