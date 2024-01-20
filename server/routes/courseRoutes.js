const { Course, User } = require("../database/models");
const express = require('express');
const { authMiddleware } = require("./authMiddleware");
const app = express();

// get courses
app.get('/all', async (req, res, next) => {
    try {
      const courses = await Course.findAll();
      res.status(200).json(courses);
    } catch (err) {
      next(err);
    }
});
//gets all courses of a logged user
app.get('/mine',authMiddleware,async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.id);
      if (user) {
        const courses =  await  user.getCourses(); 
        if(courses && courses.length>0){
          res.json(courses);
        }
        else res.status(204).json({ message: "No courses." });
      } else res.status(404).json({ message: "Nobody is logged in." });
  } catch (err) {
    next(err);
  }
}); 
//gets all courses of a certain user
app.get('/:userId',async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
      if (user) {
        const courses =  await  user.getCourses(); 
        if(courses && courses.length>0){
          res.json(courses);
        }
        else res.status(204).json({ message: "No courses." });
      } else res.status(404).json({ message: "Nobody is logged in." });
  } catch (err) {
    next(err);
  }
}); 
// post course
app.post("/", async (req, res, next) => {
  try {
    if(req.body.name  && req.body.content){
      await Course.create(req.body);
      res.status(201).json({ message: "Course Created!" });
    } else {
      res.status(400).json({ message: "Bad request!" });
    }
  } catch (err) {
    next(err);
  }
});
// get course by id
app.get('/get/:courseId', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if(course){
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: "Course not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// update course by id
app.put("/:courseId", async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if(course){
      if( req.body.name && req.body.content){
        await course.update(req.body);
        res.status(201).json({ message: "Update on course is done." });
      } else {
        res.status(400).json({ message: "Bad request!" });
      }
    } else {
      res.status(404).json({ message: "Course not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// delete course by id
app.delete("/:courseId", async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if(course){
     await course.destroy();
        res.status(202).json({ message: "Course is gone :(" });
    } else {
      res.status(404).json({ message: "Course not found!" });
    }
  } catch (err) {
    next(err);
  }
});
// registering user for a course
app.post("/register/:courseId", authMiddleware,async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if(!course) res.status(404).json({ message: "Course not found!" });
    const user = await User.findByPk(req.session.id);
    if(!user) res.status(404).json({ message: "User not found!" });
    user.addCourse(course);
    await user.save();
    res.status(200).json({ message: `User ${req.session.id} registered for course ${req.params.courseId}` });
  } catch (err) {
    next(err);
  }
});
// registering user for a course
app.post("/register/:courseId/users/:userId",async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if(!course) res.status(404).json({ message: "Course not found!" });
    const user = await User.findByPk(req.params.userId);
    if(!user) res.status(404).json({ message: "User not found!" });
    user.addCourse(course);
    await user.save();
    res.status(200).json({ message: `User ${req.params.userId} registered for course ${req.params.courseId}` });
  } catch (err) {
    next(err);
  }
});
// unregistering user from a course
app.delete("/unregister/:courseId",authMiddleware, async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if(!course) res.status(404).json({ message: "Course not found!" });
    const user = await User.findByPk(req.session.id);
    if(!user) res.status(404).json({ message: "User not found!" });
    if(await user.hasCourse(course)){
      user.removeCourse(course);
      await user.save();
      res.status(200).json({ message: `User ${req.session.id} unregistered from course ${req.params.courseId}` });
    } else res.status(404).json({ message: "User is not registered for such course!" });
  } catch (err) {
    next(err);
  }
});
module.exports=app;