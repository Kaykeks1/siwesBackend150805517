/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  //user
  'POST /user/signup': {
    controller: 'UserController',
    action: 'signup'
  },

  'POST /user/login': {
    controller: 'UserController',
    action: 'login'
  },

  'POST /user/logout': {
    controller: 'UserController',
    action: 'logout'
  },

  'GET /user/:id': {
    controller: 'UserController',
    action: 'read'
  },

  'PATCH /user/:id': {
    controller: 'UserController',
    action: 'edit'
  },

  //book
  'POST /book': {
    controller: 'BookController',
    action: 'create'
  },

  'GET /book/:id': {
    controller: 'BookController',
    action: 'read'
  },

  'POST /books': {
    controller: 'BookController',
    action: 'list'
  },

  'PATCH /book/:id': {
    controller: 'BookController',
    action: 'edit'
  },

  'DELETE /book/:id': {
    controller: 'BookController',
    action: 'delete'
  },

  //member
  'POST /member': {
    controller: 'MemberController',
    action: 'create'
  },

  'GET /member/:id': {
    controller: 'MemberController',
    action: 'read'
  },

  'POST /members': {
    controller: 'MemberController',
    action: 'list'
  },

  'PATCH /member/:id': {
    controller: 'MemberController',
    action: 'edit'
  },

  'PATCH /member/book/:id': {
    controller: 'MemberController',
    action: 'addBook'
  },

  'DELETE /member/:id': {
    controller: 'MemberController',
    action: 'delete'
  },

  //publisher
  'POST /publisher': {
    controller: 'PublisherController',
    action: 'create'
  },

  'GET /publisher/:id': {
    controller: 'PublisherController',
    action: 'read'
  },

  'POST /publishers': {
    controller: 'PublisherController',
    action: 'list'
  },

  'PATCH /publisher/:id': {
    controller: 'PublisherController',
    action: 'edit'
  },

  'DELETE /publisher/:id': {
    controller: 'PublisherController',
    action: 'delete'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
