const express = require("express");
const { body } = require("express-validator");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/feed");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/posts", isAuth, getPosts);

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

router.get("/post/:postId", isAuth, getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

router.delete("/post/:postId", isAuth, deletePost);

module.exports = router;
