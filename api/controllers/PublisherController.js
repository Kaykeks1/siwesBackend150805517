/**
 * PublisherController
 *
 * @description :: Server-side logic for managing publishers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: async (req, res) => {
        const data = req.body;
        // data.user = req.session.User.id;
        // await Publisher.create(data, function(err, publisher){
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(publisher);
        // })
        try{
            const publisher = await Publisher.create(data);
            res.json({...publisher, ok: true, message: "Publisher created successfully"});
        }
        catch(error){
            console.log(error);
            res.json({...error, ok: false, message: "Publisher cannot be created"});
        }
    },

    read: async (req, res) => {
        // await Publisher.findOne({ user:req.session.User.id }, function(err, publisher){
        //     if (err) {
        //         return next(err);
        //     }
        //     if (!publisher) {
        //         return next();
        //     }
        //     res.json(publisher);//res.send
        // })
        try{
            const publisher = await Publisher.findOne({ user:req.body.user, id:req.param('id')}).populate('book');;
            res.json(publisher);
            if (!publisher){
                console.log('no publisher');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    list: async (req, res) => {
        // await Publisher.find({ user:req.session.User.id }, function(err, publisher){
        //     if (err) {
        //         return next(err);
        //     }
        //     if (!publisher) {
        //         return next();
        //     }
        //     res.json(publisher);
        // }).populate(publisher)
        try {
            const publishers = await Publisher.find({ user:req.body.user }).populate('book');
            sails.log(publishers);
            res.json({publishers, ok:true, message:"Publishers retrieved successfully", size: publishers.length});
            if (!publishers) {
                sails.log('no publisher')
                res.json({ ok:false, message:"no publisher"});
           }
        } catch (error) {
            console.log('yoyo');
            console.log(error);
            res.json({...error, ok:false, message:"Can't fetch publishers"});

        }
    },

    edit: async (req, res) => {
        // await Publisher.update(req.param('id'), req.params.all(), function(err, publisher){
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(publisher);
        // })
        try{
            const publisher = await Publisher.update(req.param('id'), req.params.all());
            res.json({...publisher, ok: true, message: "Publisher Edited successfully"});
        }
        catch(error){
            console.log(error);
            res.json({...error, ok: false, message: "Publisher cannot be Edited"});
        }
    },

    delete: async (req,res) => {
        try{
            const publisher = await Publisher.destroy(req.param('id'));
            res.json({...publisher, ok: true, message: "Publisher deleted successfully"});
        }
        catch(error){
            console.log(error);
            res.json({...error, ok: false, message: "Publisher cannot be deleted"});

        }
    }
};

