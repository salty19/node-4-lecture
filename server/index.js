require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
import secretCtrl = require('./controllers/secretsController.js')


const app = express()

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env 
console.log(SERVER_PORT, SESSION_SECRET)
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        COOKIE: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/session', authCtrl.getSession)

app.get('/api/secrets/admin', secretCtrl.getAdminSecret)
app.get('/api/secrets/normal', secretCtrl.getSecret)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('I see the DB, and it opened up my eyes, I saw the db')
    app.listen(SERVER_PORT, () => console.log(`WE ARE ON PORT ${SERVER_PORT}!!!`))
})

