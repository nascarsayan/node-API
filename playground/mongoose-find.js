const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const {ObjectID} = require('mongodb');

var todoId = '5a2fffe57309e327f99b0f6e'; // Todo
var userId = '5a2e66cdc76a8e0931bfe4df'; // User

// Todo.find({
//   _id: id
// }).then((todos) => {
//   if (todos.length === 0) {
//     return console.log('Id not found');
//   }
//   console.log('todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('todo', todo);
// });

if (!ObjectID.isValid(todoId)) {
  return console.log('Invalid ID');
}
else {
  Todo.findById(todoId).then((todo) => {
    if (!todo) {
      return console.log('Id not found');
    }
    console.log('todo :\n', JSON.stringify(todo, undefined, 2));
  }).catch(err => console.log(err));
}

if (!ObjectID.isValid(userId)) {
  return console.log('Invalid ID');
}
else {
  User.findById(userId).then((user) => {
    if (!user) {
      return console.log('Id not found');
    }
    console.log('user :\n', JSON.stringify(user, undefined, 2));
  }).catch(err => console.log(err));
}
