const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verify = require("../verifyToken");

//CREATE POST
router.post("/", verify, async (req, res) => {
  const newPost = new Post(req.body);
 
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.user.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.user.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
 
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  //    /api/posts?user=mhmd     /api/posts?cat=life
  const username = req.query.user;
  const movieName = req.query.movie;
  const serieName = req.query.serie;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }); // <= in es6 if its the same name <= ( posts = await Post.find({ username:username }) );
    } else if (serieName) {
      posts = await Post.find({
        serie: {
          $in: [serieName], //includes
        },
      });
    }
     else if (movieName) {
      posts = await Post.find({
        movie: {
          $in: [movieName], //includes
        },
      });
    } else {
      // if there is no category or username
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
