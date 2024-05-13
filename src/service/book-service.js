import {validate} from "../validation/validation.js";
import {
    deleteBookValidation,
    showBookValidation,
    storeBookValidation,
    updateBookValidation
} from "../validation/book-validation.js";
import {ResponseError} from "../error/response-error.js";
import { nanoid } from 'nanoid'

let books = []

const store = async (request) => {
    const book = validate(storeBookValidation, request);

    book.id = nanoid()
    book.finished = book.readPage === book.pageCount;
    book.insertedAt = new Date();
    book.updatedAt = new Date();

    books.push(book)

    return book
}

const list = async (name, reading, finished) => {
    let list = books

    if(name !== undefined) {
        list = list.filter(item => {
            return item.name.toLowerCase().includes(name)
        })
    }

    if(reading !== undefined) {
        list = list.filter(item => {
            return item.reading === (parseInt(reading) === 1)
        })
    }

    if(finished !== undefined) {
        list = list.filter(item => {
            return item.finished === (parseInt(finished) === 1)
        })
    }

    return list.map((item) => {
        return {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
        }
    })
}

const show = async (bookId) => {
    bookId = validate(showBookValidation, bookId);

    const book = books.filter(item => {
        return item.id === bookId;
    })

    if (book.length !== 1) {
        throw new ResponseError(404, "Buku tidak ditemukan");
    }

    return book[0];
}

const update = async (request) => {
    let book = validate(updateBookValidation, request);

    const totalBookInDatabase = books.filter(item => {
        return item.id === book.id;
    })

    if (totalBookInDatabase.length !== 1) {
        throw new ResponseError(404, "Gagal memperbarui buku. Id tidak ditemukan");
    }

    book.finished = book.readPage === book.pageCount;
    book.updatedAt = new Date();
    books = books.map(item => {
        if (item.id === book.id) {
            return {...item, ...book};
        }
        return item;
    })

    return book
}

const destroy = async (bookId) => {
    bookId = validate(deleteBookValidation, bookId);

    const existBook = books.filter(item => {
        return item.id === bookId;
    })

    if (existBook.length !== 1) {
        throw new ResponseError(404, "Buku gagal dihapus. Id tidak ditemukan");
    }

    books = books.filter(item => {
        return item.id !== bookId
    });

    return existBook[0]
}

export default {
    store,
    list,
    show,
    update,
    destroy,
}
