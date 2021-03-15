/*
This is a function that's going to take an incoming request and do some kind of pre processing on it.

So inside of this middleware function we're going to make sure that the user includes some token and

if they do we will allow them to access some given route inside our application.

Otherwise if there is not a valid Jason web token we're going to reject the request and send an error

back to the user.

*/


/**
 * i used async  because of performance and memory efficiency.
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // step 1: extract the jwt genarated token that user share with Express API

    const { authorization } = req.headers;
    // authorization looks like  ==== Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDUwNjM0NjZkZjY5MzFlNzhiMjg5MTQiLCJpYXQiOjE1NjU1NDkzODJ9._3AiMjHGoGItf_bggcfxYiVSFJUyScluT1fY9xOg3E0

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' })
    }

    const token = authorization.replace('Bearer ', '');

    // step 2:token verification
    jwt.verify(token, 'THEOS', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' })
        }
        /*
        payload: { userId: '5d95efe1e1a358576cf2d1eb',
          username: '0611175105',
          role: 'SuperUser',
          iat: 1570184746 }
        */
        next();   //  everthing  is ok,go ahead
    })
}




