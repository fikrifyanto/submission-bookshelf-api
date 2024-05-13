import {validate} from "../validation/validation.js";
import {
    storeBookValidation,
    showBookValidation,
    updateBookValidation, deleteBookValidation
} from "../validation/book-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../error/response-error.js";

const store = async (request) => {
    const book = validate(storeBookValidation, request);

    book.finished = book.readPage === book.pageCount;

    return prismaClient.book.create({
        data: book,
        select: {
            id: true,
        }
    });
}

const list = async (name, reading, finished) => {
    let condition = {};
    if(reading !== undefined) condition.reading = parseInt(reading) === 1;
    if(finished !== undefined) condition.finished = parseInt(finished) === 1;
    if(name !== undefined) condition.name = { contains: name };

    return prismaClient.book.findMany({
        where: condition,
        select: {
            id: true,
            name: true,
            publisher: true
        }
    });
}

const show = async (bookId) => {
    bookId = validate(showBookValidation, bookId);

    const book = await prismaClient.book.findFirst({
        where: {
            id: bookId
        },
        select: {
            id: true,
            name: true,
            year: true,
            author: true,
            summary: true,
            publisher: true,
            pageCount: true,
            readPage: true,
            finished: true,
            reading: true,
            insertedAt: true,
            updatedAt: true,
        }
    });

    if (!book) {
        throw new ResponseError(404, "Buku tidak ditemukan");
    }

    return book;
}

const update = async (request) => {
    const book = validate(updateBookValidation, request);

    const totalBookInDatabase = await prismaClient.book.count({
        where: {
            id: book.id
        }
    });

    if (totalBookInDatabase !== 1) {
        throw new ResponseError(404, "Buku tidak ditemukan");
    }

    return prismaClient.book.update({
        where: {
            id: book.id
        },
        data: {
            name: book.name,
            year: book.year,
            author: book.author,
            summary: book.summary,
            publisher: book.publisher,
            pageCount: book.pageCount,
            readPage: book.readPage,
            reading: book.reading,
            finished: book.readPage === book.pageCount
        }
    })
}

const destroy = async (bookId) => {
    bookId = validate(deleteBookValidation, bookId);

    const totalInDatabase = await prismaClient.book.count({
        where: {
            id: bookId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Buku gagal dihapus. Id tidak ditemukan");
    }

    return prismaClient.book.delete({
        where: {
            id: bookId
        }
    });
}

export default {
    store,
    list,
    show,
    update,
    destroy,
}
