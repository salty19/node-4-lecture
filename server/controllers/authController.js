const bcrypt = require('bcryptjs')

module.exports = {

        /* 
    //TODO We need email and password 
    //TODO Check if the user already exists
    //TODO Salt their password
    //TODO Save the user in the DB
    //TODO Save the user to the session
    //TODO Send back confirmation of signup
    */
    register: async (req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')

        const user = await db.get_user_by_email([email])

        if (user[0]) {
            return res.status(409).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.create_user([email, hash])

        req.session.user = newUser[0]

        res.status(200).send(req.session.user)
    },


    login: async (req, res) => {
/*
    //TODO We need email and password
    //TODO See if the user exists
    //TODO If they don't exist, we reject their request
    TODO Compare their password to the hash
    TODO If there is a mismatch, we reject their request
    TODO Set the user on session
    TODO Send confirmation of login
*/
        const {email, password} = req.body
        const db = req.app.get('db')

        const existingUser = await db.get_user_by_email([email])
        if(!existingUser[0]) {
            return res.status(404).send('User not found')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser[0].hash)
    },
    logout: (req, res) => {},
    getSession: (req, res) => {}
}