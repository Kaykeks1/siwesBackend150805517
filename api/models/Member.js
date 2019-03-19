/**
 * Member.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },

    lastName: {
      type: 'string',
      required: true,
    },

    phoneNumber: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    address: {
      type: 'string',
      required: true,
    },

    dateJoined: {
      type: 'string',
      required: true,
    },

    books: {
      type: 'array',
      defaultsTo: [],
    },

    user: {
      model: 'user',
      required: true,
    },//many side - one user to many members

    book: {
      collection: 'book',
      via: 'member'
    },//one side - one member to many books
  },

  connection: 'mongodb'

};

