const  mongoose = require('mongoose')
mongoose.connect('mongodb+srv://doh8733:huy123456@cluster0.do5qh.mongodb.net/book')



const bookSchema = new mongoose.Schema({
    name:'String',
    author:'String',
    price:'Number',
    anh_noi_dung_truyen:'String',
    upload_multer:'String',
    image_detail:[String]
})

const Book = mongoose.model('Book',bookSchema)

module.exports= Book;