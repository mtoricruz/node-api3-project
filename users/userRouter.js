const express = require('express');

// import users/posts Db
const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser("name"), (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error adding user' })
    });
});

router.post('/:id/posts', validatePost("text"), (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id}
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error adding post' })
    })
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Error retrieving Users data' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
   res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  Posts.getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error getting posts from DB'})
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'User not found '});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the user' })
    })
}

function validateUser(prop) {
  return function(req, res, next) {
    if (req.body[prop]) {
      next();
    } else {
      res.status(400).json({ error: 'no name property' })
    }
  }
}

function validatePost(prop) {
  return function(req, res, next) {
    if (req.body[prop]) {
      next();
    } else {
      res.status(400).json({ error: 'no text property' })
    }
  }
}

module.exports = router;
