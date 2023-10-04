/* eslint-disable import/extensions */
import { Router } from 'express';

import userAuth, { localVariables } from '../middleware/userAuth.js';
// import all controller
import * as controller from '../controller/appEndpoints.js';

const router = Router();

/** POST Methods */
router.route('/register').post(controller.register); // register user
// router.route('/registerMail').post(); // send the email
router.route('/authenticate').post((req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables
/** PUT Methods */
router.route('/updateuser').put(userAuth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.resetPassword); // use to reset password

export default router;
