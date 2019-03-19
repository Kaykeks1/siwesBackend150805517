/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
    },

    author: {
      type: 'string',
      required: true,
    },

    price: {
      type: 'decimal',
      required: true,
    },

    available: {
      type: 'boolean',
      required: true,
    },

    user: {
      model: 'user',
      required: true,
    },//many side - one user to many books

    publisher: {
      model: 'publisher'
    },//many side - one publisher to many books

    member: {
      model: 'member'
    },//many side - one member to many books
  },

  connection: 'mongodb'

};

