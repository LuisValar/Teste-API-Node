const router = require ('express').Router()
const { append } = require('express/lib/response')
const Produto = require('../models/produtos')

router.post('/', async (req, res) =>{
    const {name, valor, categoria} = req.body
    if(!name){
        res.status(422).json({error: 'É preciso inserir os campos nome e valor'})
        return
    }
    const produtos ={
        name,
        valor, 
        categoria
    }

    try {
       await Produto.create(produtos)
       res.status(201).json({message: 'Produto inserido no sistema!'}) 
       if (!categoria){
        res.status(422).json({message: 'A categoria não foi encontrada'})
        return
       }
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {
    try {
        const produto = await Produto.find()
        res.status(200).json(Produto)
    } catch (error) {
        res.status(500).json({error})        
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id

    try {
        const produto = await Produto.findOne({_id: id})

        if(!id){
            res.status(422).json({message: 'O produto não foi encontrado'})
            return
        }
        res.status(200).json(Produto)
    } catch (error) {
        res.status(500).json({error}) 
    }
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id
    const {name, ident, categoria} = req.body

    const produto ={
        name,
        ident, 
        categoria
    }
    try {
        const updateProduto = await Produto.updateOne({_id: id}, produto)
        if(updateProduto.matchedCount ===0){
            res.status(422).json({message: 'O produto não foi encontrado'})
            return
        }
        res.status(200).json(Produto)
    } catch (error) {
        res.status(500).json({error}) 
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const {name, valor} = req.body
    try {
        const produto = await Produto.deleteOne({_id: id})
        if(produto) 
        res.status(200).json({message: 'Produto excluida'})
    } catch (error) {
        res.status(500).json({error}) 
    }
})

module.exports = router