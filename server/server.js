const express = require('express');
const cors = require("cors");
// initializing variables 
const sequelize = require('./database/sequelize');
const port = 3000;
const session = require("client-sessions");
const client = "http://localhost:3001";
const { User, Course} = require('./database/models');
const users = require('./routes/userRoutes');
const courses = require('./routes/courseRoutes');

// initializing server
const server = express();
server.use(express.urlencoded({ extended: true, }) );
server.use(express.json());

server.listen(port, function() {
    console.log("Listening on port " + port + "...");
});

// defining relations:
Course.belongsToMany(User, {through: 'registrations'});
User.belongsToMany(Course, {through: 'registrations'});

// for authorization: 
server.use(function (req, res, next) { // ading data in Headers ( view in Postman -> Headers )
    res.header("Access-Control-Allow-Origin", client);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  
  // configuration for caches 
  server.options("*", cors({ origin: client }));
  server.get("/*", (req, res, next) => {
    res.header("Cache-Control", "no-cache, no-store");
    next();
  });
  
  // adding cookies, secretkey, duration of authentication to server
  server.use(
    session({
      cookieName: "session",
      secret:
      "k5nasdf9fhq93j20odfahboweknb90x",
      duration: 6100000,
      activeDuration: 20000,
      httpOnly: true,
      ephemeral: true,
    })
  );

  // route for creating the database with sequelize models
server.get("/create", async (req, res, next) => {
    try {
      await sequelize.sync({ force: true });
      res.status(201).json({ message: "Database created." });
    } catch (err) {
      next(err);
    }
});

// Răspuns pentru calea de bază '/'
server.get('/', (req, res) => {
  res.send('Bun venit la serverul meu Express!');
});

// adding created routes
server.use('/users',users);
server.use('/courses',courses);