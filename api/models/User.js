/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    libraryName: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    online: {
      type: 'boolean',
      defaultsto: false
    },

    phoneNumber: {
      type: 'string',
      required: true
    },

    encryptedPassword: {
      type: 'string'
    },

    toJSON: function(){//this method will be called before any data goes to the client
      var obj = this.toObject();
      delete obj.password;
      delete obj.encryptedPassword;
      // delete obj._csrf;
      return obj;
    }

    // publisher: {
    //   collection: 'publisher',
    //   via: 'user'
    // },//one side - one user to many publishers

    // book: {
    //   collection: 'book',
    //   via: 'user'
    // },//one side - one user to many books

    // member: {
    //   collection: 'member',
    //   via: 'user'
    // },//one side - one user to many members
  },
  
  beforeCreate: function(values, next){
    if (!values.password){
      return next({err:["Password dones't match password confirmation."]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  },

  connection: 'mongodb'
};

