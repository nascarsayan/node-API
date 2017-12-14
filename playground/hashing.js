const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$iC.h57cTF2a26rAS3TNQ7ODAC/VgFsEWgwHSORT7Du8fiA0G0kRlS';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
