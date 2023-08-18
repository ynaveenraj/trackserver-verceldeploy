const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, resp, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return resp.status(401).send({ error: 'You must be logged in' });
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'MY_SECRET_KEY', async (error, payload) => {

        if (error) {
            return resp.status(401).send({ error : 'You must be logged in' });
        }

        const { userId } = payload;

        const user = await User.findById(userId);

        if (!user) {
            return resp.status(401).send('You must be logged in!');
        }

        req.user = user;

        next();

    });



};