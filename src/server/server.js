const express = require('express')
require('dotenv').config()
const cors = require('cors')
const PORT_SERVER = process.env.PORT_SERVER
const DB_HOST = process.env.DB_HOST
const db = require('../db/db')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const {json} = require('body-parser')
const getUser = require('../utils/index')
const models = require('../db/models/index')
const typeDefs = require('../api/typeDefs/index')
const resolvers = require('../api/resolvers/index')


const startServer = async (PORT_SERVER, DB_HOST) => {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => {
            const token = req.headers.authorization
            const user = getUser(token)
            return {models, user}
    }})
    await apolloServer.start().then(() => console.log("Север Graphql запущен"))
    db.connect(DB_HOST)
    app.listen(PORT_SERVER, () => console.log(`Сервер запущен на ${PORT_SERVER} порту`))
    app.use('/graphql', cors(), json(), expressMiddleware(apolloServer) )
    app.get("/", (req, res) => {
        res.send("Сервер работает")
    })
}

startServer(PORT_SERVER, DB_HOST).then(() => console.log("Сервер запущен"))