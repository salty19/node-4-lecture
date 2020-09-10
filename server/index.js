require('dotenv').config()

const express = require('express')
const massive = require('massive')
const authController = require('./controllers/authController')

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env 

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('I see the DB, and it opened up my eyes, I saw the db')
    app.listen(SERVER_PORT, () => console.log('WE ARE ON PORT ${SERVER_PORT}!!!'))
})