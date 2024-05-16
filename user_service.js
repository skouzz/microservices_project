const express = require('express');
const router = express.Router();

// Simulating a user database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// Define user routes
router.get('/', (req, res) => {
  console.log("Fetching all users...");
  res.json({ users });
});

router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json({ user });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  console.log("New user created:", newUser);
  res.status(201).json({ user: newUser });
});

router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  users[index] = { id: userId, name, email };
  console.log("User updated:", users[index]);
  res.json({ user: users[index] });
});

router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const deletedUser = users.splice(index, 1)[0];
  console.log("User deleted:", deletedUser);
  res.json({ user: deletedUser });
});

module.exports = router;
