/*
    Metodos HTTP - 
    get - buscar informacao do backend
    post - criar uma informacao no backend
    put - alterar uma informacao do backend
    delele - deletar informacao do backend

*/
/*
    Tipos de parametros- 
    query - parametros nomeados enviados na rota apos ? (filtros, paginacao)
    route - parametros utilizados para identificar recursos
    request body - corpo da requisicao utilizado para criar ou alterar recursos
*/
const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(3333);