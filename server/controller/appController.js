/* eslint-disable import/extensions */
/* eslint-disable consistent-return */

import bcrypt from 'bcrypt';
import UserModel from '../model/User.model.js';
/** POST: http://localhost:8000/api/register
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        // eslint-disable-next-line object-curly-newline
        const { username, password, profile, email } = req.body;

        // Check if the username and email already exists
        const existingUsername = await UserModel.findOne({ username });
        const existingEmail = await UserModel.findOne({ email });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already in use' });
        }
        if (existingEmail) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        // Hash the password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || '',
                email,
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({ msg: 'User registered successfully' });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
/** POST: http://localhost:8000/api/login
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
    res.json('login route');
}
/** GET: http://localhost:8000/api/user/example123 */
export async function getUser(req, res) {
    res.json('getUser route');
}
/** PUT: http://localhost:8000/api/updateuser
 * @param: {
  "id" : "<userid>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    res.json('updateUser route');
}
/** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res) {
    res.json('generateOTP route');
}
/** GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res) {
    res.json('verifyOTP route');
}
// successfully redirect user when OTP is valid
/** GET: http://localhost:8000/api/createResetSession */
export async function createResetSession(req, res) {
    res.json('createResetSession route');
}
// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */
export async function resetPassword(req, res) {
    res.json('resetPassword route');
}
