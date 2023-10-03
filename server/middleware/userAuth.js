import jwt from 'jsonwebtoken';

export default async function userAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;
        console.log(decodedToken);
        next();
    } catch (error) {
        res.status(404).json({ error: 'User authentication failed!!' });
    }
}
