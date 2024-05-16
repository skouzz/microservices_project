const express = require('express');
const router = express.Router();

// Simulating a post database
let posts = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body of post 1' },
  { id: 2, userId: 2, title: 'Post 2', body: 'Body of post 2' },
  { id: 3, userId: 1, title: 'Post 3', body: 'Body of post 3' }
];

// Define post routes
router.get('/', (req, res) => {
  console.log("Fetching all posts...");
  res.json({ posts });
});

router.get('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  res.json({ post });
});

router.post('/', (req, res) => {
  const { userId, title, body } = req.body;
  const newPost = { id: posts.length + 1, userId, title, body };
  posts.push(newPost);
  console.log("New post created:", newPost);
  res.status(201).json({ post: newPost });
});

router.put('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { userId, title, body } = req.body;
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  posts[index] = { id: postId, userId, title, body };
  console.log("Post updated:", posts[index]);
  res.json({ post: posts[index] });
});

router.delete('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  const deletedPost = posts.splice(index, 1)[0];
  console.log("Post deleted:", deletedPost);
  res.json({ post: deletedPost });
});

// Function to start Express server for posts
function startExpressServer(PORT, app) {
  return new Promise((resolve, reject) => {
    app.listen(PORT, () => {
      console.log(`Express server for posts is running on port ${PORT}`);
      resolve();
    }).on('error', err => {
      reject(`Failed to start Express server for posts: ${err}`);
    });
  });
}

module.exports = { router, startExpressServer };
