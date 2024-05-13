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
        throw error;
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
        throw error;
    }
};

const show = async (request, h) => {
    try {
        const { bookId } = request.params;
        const result = await bookService.show(bookId);

        return h.response({
            status: "success",
            data: {
                book: result
            }
        }).code(200);
    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
    }
};

export default {
    store,
    list,
    show,
    update,
    destroy
};
