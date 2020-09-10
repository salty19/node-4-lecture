
module.exports = {

    getAdminSecret: (req, res) => {
        res.status(200).send('You are an admin, here is the secret')
    },

    getSecret: (req, res) => {
        res.status(200).send('You are loggedin, here is your secret')
    },
}