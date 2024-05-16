
const express = require('express');
const router = express.Router();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Chargement des fichiers de protocole gRPC
const userProto = grpc.loadPackageDefinition(protoLoader.loadSync('user_service.proto'));
const postProto = grpc.loadPackageDefinition(protoLoader.loadSync('post_service.proto'));
const commentProto = grpc.loadPackageDefinition(protoLoader.loadSync('comment_service.proto'));

// Initialisation des clients gRPC
const userService = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());
const postService = new postProto.PostService('localhost:50052', grpc.credentials.createInsecure());
const commentService = new commentProto.CommentService('localhost:50053', grpc.credentials.createInsecure());

// Routes de l'API Gateway
router.get('/users', (req, res) => {
  userService.getAllUsers({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(data.users);
  });
});

router.get('/posts', (req, res) => {
  postService.getAllPosts({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(data.posts);
  });
});

router.get('/comments', (req, res) => {
  commentService.getAllComments({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(data.comments);
  });
});

module.exports = router;
