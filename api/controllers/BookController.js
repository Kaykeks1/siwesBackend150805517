/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: async (req, res) => {
        const data = req.body;
        // data.user = req.session.User.id;
        // await Book.create(data, function(err, book){
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(book);
        // })
        try{
            const book = await Book.create(data);
            res.json({...book, ok: true, message: "Book created successfully"});
        }
        catch(error){
            console.log(error);
            res.json({...error, ok: false, message: "Book cannot be created"});
        }
    },

    read: async (req, res) => {
        // await Book.findOne({ user:req.session.User.id }, function(err, book){
        //     if (err) {
        //         return next(err);
        //     }
        //     if (!book) {
        //         return next();
        //     }
        //     res.json(book);//res.send
        // })
        try{
            const book = await Book.findOne({ user:req.body.user, id:req.param('id')});
            res.json(book);
            if (!book){
                console.log('no book');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    list: async (req, res) => {
        // await Book.find({ user:req.session.User.id }, function(err, book){
        //     if (err) {
        //         return next(err);
        //     }
        //     if (!book) {
        //         return next();
        //     }
        //     res.json(book);
        // })
        try{
            // const x= await Book.update({member: {'!=': null }},{available: false});
            // console.log(x)
            // const assignedBooks = await Book.find({ member: {'!=': null}});
            let books = await Book.find({ user:req.body.user}).populate("member");

            const withoutMembers = books.filter(book => (book.member === undefined || book.member ===null))//await Book.find({ member: null});

            const withMembers = books.filter(book => book.member)//books.filter(book => withoutMembers.map(item => item.id !== book));

            const idsWith = withMembers.map(item => item.id);
            const idsWithout = withoutMembers.map(item => item.id);

            await Book.update({id: idsWith}, {available: false})
            await Book.update({id: idsWithout}, {available: true})

            books = await Book.find({ user:req.body.user}).populate("member");

            res.json({books, ok:true, message:"Books retrieved successfully", size: books.length, assignedBooks: withMembers, withoutMembers});
            if (!books){
                console.log('no book');
                res.json({ ok:false, message:"no book"});
            }
        }
        catch(error){
            console.log(error);
            res.json({...error, ok:false, message:"Can't fetch books"});
        }
    },

    edit: async (req, res) => {
        // await Book.update(req.param('id'), req.params.all(), function(err, book){
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(book);
        // })
        try{
            const book = await Book.update(req.param('id'), req.params.all());
            res.json({...book, ok: true, message: "Book Edited successfully"});
        }
        catch(error){
            console.log(error)
            res.json({...error, ok: false, message: "Book cannot be Edited"});
        }
    },

    delete: async (req,res) => {
        try{
            const book = await Book.destroy(req.param('id'));
            res.json({...book, ok: true, message: "Book deleted successfully"});
        }
        catch(error){
            console.log(error)
            res.json({...error, ok: false, message: "Book cannot be deleted"});
        }
    }
};

