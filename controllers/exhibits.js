const cloudinary = require("../middleware/cloudinary");
const Exhibit = require("../models/Exhibit");
const Comment = require('../models/Comment');

module.exports = {
  getStudio: async (req, res) => {
    try {
      const exhibits = await Exhibit.find({ user: req.user.id });
      res.render("studio.ejs", { exhibits: exhibits, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getGallery: async (req, res) => {
    try {
      const exhibits = await Exhibit.find().sort({ createdAt: "desc" }).lean();
      res.render("gallery.ejs", { exhibits: exhibits });
    } catch (err) {
      console.log(err);
    }
  },
  getExhibit: async (req, res) => {
    try {
      const exhibit = await Exhibit.findById(req.params.id);
      const comments = await Comment.find({exhibit:req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("exhibit.ejs", { exhibit: exhibit, user: req.user, comments: comments });//if issues make 'comments' singular
    } catch (err) {
      console.log(err);
    }
  },
  createExhibit: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Exhibit.create({
        firstName: req.body.firstName,
        age: req.body.age,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Exhibit has been added to the gallery!");
      res.redirect("/studio");
    } catch (err) {
      console.log(err);
    }
  },
  likeExhibit: async (req, res) => {
    try {
      await Exhibit.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/exhibit/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteExhibit: async (req, res) => {
    try {
      // Find exhibit by id
      let exhibit = await Exhibit.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(exhibit.cloudinaryId);
      // Delete exhibit from db
      await Exhibit.remove({ _id: req.params.id });
      console.log("Deleted Exhibit");
      res.redirect("/studio");
    } catch (err) {
      res.redirect("/studio");
    }
  },
};
