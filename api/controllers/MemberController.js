/**
 * MemberController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: async (req, res) => {
        const data = req.body;
        // data.user = req.session.User.id;
        // await Member.create(data, function(err, member){
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(member);
        // })
        try{
            const member = await Member.create(data);
            res.json({...member, ok: true, message: "Member created successfully"});
        }
        catch(error){
            res.json({...error, ok: false, message: "Member cannot be created"});
        }
    },

    read: async (req, res) => {
        // await Member.findOne({ user:req.session.User.id }, function(err, member){
        //     if (err) {
        //         return next(err);
        //     }
        //     if (!member) {
        //         return next();
        //     }
        //     res.json(member);//res.send
        // })
        try{
            const member = await Member.findOne({ user:req.body.user, id:req.param('id')}).populate('book');;
            res.json(member);
            if (!member){
                console.log('no member');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    list: async (req, res) => {
        // await Member.find({ user:req.session.User.id }, function(err, member){
        //     if (err) {
        //         return next(err);
        //     }
        //     if (!member) {
        //         return next();
        //     }
        //     res.json(member);
        // })
        try{
            const members = await Member.find({ user:req.body.user}).populate('book');;
            res.json({members, ok:true, message:"Members retrieved successfully", size: members.length});
            if (!members){
                console.log('no member');
                res.json({ ok:false, message:"no member"});
            }
        }
        catch(error){
            console.log(error);
            res.json({...error, ok:false, message:"Can't fetch members"});

        }
    },

    edit: async (req, res) => {
        // await Member.update(req.param('id'), req.params.all(), function(err, member){
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(member);
        // })
        try{
            const member = await Member.update(req.param('id'), req.params.all());
            res.json({...member, ok: true, message: "Member Edited successfully"});
        }
        catch(error){
            console.log(error);
            res.json({...error, ok: false, message: "Member cannot be Edited"});
        }
    },

    addBook: async (req, res) => {
        try{
            const data = req.params.all();
            const book = data.books.map(item => (item.id));
            const member = await Member.update(req.param('id'), { ...req.params.all(), book });
            res.json({...member, ok: true, message: "Book Added successfully"});
        }
        catch(error){
            console.log(error);
            res.json({...error, ok: false, message: "Book cannot be Added"});
        }
    },

    delete: async (req,res) => {
        try{
            const member = await Member.destroy(req.param('id'));
            res.json({...member, ok: true, message: "Member deleted successfully"});
        }
        catch(error){
            console.log(error)
            res.json({...error, ok: false, message: "Member cannot be deleted"});

        }
    }
};

