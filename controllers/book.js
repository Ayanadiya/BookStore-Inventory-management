const Book=require('../models/book');

exports.postBook= async (req,res)=>{
    try {
        const {title,author,isbn,price,stock}=req.body;
        if(!title || !author || !isbn || !price || !stock)
        {
            res.status(400).json({message:"All fields are required"});
        }
        const book= await Book.create({
           title:title,
           author:author,
           isbn:isbn,
           price:price,
           stock:stock 
        });
        res.status(201).json({book});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.getBooks= async (req, res)=>{
    try {
        const books= await Book.findAll();
        res.status(200).json({books})
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage:"Something went wrong"});
    }
}

exports.getBookById= async (req, res)=>{
    try {
        const id=req.params.id;
        const book= await Book.findAll({where:{id:id}});
        res.status(200).json({book});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.editbook=async (req,res)=>{
    try{
        const {newTitle, newAuthor, newIsbn, newPrice, newStock}=req.body
        const id=req.params.id;
        const book=await Book.findByPk(id)
        book.title=newTitle;
        book.author=newAuthor;
        book.isbn=newIsbn;
        book.price=newPrice;
        book.stock=newStock;
        await book.save();
        res.status(200).json({book});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.updateStock= async(req,res)=>{
    try {
        const id=req.params.id;
        const book= await Book.findByPk(id);
        book.stock=req.body.newStock
        await book.save();
        res.status(200).json({meassage:"Stock updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.deleteBook= async(req,res)=>{
    try {
        const id=req.params.id;
        const book= await Book.findByPk(id);
        await book.destroy();
        res.status(200).json({message:"Book removed successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}