const express = require('express')
const { default: mongoose } = require('mongoose')
const { allowedNodeEnvironmentFlags } = require('process')
const app = express()

app.use(
    express.urlencoded({
        extende: true,
    }),
)

app.use(express.json())

const categoriaRoutes = require('./routes/categoriaRoutes')
const produtosRoutes = require('./routes/produtosRouter')
app.use('/categorias', categoriaRoutes)
app.use('/produtros', produtosRoutes)

const DB_USER = 'luisvalar'
const DB_PASSWORD = encodeURIComponent('Valar1812@')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.lxbbt.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000)
})
.catch((err)=> console.log(err))
app.listen(3000)
