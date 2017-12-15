const config = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(err => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo})
  }).catch((err) => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  var body = _.pick(req.body, ['text', 'completed']);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    } else {
      res.status(200).send({todo});
    }
  }).catch((err) => done(err));
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthTokens();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthTokens().then((token) => {
      res.header('x-auth', token).send(user);
    });
    // res.send(user)
  }).catch((err) => {
    res.status(400).send(err);
  });
  // User.findOne({'email': body.email}).then((user) => {
  //   bcrypt.compare(body.password, user.password, (err, isAuth) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send();
  //     }
  //     if (!isAuth) {
  //       console.log('Unauthorized for wrong password');
  //       return res.status(401).send();
  //     }
  //     return new Promise((resolve, reject) => {
  //
  //     });
  //     return {user, token: user.generateAuthTokens()};
  //   });
  // }).then((docs) => {
  //   res.header('x-auth', docs.token).send(docs.user);
  // }).catch((err) => {
  //   console.log(err);
  //   res.status(401).send(err);
  // });
});

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

module.exports = {app};
