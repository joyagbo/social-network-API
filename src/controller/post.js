const Post = require("../model/postModel");
const { validationResult } = require("express-validator");

const createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Invalid inputs', errors: errors.array() });
    }

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const post = new Post({
            creator: req.user.id,
            content: req.body.content
        });
        await post.save();

        res.status(201).json({
            message: "Your post has been posted",
            id: post.id,
            content: post.content,
            createdAt: post.createdAt
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    };
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })

        res.status(200).json({ message: "All your posts", posts })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    }
};

const getPostById = async (req, res) => {
    try {
        const postId = req.params.postId

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        };
        res.status(200).json({ post })

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId
        updateData = { content: req.body.content }
        const options = { new: true };

        // Find the post and update it
        const post = await Post.findByIdAndUpdate(
            { _id: postId, creator: req.user.id }, // Find the post by ID and creator ID
            updateData,
            options
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found or you are not the creator' });
        }
        res.status(200).json({
            message: "Your post has been updated",
            id: post.id,
            content: post.content,
            updatedAt: post.updatedAt
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.find({ _id: req.params.postId, creator: req.params.userId })

        if (!post) {
            return res.status(404).json({ message: "Post not Found" });
        };
        //Delete post
        await Post.deleteOne({ _id: req.params.postId });

        res.status(204).json({ message: "Post Deleted" })
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal Server Error", detail: error });
    }
}

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };