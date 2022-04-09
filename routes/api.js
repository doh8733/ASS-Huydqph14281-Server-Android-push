var express = require('express');
var router = express.Router();

const  mongoose = require('mongoose')
const apitruyen = require('../Controllers/ApiTruyen')
const  auth = require('../middleware/api.auth.midlware')
router.get('/',(req,res,next)=>{
    res.send('well com top API')
})

router.get('/books',apitruyen.getListAPI);
router.get('/books/:id',apitruyen.getOneAPI);
router.post('/req',apitruyen.postReq);
router.post('/login', apitruyen.postLogin);
router.get('/profile',auth,apitruyen.getProfile)
router.post('/logout',auth,apitruyen.postLogout )
router.post('/logout-all',auth,apitruyen.postLogoutAll)
module.exports = router;