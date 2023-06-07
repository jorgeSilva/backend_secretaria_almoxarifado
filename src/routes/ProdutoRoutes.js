const express = require('express')
const produtoRoutes = express.Router()

const ProdutoController = require('../controller/ProdutoController')

produtoRoutes.post('/produto', ProdutoController.store)

produtoRoutes.put('/produto/:_id', ProdutoController.update)
produtoRoutes.put('/mr/update/:_id', ProdutoController.updateQuantiaProduto)

produtoRoutes.get('/produtos', ProdutoController.getProdutos)
produtoRoutes.get('/secretaria/produtos/:_id', ProdutoController.index)

produtoRoutes.delete('/produtos/deletar/:_id', ProdutoController.destroy)

module.exports = produtoRoutes