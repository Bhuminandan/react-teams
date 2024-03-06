const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    console.log("inside auth")

    try {

        const token = req.headers.cookie.split("=")[1];

        if (!token) {
            res.status(401).json({ message: 'Headers not found' });
        }

        const decodedToken = await jwt.verify(
            token,
            "RANDOM-TOKEN"
        );


        if (!decodedToken) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const user = decodedToken;
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}