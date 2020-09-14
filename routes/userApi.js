/** 
 * @route POST api/users - Register
 * @route GET api/users?page=1&limit=20
 * @route GET api/users/me - Get current user
 * @route POST api/users/me/avatar - Upload avatar
 * @route POST api/users/me/cv - Upload CV
 * @route PUT api/users/me - Update user info
 * @route PUT api/users/me/password - Change Password
 */

 /**
  * @route POST api/users - Register
  * @description Register a new user
  * @access Public
  */

router.post('/register', userController.register);