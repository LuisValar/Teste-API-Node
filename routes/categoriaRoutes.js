const router = require ('express').Router()
const { append } = require('express/lib/response')
const Categoria = require('../models/categorias')

router.post('/', async (req, res) =>{
    const {name, ident} = req.body
    if(!name){
        res.status(422).json({error: 'É preciso inserir os campos nome e id'})
        return
    }
    const categoria ={
        name,
        ident
    }

    try {
       await Categoria.create(categoria)
       res.status(201).json({message: 'Categoria inserida no sistema!'}) 
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {
    try {
        const categoria = await Categoria.find()

        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({error})        
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id

    try {
        const categoria = await Categoria.findOne({_id: id})

        if(!id){
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({error}) 
    }
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id
    const {name, ident} = req.body

    const categoria ={
        name,
        ident
    }
    try {
        const updateCategoria = await Categoria.updateOne({_id: id}, categoria)
        if(updateCategoria.matchedCount ===0){
            res.status(422).json({message: 'A categoria não foi encontrada'})
            return
        }
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({error}) 
    }

})

router.delete('/', async (req, res) => {
    try {
        const categoria = await Categoria.deleteOne({_id: id})
        if(Produtos.matchedCount > 1){
            res.status(422).json({message: 'A Categoria não pode ser excluida pois possui produtos cadastradas '})
            return
        }
        res.status(200).json({message: 'Categoria excluida'})
    } catch (error) {
        res.status(500).json({error}) 
    }
})

module.exports = router