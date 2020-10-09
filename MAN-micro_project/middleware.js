let jwt = require('jsonwebtoken');
const config = require('./first');

let checkToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        console.log(token);
    }

    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            }   
            else {
                req.decoded = decoded;
                next();    
            }    
        });
    }
    else {
        return res.json({
            success: false,
            message: 'auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}