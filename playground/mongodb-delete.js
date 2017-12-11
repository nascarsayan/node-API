const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Sayan Naskar'}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }).catch((err) => {
    console.log('Unable to delete collection with this name', err);
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5a2e1928f8007550ff975ae9')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }).catch((err) => {
    console.log('unable to delete collection with this id', err);
  });
});
