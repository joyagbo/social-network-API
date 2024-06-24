const express = require("express");
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../controller/post");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create-post", [auth, [check('content', 'Content is required').not().isEmpty()]], createPost);
router.get("/all-posts", auth, getAllPosts)
router.get("/posts/:postId", auth, getPostById)
router.put("/update-post/:postId", auth, updatePost)
router.delete("/delete-post/postId", auth, deletePost)


module.exports = router