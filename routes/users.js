var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('<h1> day la user</h1>');
// });

const userController = require('../Controllers/user.controller')
const AuthMiddleware = require('../middleware/auth.middleware');

module.exports = router;
router.get('/',AuthMiddleware.RequestLogin,userController.getAllUser)
router.get('/add-user',AuthMiddleware.IsLogin,userController.getFormAddUser)
router.post('/add-user',AuthMiddleware.IsLogin,userController.postAdduser)

router.get('/edit-user/:id',userController.getFormEditUser)
router.post('/edit-user/:id',userController.postEditUser)

router.get('/logout',userController.getLogout);

// router.get('/delete-user/:id',userController.getFormDeleteUser)
router.post('/delete-user',userController.postDeleteUser)

router.get('/login',AuthMiddleware.IsLogin,userController.getFormLogin);
router.post('/login',AuthMiddleware.IsLogin,userController.postLogin);

