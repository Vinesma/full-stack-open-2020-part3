const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log(`You have to provide the password as an argument like so: node mongo.js <password>`);
    process.exit(1);
}

const password = process.argv[2];
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    // Display all persons in the DB

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    });

} else if (process.argv.length === 5) {
    // Save a new person passed in via arguments

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save()
        .then(result => {
            console.log('New person saved:', result);
            mongoose.connection.close();
        });
} else {
    console.log('Invalid parameters');
    mongoose.connection.close();
    process.exit(1);
}
