const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(403).json({ message: 'User is forbidden from accessing this resource.' });
    } else {
        try {
            //Verify Token
            const decoded = jwt.verify(token, secret);
            //Add user from payload
            req.user = decoded;
            next();
        } catch (ex) {
            res.status(401).json({ message: 'Invalid Token. Please re-authenticate.' })
        }
    }
}

module.exports = auth;