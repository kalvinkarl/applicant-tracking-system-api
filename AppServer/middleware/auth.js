const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        let error = new Error('Not Authenticated!');
        error.statusCode = 401;
        throw error;
    }
    //Bearer basdfwkncvkafwa
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        
    } catch (err) {
        err.statusCode = 500;
        
    }
    
}