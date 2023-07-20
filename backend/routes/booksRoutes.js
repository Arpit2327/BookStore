const router = require('express').Router();
const e = require('express');
const bookModel = require('../models/bookModel');

//POST REQUEST
router.post('/add', async (req, res) => {
    try {
        const newBook = new bookModel(req.body);
        await newBook.save().then(() => {
            res.status(200).json({message: "Book added successfully"});
        });
    } catch (error) {
        console.log(error); 
    }
});

//GET REQUEST
router.get('/getBooks',async (req, res) => {
    let books;
    try {
        books = await bookModel.find();
        res.status(200).json({books});
    } catch (error) {
        console.log(error);
    }
});

//GET REQUEST BY ID
router.get('/getBooks/:id', async (req, res) => {
    let book;
    const id = req.params.id;
    try {
        book = await bookModel.findById(id);
        res.status(200).json({book});

    } catch (error) {
        console.log(error);
    }
});

//UPDATE BOOK BY ID
router.put('/updateBook/:id', async (req,res) => {
    const id = req.params.id;
    const {bookname, description, author,image,price} = req.body;
    let book;
    try {
        book = await bookModel.findByIdAndUpdate(id, {
            bookname,
            description,
            author,
            image,
            price,
        });

        await book.save().then(() => res.status(200).json({message: "Data updated successfully"}));
    } catch (error) {
        
    }
})

//DELETE BOOK BY ID
router.delete('/deleteBook/:id', async (req,res) => {
    const id = req.params.id;
    try {
        await bookModel.findByIdAndDelete(id).then(()=> {
            res.status(200).json({message: "Data deleted successfully"});
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;