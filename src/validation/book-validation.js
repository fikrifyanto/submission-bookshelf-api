import Joi from "joi";

const storeBookValidation = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
    }),
    year: Joi.number().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    publisher: Joi.string().required(),
    pageCount: Joi.number().required(),
    readPage: Joi.number().required(),
    reading: Joi.boolean().required()
}).custom((value, helpers) => {
    const { pageCount, readPage } = value;

    if (readPage > pageCount) {
        return helpers.message({
            custom: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }

    return value;
})

const showBookValidation = Joi.string().required().messages({
    'number.base': 'Buku tidak ditemukan'
});

const updateBookValidation = Joi.object({
    id: Joi.string().required().messages({
        'number.base': 'Gagal memperbarui buku. Id tidak ditemukan'
    }),
    name: Joi.string().required().messages({
        'any.required': 'Gagal memperbarui buku. Mohon isi nama buku',
    }),
    year: Joi.number().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    publisher: Joi.string().required(),
    pageCount: Joi.number().required(),
    readPage: Joi.number().required(),
    reading: Joi.boolean().required()
}).custom((value, helpers) => {
    const { pageCount, readPage } = value;

    if (readPage > pageCount) {
        return helpers.message({
            custom: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }

    return value;
})

const deleteBookValidation = Joi.string().required().messages({
    'number.base': 'Buku gagal dihapus. Id tidak ditemukan'
});

export {
    storeBookValidation,
    showBookValidation,
    updateBookValidation,
    deleteBookValidation
}
