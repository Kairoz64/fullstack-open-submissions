const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: function(n) {
        let parts = n.split('-');
        if (parts.length !== 2) {
          return false;
        }

        if (parts[0].length !== 2 && parts[0].length !== 3) {
          return false;
        }

        if (parts[0].length + parts[1].length < 8) {
          return false;
        }

        return true;
      }
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);