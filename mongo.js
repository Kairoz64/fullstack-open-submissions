const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://kairoz:${password}@phonebook-db.fy5dxly.mongodb.net/phonenookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected');
    if (process.argv.length < 4) {
      return Person.find({}).then(res => {
        console.log('phonebook:');
        res.forEach(p => {
          console.log(`${p.name} ${p.number}`);
        });
      });
    }

    else {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      });
      return person.save();
    }
  })
  .then((p) => {
    if (process.argv.length > 3) {
      console.log(`added ${p.name} number ${p.number} to phonebook`);
    }
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));