var express = require('express');
var router = express.Router();
var  multer = require('multer')
var BookController = require('../Controllers/book.controller')

router.get('/',BookController.getListBook)

router.get('/add',BookController.getFormaddbook);

var upload = multer({dest: './tmp/'})

router.post('/add',upload.single('upload_multer'),BookController.postAddBook);

router.get('/edit/:id',BookController.getFormEditBook);
router.post('/edit/:id',upload.single('upload_multer'),BookController.postEditBook);

router.get('/book-detail/:id',BookController.getFormDetail)
router.post('/book-detail/:id',upload.array('upload_detail'),BookController.postFormDetail)

router.get('/img-detail/:id',BookController.getFormImgDetail)




router.get('/delete/:id',BookController.getFormDeleteBook);
router.post('/delete/:id',BookController.postDeleteBook);

router.get('/book-manager',BookController.getFormMangerBook)

// router.get('/upload-file',BookController.getUploadFile)
// router.post('/upload-file',BookController.postUploadFile)
module.exports = router;