const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a2e1f8267d9787eba8c8928')
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then( (result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // })

  db.collection('Users').findOneAndUpdate({
    // _id: new ObjectID('5a2e391a1b82ff5c86bb847e')
    name: 'Chandra Sekhar Naskar'
  }, {
    $set: {
      name: 'Sayan Naskar'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })
});
