import bookService from "../service/book-service.js";

const store = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await bookService.store(request);
        res.status(201).json({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: result.id
            }
        })
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const name = req.query.name;
        const reading = req.query.reading;
        const finished = req.query.finished;

        const result = await bookService.list(name, reading, finished);
        res.status(200).json({
            status: "success",
            data: {
                books: result
            }
        })
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const result = await bookService.show(bookId);
        res.status(200).json({
            status: "success",
            data: {
                book: result
            }
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const request = req.body;
        request.id = bookId;

        await bookService.update(request);
        res.status(200).json({
            status: "success",
            message: "Buku berhasil diperbarui"
        })
    } catch (e) {
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;

        await bookService.destroy(bookId);
        res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus"
        })
    } catch (e) {
        next(e);
    }
}

export default {
    store,
    list,
    show,
    update,
    destroy
}
