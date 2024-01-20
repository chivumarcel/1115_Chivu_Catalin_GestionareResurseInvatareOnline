const {User} = require("../database/models");
const express = require('express');
const app = express();

// get users
app.get('/', async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
});

// post user
app.post("/", async (req, res, next) => {
  try {
    if(req.body.fullname && req.body.password && req.body.email){
      await User.create(req.body);
      res.status(201).json({ message: "User Created!" });
    } else {
      res.status(400).json({ message: "Missing attributes!" });
    }
  } catch (err) {
    next(err);
  }
});
// get user by id
app.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// update user by id
app.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if(user){
      if(req.body.id && req.body.fullname && req.body.password && req.body.email){
        await user.update(req.body);
        res.status(201).json({ message: "Update on user is done." });
      } else {
        res.status(400).json({ message: "Bad request!" });
      }
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// delete user by id
app.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if(user){
     await user.destroy();
        res.status(202).json({ message: "User is deleted :(" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// logout user
app.get("/auth/logout", async (req, res) => {
  if(req.session.id&& req.session.password){
    req.session.reset();
    res.status(200).send({ message: "You have logged out." });
  } else res.status(404).send({ message: "Nobody is logged in." });
});

// get logged user
app.get("/auth/logged", async (req, res) => {
  if(req.session.id&& req.session.password){
    let user = await User.findByPk(req.session.id);
    res.status(200).json(user);
  } else res.status(404).send({ message: "Nobody is logged in." });
});

// login user
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    res.status(403).send({ message: "Invalid credentials." });
  } else {
      if(req.session.id) res.status(403).send({ message: "Log out before logging in." });
     else {
      req.session.id = user.id;
      req.session.password = user.password;
      req.session.email=user.email
      res.status(200).json({ id: user.id });
    }
  }
});

module.exports=app;