const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**************************************************************************: web application :*********************************************************************************** */
/* -------------------------------- signin requests : web application users  --------------------------------  */
router.post('/web/signin', async (req, res) => {
    /*
    {
    "username":"0611175105", 
    "password":"abc", 
    }
     */
    const { username, password } = req.body;
    try {
        /*  user not exist */
        if (username !== "0611175105" || password !== "abc") {
            return res.send({ status: 422, message: 'Invalid username' })
        }
        /* user  exist */
        else {
            try {
                const access_token = jwt.sign({ username, password, name: 'Bhaskar Veligeti', role: 'Administrator' }, 'THEOS');
                // console.log('access_token:',access_token);
                return res.send({ authUser: { token: access_token, username, name: 'Bhaskar Veligeti', role: 'Administrator' } })

            } catch (err) {
                return res.send({ status: 422, message: 'Invalid username and password' })
            }
        }

    } catch (err) {
        // console.log('err:',err);
        return res.send({ status: 500, message: 'Internal Server Error!' })
    }
});

/**************************************************************************: end :*********************************************************************************** */

module.exports = router;


