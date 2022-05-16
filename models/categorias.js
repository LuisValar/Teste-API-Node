const mongoose = require('mongoose')

const Categoria = mongoose.model('Categoria', {
    name: String,
    id: Number
})

module.exports = Categoria