const grpc = require('@grpc/grpc-js');

// Simulating a comment database
let comments = [
  { id: 1, postId: 1, text: 'Comment 1 for post 1' },
  { id: 2, postId: 1, text: 'Comment 2 for post 1' },
  { id: 3, postId: 2, text: 'Comment 1 for post 2' }
];

const commentService = {
  getAllComments: (_, callback) => {
    console.log("Fetching all comments...");
    callback(null, { comments });
  },
  getCommentById: (call, callback) => {
    const commentId = call.request.id;
    const comment = comments.find(c => c.id === commentId);
    if (!comment) {
      callback({ code: grpc.status.NOT_FOUND, details: 'Comment not found' });
      return;
    }
    callback(null, { comment });
  },
  createComment: (call, callback) => {
    const { postId, text } = call.request;
    const newComment = { id: comments.length + 1, postId, text };
    comments.push(newComment);
    console.log("New comment created:", newComment);
    callback(null, { comment: newComment });
  },
  updateComment: (call, callback) => {
    const { id, postId, text } = call.request;
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
      callback({ code: grpc.status.NOT_FOUND, details: 'Comment not found' });
      return;
    }
    comments[index] = { id, postId, text };
    console.log("Comment updated:", comments[index]);
    callback(null, { comment: comments[index] });
  },
  deleteComment: (call, callback) => {
    const commentId = call.request.id;
    const index = comments.findIndex(c => c.id === commentId);
    if (index === -1) {
      callback({ code: grpc.status.NOT_FOUND, details: 'Comment not found' });
      return;
    }
    const deletedComment = comments.splice(index, 1)[0];
    console.log("Comment deleted:", deletedComment);
    callback(null, { comment: deletedComment });
  }
};

module.exports = commentService;
