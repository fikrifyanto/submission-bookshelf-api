import express from "express";
import bookController from "../controller/book-controller.js";

const app = new express.Router();

app.post('/books', bookController.store);
app.get('/books', bookController.list);
app.get('/books/:bookId', bookController.show);
app.put('/books/:bookId', bookController.update);
app.delete('/books/:bookId', bookController.destroy);

export { app }
