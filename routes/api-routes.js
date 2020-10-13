const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.get("/api/test", function (req, res) {
    res.json({ Result: "OK! React can connect to the backend server." });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
       res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  // userTypes
  // 1 - user
  // 2 - brewery
  // 3 - admin
  app.post("/api/signup", (req, res) => {
    db.User.create({
      userType: req.body.userType,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => res.end())
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Routes for page redirection
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res, next) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({user:null});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        user: req.user
      });
    }
  });

  // blog posts crud starts here
  // GET route for getting all of the posts
  app.get("/api/posts", (req, res) => {
    //Get all posts that belong to the current user
    db.Post.findAll({
      where: {
        id: req.body.id
      }
    }).then(userposts => {
      res.json(userposts);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", (req, res) => {
    db.Post.create({
      body: req.body.body,
      UserId: req.body.id
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.json(data).end();
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data).end();
    });
  });
}
