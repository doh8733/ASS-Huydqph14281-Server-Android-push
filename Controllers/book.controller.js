const BookModel = require('../models/book.model')
const fs = require('fs')
const {log} = require("debug");
const {resolve} = require('path')
var mkdirp = require('mkdirp');
exports.getListBook = async (req, res, next) => {
    var listBook = await BookModel.find()
    res.render('./book/list-book', {listBook: listBook});
}
exports.getFormImgDetail = async (req,res,next)=>{
    var listImgDetail = await BookModel.findById(req.params.id)

    res.render('./book/img-detail',{listImgDetail: listImgDetail})
}
exports.getFormMangerBook = async (req, res, next) => {
    var listBookManager = await BookModel.find()
    res.render('./book/book-manager', {listBookManager: listBookManager});
}

//ham de hien thi form them
exports.getFormaddbook = (req, res, next) => {
    //  const book = BookModel.findById(req.params.id).exec()
    // // const book = BookModel.findById(req.params.id).exec()
    // //     .catch(err =>{
    // //         console.log(err)
    // //     })
    // // if (book == null){
    // //     console.log('book null')
    // // }
    res.render('./book/add-book',);
}
//ham xu ly viec them vao csdl
exports.postAddBook = async (req, res, next) => {
    console.log(req.body)
    // console.log(req.file);
    // // let condition = {_id: req.params.id}
    // // const  book = await  BookModel.findById(req.params.id).exec()
    // //     .catch(
    // //         err=>{
    // //             console.log(err)
    // //         })
    // //     if (book == null){
    // //         return console.log('null')
    // //     }
    //     const  imageDirParth = resolve(__dirname,'../tmp');
    //     const files = fs.readdirSync(imageDirParth)
    //
    //     // var newNameDirPath = book.name.toLowerCase().replace("","_")
    //     var dir = './public/uploads/' + req.body.name;
    //
    //     if (!fs.existsSync(dir)){
    //         fs.mkdirSync(dir)
    //     }
    //     else {
    //         console.log('ready')
    //     }
    //     var nameImages = [];
    //     await files.forEach((file,index) =>{
    //     fs.rename(imageDirParth + `${file}`,
    //         './public/uploads/' + req.body.name +'/' + req.files[index].originalname,
    //         err => console.log(err)
    //     );
    //     nameImages.push(req.files[index].originalname)
    //
    // })
    // var files_info = req.files;
    //     nameImages = files_info.map(file =>"http://localhost:3000/add/%22 +req.body.name+%27/"+file.originalname)
    //     req.session.listimg = nameImages;
    // fs.rename(req.file.destination + req.file.filename,
    //     '/public/uploads/'+req.file.originalname,
    //     (err)=>{
    //         if (err){
    //             console.log(err)
    //         }
    //     })
    console.log(req.file)
    fs.rename(req.file.destination + req.file.filename,
        './public/uploads/' + req.file.originalname,
        (err) => {
            if (err) {
                console.log(err)
            }
        })



    const objBook = new BookModel(
        {
            name: req.body.book_name,
            price: Number(req.body.book_price),
            author: req.body.book_author,
            upload_multer: "http://10.24.11.27:3000/uploads/" + req.file.originalname,
            // upload_detail : req.file.originalname.upload_detail,
        },

    );
    objBook.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('ghi du lieu thanh cong')

        }
        res.redirect('/book/book-manager')
    })


}
exports.getFormEditBook = async (req, res, next) => {
    console.log(req.params)

    let itemBook = await BookModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    console.log(itemBook)
    if (itemBook == null) {
        res.send('k tim duoc ban gi')
    }
    res.render('./book/edit-book', {itemBook: itemBook})
}
exports.postEditBook = (req, res, next) => {

    console.log(req.body)

    fs.rename(req.file.destination + req.file.filename,
        './public/uploads/' + req.file.originalname,
        (err) => {
            if (err) {
                console.log(err)
            }
        })
    let dieu_kien = {
        _id: req.params.id
    }

    let du_lieu = {
        name: req.body.book_name,
        price: Number(req.body.book_price),
        author: req.body.book_author,
        upload_multer: "http://10.24.11.27:3000/uploads/" + req.file.originalname,

    }
    BookModel.updateOne(dieu_kien, du_lieu, function (err, res) {
        if (err) {
            res.send('loi cap nhap' + err.message)
        }
    })
    res.redirect('/book/book-manager')
}
exports.getFormDeleteBook = async (req, res, next) => {
    console.log(req.params)

    let itemBook = await BookModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    console.log(itemBook)
    if (itemBook == null) {
        res.send('k tim duoc ban gi')
    }
    res.render('./book/delete-book', {itemBook: itemBook})
}
exports.postDeleteBook = (req, res, next) => {
    let dieu_kien = {
        _id: req.params.id
    }
    BookModel.deleteOne(dieu_kien, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('thanh cong')
            res.redirect('/book/book-manager')
        }

    })

}



exports.getFormDetail = async (req, res, next) => {
    console.log(req.params)

    let itemBook = await BookModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    console.log(itemBook)
    if (itemBook == null) {
        res.send('k tim duoc ban gi')
    }
    res.render('./book/book-detail',{itemBook : itemBook})
}
exports.postFormDetail = async (req, res, next) => {

    console.log(req.body)
    console.log(req.file)

    let condition = {_id: req.params.id};
    const comic = await BookModel.findById(req.params.id).exec()
        .catch(err => {
            console.log(err);
        });
    if (comic == null) {
        return console.log("Comic null");
    }
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);

    var newNameDir = comic.name.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;
    // console.log(newNameDir);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }
    let dtt= Date.now();
    var nameImages = [];
    await files.forEach((file, index) => {
        fs.rename(
            imageDirPath + `/${file}`,
            './public/uploads/' + newNameDir + '/'  +dtt+"anh" + index + ".png",
            err => console.log(err)
        )
        //req.files[index].originalname
        // nameImages.push(req.files[index].originalname);
    });

    var files_info = req.files;
    nameImages = files_info.map((file, index) => "http://10.24.11.27:3000/uploads/" + newNameDir + '/'+dtt + "anh" + index + ".png");
    req.session.listimg = nameImages;

    let du_lieu = {
        name: comic.name,
        price: Number(comic.price),
        author: comic.author,
        upload_multer: comic.upload_multer,
        image_detail: nameImages
    }
    BookModel.updateOne(condition, du_lieu, function (err, result) {
        if (err) {
            console.log('loi' + err)
        } else {
            console.log('thanh cong' + result)
        }
        res.redirect('/book/book-manager')
    })


}