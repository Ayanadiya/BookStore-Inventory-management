const Book=require('../models/book');

exports.postBook= async (req,res)=>{
    try {
        const {title,author,isbn,price,stock}=req.body;
        if(!title || !author || !isbn || !price || !stock)
        {
            res.status(400).json({message:"All fields are required"});
        }
        const book= await Book.create({
            
        })
    } catch (error) {
        
    }
}