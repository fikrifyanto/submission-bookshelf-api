import bookService from "../service/book-service.js";

const store = async (request, h) => {
    try {
        const requestData = request.payload;
        const result = await bookService.store(requestData);

        return h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: result.id
            }
        }).code(201);
    } catch (error) {
        return h.response({ status: 'fail', message: error.message }).code(error.status);
    }
};

const list = async (request, h) => {
    try {
        const { name, reading, finished } = request.query;
        const result = await bookService.list(name, reading, finished);

        return h.response({
            status: "success",
            data: {
                books: result
            }
        }).code(200);
    } catch (error) {
        return h.response({ status: 'fail', message: error.message }).code(error.status);
    }
};

const show = async (request, h) => {
    try {
        const { bookId } = request.params;
        const result = await bookService.show(bookId)

        return h.response({
            status: "success",
            data: {
                book: result
            }
        }).code(200);
    } catch (error) {
        console.log(error)
        return h.response({ status: 'fail', message: error.message }).code(error.status);
    }
};

const update = async (request, h) => {
    try {
        const { bookId } = request.params;
        const requestData = request.payload;
        requestData.id = bookId;

        await bookService.update(requestData);

        return h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        }).code(200);
    } catch (error) {
        return h.response({ status: 'fail', message: error.message }).code(error.status);
    }
};

const destroy = async (request, h) => {
    try {
        const { bookId } = request.params;
        await bookService.destroy(bookId);

        return h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        }).code(200);
    } catch (error) {
        return h.response({ status: 'fail', message: error.message }).code(error.status);
    }
};

export default {
    store,
    list,
    show,
    update,
    destroy
};
