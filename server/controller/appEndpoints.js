/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import UserModel from '../model/User.model.js';
/** Middleware to verify user existence */
export async function verifyUser(req, res, next) {
    try {
        // Determine if the request method is GET or not
        const isGetMethod = req.method === 'GET';

        // Extract the username from either the request body or query parameters
        const username = isGetMethod ? req.query.username : req.body.username;

        // Check if the user exists
        const userExists = await UserModel.findOne({ username });

        if (!userExists) {
            return res.status(404).send({ error: 'User not found!' });
        }

        // Continue to the next middleware
        next();
    } catch (error) {
        return res.status(500).send({ error: 'Authentication Error' });
    }
}
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
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: 'Username not Found' });
        }

        // Compare the provided password with the user's hashed password
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(400).send({ error: 'Password does not Match' });
        }

        // Create a JWT token with user information
        const token = jwt.sign(
            {
                // eslint-disable-next-line no-underscore-dangle
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            // eslint-disable-next-line comma-dangle
            { expiresIn: '24h' }
        );

        // Send a successful login response
        return res.status(200).send({
            msg: 'Login Successful...!',
            username: user.username,
            token,
        });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error! ' });
    }
}
/** GET: http://localhost:8000/api/user/example123 */

export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username) {
            return res.status(400).json({ error: 'Invalid Username' });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Couldn't Find the User" });
        }

        // Remove password from the user object
        const { password, ...rest } = user.toJSON();

        return res.status(200).json(rest);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
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
    try {
        // const { id } = req.query;
        const { userId } = req.user;
        const updateData = req.body;
        const { username } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        // checking existing username
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.status(404).send({ error: 'Username already exist' });
        }

        const result = await UserModel.updateOne({ _id: userId }, updateData);

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'No user record updated' });
        }

        return res.status(200).json({ message: 'User record updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
/** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    res.status(201).send({ code: req.app.locals.OTP });
}
/** GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP, 10) === parseInt(code, 10)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        // console.log(req.app.locals);
        return res.status(201).send({ msg: 'Verify Successsfully!' });
    }
    return res.status(400).send({ error: 'Invalid OTP' });
}
// successfully redirect user when OTP is valid
/** GET: http://localhost:8000/api/createResetSession */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession });
    }
    return res.status(440).send({ error: 'Session expired!' });
}

// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */

export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: 'Session expired!' });
        }

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: 'Username not found' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

            req.app.locals.resetSession = false; // Reset session
            return res.status(201).send({ msg: 'Record Updated...!' });
        } catch (error) {
            return res.status(500).send({ error: 'Unable to hash password' });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}
