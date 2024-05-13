import bookController from "../controller/book-controller.js";

const apiRoutes = [
    {
        method: 'GET',
        path: '/books',
        handler: bookController.list
    },
    {
        method: 'POST',
        path: '/books',
        handler: bookController.store
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookController.show
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: bookController.update
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: bookController.destroy
    }
];

export { apiRoutes }

